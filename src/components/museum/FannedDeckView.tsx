import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Compass,
  Layers,
  MapPin,
  Minus,
  MoveHorizontal,
  Play,
  Plus,
} from 'lucide-react';
import { CATEGORIES, EXHIBITS } from '../../data/exhibits';
import type { Exhibit } from '../../types/exhibit';

interface FannedDeckViewProps {
  activeExhibit: Exhibit;
  onSelectExhibit: (exhibit: Exhibit) => void;
}

/** Draw an elegant dark-luxury placeholder canvas while a high-res artwork texture streams in */
function createPlaceholderTexture(exhibit: Exhibit): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 640;
  const ctx = c.getContext('2d');
  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, 512, 640);
    grad.addColorStop(0, exhibit.atmosphere.bgSecondary);
    grad.addColorStop(1, '#09090d');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 640);

    ctx.strokeStyle = 'rgba(229, 184, 91, 0.35)';
    ctx.lineWidth = 4;
    ctx.strokeRect(24, 24, 464, 592);

    ctx.fillStyle = '#e5b85b';
    ctx.font = '600 18px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(exhibit.categoryLabel.toUpperCase(), 256, 285);

    ctx.fillStyle = '#f4f1ea';
    ctx.font = '700 32px Inter, sans-serif';
    ctx.fillText(exhibit.title.slice(0, 26), 256, 332);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Draw a crisp dark-luxury museum wall caption plaque mounted below each artwork */
function createCaptionTexture(exhibit: Exhibit): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 768;
  c.height = 192;
  const ctx = c.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 768, 192);

    // Subtle dark glass backing plate
    ctx.fillStyle = 'rgba(14, 14, 20, 0.72)';
    ctx.fillRect(0, 0, 768, 192);
    ctx.fillStyle = '#e5b85b';
    ctx.fillRect(0, 0, 6, 192);

    ctx.fillStyle = '#f4f1ea';
    ctx.font = '700 38px Inter, -apple-system, sans-serif';
    ctx.fillText(exhibit.title, 28, 62);

    ctx.fillStyle = '#e5b85b';
    ctx.font = '500 28px Inter, -apple-system, sans-serif';
    ctx.fillText(`${exhibit.creator} · ${exhibit.date}`, 28, 114);

    ctx.fillStyle = '#9c968b';
    ctx.font = '600 20px Inter, -apple-system, sans-serif';
    ctx.fillText(exhibit.categoryLabel.toUpperCase(), 28, 158);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** Soft warm halogen radial spotlight texture cast onto the museum wall behind each frame */
function createSpotlightPoolTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext('2d');
  if (ctx) {
    const g = ctx.createRadialGradient(128, 118, 10, 128, 128, 124);
    g.addColorStop(0, 'rgba(246, 214, 152, 0.68)');
    g.addColorStop(0.45, 'rgba(229, 184, 91, 0.22)');
    g.addColorStop(1, 'rgba(229, 184, 91, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
  }
  return new THREE.CanvasTexture(c);
}

export const FannedDeckView: React.FC<FannedDeckViewProps> = ({
  activeExhibit,
  onSelectExhibit,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<{
    step: (delta: number) => void;
    jumpToExhibitIndex: (idx: number) => void;
    releaseFocus: () => void;
  }>({
    step: () => {},
    jumpToExhibitIndex: () => {},
    releaseFocus: () => {},
  });

  // Order all 15 exhibits cleanly by Museum Discipline Wing along the winding hall
  const hallExhibits = useMemo<Exhibit[]>(() => {
    const ordered: Exhibit[] = [];
    CATEGORIES.forEach((cat) => {
      EXHIBITS.filter((e) => e.category === cat.id).forEach((ex) => {
        ordered.push(ex);
      });
    });
    return ordered;
  }, []);

  const initialIdx = useMemo(() => {
    const found = hallExhibits.findIndex((e) => e.id === activeExhibit.id);
    return found >= 0 ? found : 0;
  }, [hallExhibits, activeExhibit.id]);

  const [nearestExhibit, setNearestExhibit] = useState<Exhibit>(
    hallExhibits[initialIdx] || hallExhibits[0]
  );
  const [focusedExhibit, setFocusedExhibit] = useState<Exhibit | null>(null);
  const focusTimerRef = useRef<number | null>(null);

  const handleReturnToHall = useCallback(() => {
    if (focusTimerRef.current) window.clearTimeout(focusTimerRef.current);
    setFocusedExhibit(null);
    apiRef.current.releaseFocus();
  }, []);

  // Escape key returns to the 3D Museum Corridor
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'Escape' && focusedExhibit) {
        handleReturnToHall();
      } else if (!focusedExhibit) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') apiRef.current.step(0.032);
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') apiRef.current.step(-0.032);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [focusedExhibit, handleReturnToHall]);

  // Mount Three.js 3D Winding Museum Corridor
  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    let W = el.clientWidth || window.innerWidth;
    let H = el.clientHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0b10);
    scene.fog = new THREE.Fog(0x0b0b10, 5, 36);

    const cam = new THREE.PerspectiveCamera(W < 640 ? 70 : 60, W / H, 0.1, 120);

    // Warm Museum Gallery Lighting
    scene.add(new THREE.HemisphereLight(0xf6ead6, 0x1a1922, 0.95));
    const lamp = new THREE.PointLight(0xffeed4, 1.35, 18);
    scene.add(lamp);

    // Winding Architectural Corridor Spline (extended cleanly for all 15 exhibits)
    const pts: THREE.Vector3[] = [];
    for (let k = 0; k <= 16; k++) {
      pts.push(new THREE.Vector3(Math.sin(k * 0.48) * 6.8, 0, -k * 6.8));
    }
    const curve = new THREE.CatmullRomCurve3(pts);

    const HW = 3.35; // Half-width of museum corridor
    const HT = 4.55; // Ceiling height
    const S = 320;   // Corridor smoothness segments

    const frames: Array<{ p: THREE.Vector3; n: THREE.Vector3 }> = [];
    for (let s = 0; s <= S; s++) {
      const t = s / S;
      const p = curve.getPointAt(t);
      const tg = curve.getTangentAt(t);
      tg.y = 0;
      tg.normalize();
      frames.push({ p, n: new THREE.Vector3(-tg.z, 0, tg.x) });
    }

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const textures: THREE.Texture[] = [];

    const addStrip = (
      fa: (f: { p: THREE.Vector3; n: THREE.Vector3 }) => THREE.Vector3,
      fb: (f: { p: THREE.Vector3; n: THREE.Vector3 }) => THREE.Vector3,
      col: number,
      emissive = 0x000000
    ) => {
      const pos: number[] = [];
      const idx: number[] = [];
      frames.forEach((f, i) => {
        const a = fa(f);
        const b = fb(f);
        pos.push(a.x, a.y, a.z, b.x, b.y, b.z);
        if (i < S) {
          const k = i * 2;
          idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
        }
      });
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      g.setIndex(idx);
      g.computeVertexNormals();
      const mat =
        emissive !== 0
          ? new THREE.MeshBasicMaterial({ color: emissive, side: THREE.DoubleSide })
          : new THREE.MeshLambertMaterial({ color: col, side: THREE.DoubleSide });
      geometries.push(g);
      materials.push(mat);
      scene.add(new THREE.Mesh(g, mat));
    };

    const at = (f: { p: THREE.Vector3; n: THREE.Vector3 }, s: number, y: number) =>
      f.p.clone().addScaledVector(f.n, s * HW).setY(y);

    // Dark Luxury Museum Corridor Architecture
    addStrip((f) => at(f, -1, 0), (f) => at(f, -1, HT), 0x1c1b22); // Left obsidian wall
    addStrip((f) => at(f, 1, 0), (f) => at(f, 1, HT), 0x1c1b22);   // Right obsidian wall
    addStrip((f) => at(f, -1, 0), (f) => at(f, 1, 0), 0x111016);   // Dark slate floor
    addStrip((f) => at(f, -1, HT), (f) => at(f, 1, HT), 0x16151c); // Architectural ceiling
    addStrip((f) => at(f, -0.992, 0), (f) => at(f, -0.992, 0.15), 0x2c2824); // Skirting L
    addStrip((f) => at(f, 0.992, 0), (f) => at(f, 0.992, 0.15), 0x2c2824);   // Skirting R
    // Warm architectural ceiling light strip running down the center
    addStrip((f) => at(f, -0.16, HT - 0.015), (f) => at(f, 0.16, HT - 0.015), 0xf6e6c4, 0xf6e6c4);

    // Atmospheric Floating Golden Dust Motes
    const dp: number[] = [];
    for (let k = 0; k < 520; k++) {
      const f = frames[Math.floor(Math.random() * S)];
      const q = f.p.clone().addScaledVector(f.n, (Math.random() * 2 - 1) * HW * 0.92);
      dp.push(q.x, 0.35 + Math.random() * (HT - 0.6), q.z);
    }
    const dg = new THREE.BufferGeometry();
    dg.setAttribute('position', new THREE.Float32BufferAttribute(dp, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xf0cf88,
      size: 0.045,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    geometries.push(dg);
    materials.push(dustMat);
    const dust = new THREE.Points(dg, dustMat);
    scene.add(dust);

    // Load Real Masterwork Artworks Along Left & Right Walls
    const texLoader = new THREE.TextureLoader();
    texLoader.setCrossOrigin('anonymous');

    const poolTex = createSpotlightPoolTexture();
    textures.push(poolTex);

    const meshes: THREE.Mesh[] = [];
    const ts: number[] = [];
    const N = hallExhibits.length;

    const frameMat = new THREE.MeshLambertMaterial({ color: 0x26201a });
    const brassTrimMat = new THREE.MeshBasicMaterial({ color: 0x9b7e48 });
    const benchMat = new THREE.MeshLambertMaterial({ color: 0x1d1b22 });
    const benchLegMat = new THREE.MeshLambertMaterial({ color: 0x3b3124 });
    materials.push(frameMat, brassTrimMat, benchMat, benchLegMat);

    hallExhibits.forEach((exhibit, i) => {
      const t = 0.06 + i * (0.87 / Math.max(1, N - 1));
      ts.push(t);

      const p = curve.getPointAt(t);
      const tg = curve.getTangentAt(t);
      tg.y = 0;
      tg.normalize();
      const n = new THREE.Vector3(-tg.z, 0, tg.x);
      const side = i % 2 === 0 ? -1 : 1;

      const isPortrait = exhibit.images.aspectRatio === 'portrait';
      const artW = isPortrait ? 2.15 : 2.85;
      const artH = isPortrait ? 2.75 : 2.05;

      // Placeholder texture swapped seamlessly when high-res Wikimedia image loads
      const placeholderTex = createPlaceholderTexture(exhibit);
      textures.push(placeholderTex);
      const artMat = new THREE.MeshBasicMaterial({ map: placeholderTex });
      materials.push(artMat);

      texLoader.load(
        exhibit.images.main,
        (loadedTex) => {
          loadedTex.colorSpace = THREE.SRGBColorSpace;
          loadedTex.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
          textures.push(loadedTex);
          artMat.map = loadedTex;
          artMat.needsUpdate = true;
        },
        undefined,
        () => {
          // Keep clean museum placeholder if offline
        }
      );

      const wp = p.clone().addScaledVector(n, side * (HW - 0.06));
      const artGeo = new THREE.PlaneGeometry(artW, artH);
      geometries.push(artGeo);
      const artMesh = new THREE.Mesh(artGeo, artMat);
      artMesh.position.set(wp.x, 2.25, wp.z);
      artMesh.lookAt(p.x, 2.25, p.z);
      artMesh.userData.i = i;
      scene.add(artMesh);
      meshes.push(artMesh);

      // Physical 3D Gallery Frame & Subtle Brass Inner Lip
      const trimGeo = new THREE.BoxGeometry(artW + 0.06, artH + 0.06, 0.03);
      const frGeo = new THREE.BoxGeometry(artW + 0.2, artH + 0.2, 0.07);
      geometries.push(trimGeo, frGeo);

      const trim = new THREE.Mesh(trimGeo, brassTrimMat);
      trim.position.copy(artMesh.position);
      trim.quaternion.copy(artMesh.quaternion);
      trim.translateZ(-0.02);
      scene.add(trim);

      const fr = new THREE.Mesh(frGeo, frameMat);
      fr.position.copy(artMesh.position);
      fr.quaternion.copy(artMesh.quaternion);
      fr.translateZ(-0.045);
      scene.add(fr);

      // Warm Spotlight Pool on Wall Behind Frame
      const wl = p.clone().addScaledVector(n, side * (HW - 0.018));
      const poolGeo = new THREE.PlaneGeometry(artW + 2.6, artH + 2.5);
      const poolMat = new THREE.MeshBasicMaterial({
        map: poolTex,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      });
      geometries.push(poolGeo);
      materials.push(poolMat);
      const pool = new THREE.Mesh(poolGeo, poolMat);
      pool.position.set(wl.x, 2.28, wl.z);
      pool.lookAt(p.x, 2.28, p.z);
      scene.add(pool);

      // Museum Gallery Bench placed periodically along the corridor
      if (i % 3 === 0) {
        const bn = p.clone().addScaledVector(n, -side * (HW - 1.35));
        const benchTopGeo = new THREE.BoxGeometry(1.75, 0.14, 0.52);
        const benchBaseGeo = new THREE.BoxGeometry(1.45, 0.34, 0.36);
        geometries.push(benchTopGeo, benchBaseGeo);

        const bchTop = new THREE.Mesh(benchTopGeo, benchMat);
        bchTop.position.set(bn.x, 0.41, bn.z);
        bchTop.lookAt(p.x, 0.41, p.z);
        scene.add(bchTop);

        const bchBase = new THREE.Mesh(benchBaseGeo, benchLegMat);
        bchBase.position.set(bn.x, 0.17, bn.z);
        bchBase.lookAt(p.x, 0.17, p.z);
        scene.add(bchBase);
      }

      // Crisp Museum Wall Caption Plaque Below Each Artwork
      const cTex = createCaptionTexture(exhibit);
      textures.push(cTex);
      const capGeo = new THREE.PlaneGeometry(1.65, 0.41);
      const capMat = new THREE.MeshBasicMaterial({ map: cTex, transparent: true });
      geometries.push(capGeo);
      materials.push(capMat);
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(wp.x, 2.25 - artH / 2 - 0.36, wp.z);
      cap.lookAt(p.x, 2.25 - artH / 2 - 0.36, p.z);
      scene.add(cap);
    });

    // Camera Walk Physics & Smooth Focus Turning
    const clamp = (v: number) => Math.max(0.015, Math.min(0.955, v));
    let tgt = clamp((ts[initialIdx] ?? 0.06) - 0.042);
    let cur = Math.max(0.01, tgt - 0.035);
    let hov = -1;
    let focus = -1;
    let yaw = 0;
    let yawT = 0;
    let lastNear = -1;
    let dragStartX: number | null = null;
    let dragStartY: number | null = null;
    let moved = false;
    let rafId = 0;

    const lookAtCur = new THREE.Vector3();
    const lookAtTarget = new THREE.Vector3();
    const tmpPos = new THREE.Vector3();
    let lookInitialized = false;

    const ray = new THREE.Raycaster();
    const mp = new THREE.Vector2();
    const dom = renderer.domElement;

    const pick = (clientX: number, clientY: number) => {
      const r = dom.getBoundingClientRect();
      mp.set(
        ((clientX - r.left) / r.width) * 2 - 1,
        -((clientY - r.top) / r.height) * 2 + 1
      );
      ray.setFromCamera(mp, cam);
      const hit = ray.intersectObjects(meshes)[0];
      return hit ? (hit.object.userData.i as number) : -1;
    };

    const onWheel = (e: WheelEvent) => {
      if (focus >= 0) return;
      e.preventDefault();
      tgt = clamp(tgt + (e.deltaY + e.deltaX) * 0.00024);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (focus >= 0) return;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      moved = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (window.innerWidth >= 640) {
        yawT = -(e.clientX / window.innerWidth - 0.5) * 0.42;
      }
      if (dragStartX !== null && dragStartY !== null && focus < 0) {
        const dx = e.clientX - dragStartX;
        const dy = e.clientY - dragStartY;
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved = true;
        // Support both horizontal swipe & vertical drag smoothly on mobile & desktop
        const primaryDelta = Math.abs(dx) >= Math.abs(dy) ? dx : dy;
        tgt = clamp(tgt - primaryDelta * 0.00052);
        dragStartX = e.clientX;
        dragStartY = e.clientY;
      } else if (focus < 0) {
        hov = pick(e.clientX, e.clientY);
        dom.style.cursor = hov >= 0 ? 'pointer' : 'grab';
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      const wasMoved = moved;
      dragStartX = null;
      dragStartY = null;
      if (!wasMoved && focus < 0) {
        const i = pick(e.clientX, e.clientY);
        if (i >= 0) {
          focus = i;
          // Walk right up to the chosen painting so it fills the view as the camera turns to face it
          tgt = clamp(ts[i] - 0.022);
          if (focusTimerRef.current) window.clearTimeout(focusTimerRef.current);
          focusTimerRef.current = window.setTimeout(() => {
            setFocusedExhibit(hallExhibits[i]);
          }, 760);
        }
      }
    };

    const onResize = () => {
      if (!el) return;
      W = el.clientWidth || window.innerWidth;
      H = el.clientHeight || window.innerHeight;
      renderer.setSize(W, H);
      cam.fov = W < 640 ? 70 : 60;
      cam.aspect = W / H;
      cam.updateProjectionMatrix();
    };

    dom.addEventListener('wheel', onWheel, { passive: false });
    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('resize', onResize);

    apiRef.current = {
      step: (delta: number) => {
        if (focus < 0) tgt = clamp(tgt + delta);
      },
      jumpToExhibitIndex: (idx: number) => {
        focus = -1;
        setFocusedExhibit(null);
        if (ts[idx] !== undefined) {
          tgt = clamp(ts[idx] - 0.042);
        }
      },
      releaseFocus: () => {
        focus = -1;
      },
    };

    const loop = () => {
      cur += (tgt - cur) * 0.065;
      yaw += (yawT - yaw) * 0.05;

      // Subtle hover elevation on hovered artwork
      meshes.forEach((m, i) => {
        const targetScale = i === hov && focus < 0 ? 1.035 : 1;
        m.scale.setScalar(m.scale.x + (targetScale - m.scale.x) * 0.14);
      });

      // Gentle floating dust animation
      const now = performance.now();
      dust.position.y = Math.sin(now / 2600) * 0.08;
      dust.rotation.y = Math.sin(now / 11000) * 0.008;

      const safeCur = Math.max(0.001, Math.min(0.999, cur));
      const p = curve.getPointAt(safeCur);
      // Calm first-person walking head-bob
      cam.position.set(p.x, 1.72 + Math.sin(safeCur * 420) * 0.011, p.z);

      if (focus >= 0 && meshes[focus]) {
        meshes[focus].getWorldPosition(tmpPos);
        lookAtTarget.copy(tmpPos);
      } else {
        const q = curve.getPointAt(Math.min(0.999, safeCur + 0.032));
        lookAtTarget.set(q.x, 1.78, q.z);
      }

      if (!lookInitialized) {
        lookAtCur.copy(lookAtTarget);
        lookInitialized = true;
      } else {
        lookAtCur.lerp(lookAtTarget, focus >= 0 ? 0.09 : 0.12);
      }

      cam.lookAt(lookAtCur);
      if (focus < 0) {
        cam.rotateY(yaw);
      }

      lamp.position.set(cam.position.x, 3.65, cam.position.z);

      // Update active "You are walking past" indicator
      let best = 0;
      let bestDist = 9;
      ts.forEach((tVal, i) => {
        const dd = Math.abs(tVal - safeCur - 0.035);
        if (dd < bestDist) {
          bestDist = dd;
          best = i;
        }
      });
      if (best !== lastNear) {
        lastNear = best;
        setNearestExhibit(hallExhibits[best]);
      }

      renderer.render(scene, cam);
      rafId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(rafId);
      if (focusTimerRef.current) window.clearTimeout(focusTimerRef.current);
      dom.removeEventListener('wheel', onWheel);
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      renderer.dispose();
      if (el.contains(dom)) el.removeChild(dom);
    };
  }, [hallExhibits, initialIdx]);

  const jumpToCategory = (categoryId: string) => {
    const idx = hallExhibits.findIndex((e) => e.category === categoryId);
    if (idx >= 0) {
      apiRef.current.jumpToExhibitIndex(idx);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-[#0b0b10]">
      {/* 1. Three.js Interactive 3D Winding Museum Corridor */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full touch-none"
      />

      {/* Soft Cinematic Edge Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(6, 6, 10, 0.55) 100%)',
        }}
      />

      {/* 2. Bottom "You Are Walking Past" Floor Indicator + Wing Teleport Bar */}
      <AnimatePresence>
        {!focusedExhibit && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute inset-x-0 bottom-4 sm:bottom-6 z-20 px-4 flex flex-col items-center gap-3"
          >
            {/* Current Wing & Artwork Floor Readout */}
            <div className="text-center">
              <span className="block text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.26em] text-[#a39e93]">
                You are walking past
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={nearestExhibit.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 className="font-art-script text-3xl sm:text-4xl text-[#f4f1ea] leading-tight">
                    {nearestExhibit.title}
                  </h2>
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#e5b85b]">
                    {nearestExhibit.categoryLabel} · {nearestExhibit.creator}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Wing Quick-Jump Bar */}
            <div className="pointer-events-auto flex items-center gap-1 px-2 py-1 rounded-full bg-[#121218]/80 backdrop-blur-2xl border border-[#f4f1ea]/12 overflow-x-auto no-scrollbar max-w-[90vw]">
              {CATEGORIES.map((cat) => {
                const isActiveWing = nearestExhibit.category === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => jumpToCategory(cat.id)}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer shrink-0 ${
                      isActiveWing
                        ? 'bg-[#e5b85b] text-[#09090c] font-semibold'
                        : 'text-[#a39e93] hover:text-[#f4f1ea]'
                    }`}
                  >
                    {cat.shortLabel}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[#a39e93]/80">
              <MoveHorizontal className="w-3 h-3 text-[#e5b85b]/80" />
              <span>Scroll or drag to walk · Click any painting to step closer</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Step Forward / Backward Buttons (Bottom-Right, like the prototype's − / + buttons) */}
      {!focusedExhibit && (
        <div className="hidden sm:flex items-center gap-2 fixed right-6 bottom-6 z-20">
          <button
            onClick={() => apiRef.current.step(-0.045)}
            className="w-9 h-9 rounded-full bg-[#14141b]/80 hover:bg-[#e5b85b] text-[#d5d0c5] hover:text-[#09090c] backdrop-blur-xl border border-[#f4f1ea]/15 flex items-center justify-center transition-all cursor-pointer"
            title="Walk Backward"
            aria-label="Walk backward"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={() => apiRef.current.step(0.045)}
            className="w-9 h-9 rounded-full bg-[#14141b]/80 hover:bg-[#e5b85b] text-[#d5d0c5] hover:text-[#09090c] backdrop-blur-xl border border-[#f4f1ea]/15 flex items-center justify-center transition-all cursor-pointer"
            title="Walk Forward"
            aria-label="Walk forward"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 3. FOCUSED SPLIT INSPECTION VIEW (Artwork on Left, Description & "Enter Living Stage" on Right) */}
      <AnimatePresence>
        {focusedExhibit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-30 flex items-center justify-center px-4 sm:px-8 lg:px-14 pt-20 pb-6 bg-[#07070b]/80 backdrop-blur-xl cursor-default"
            onClick={handleReturnToHall}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl max-h-[82dvh] overflow-y-auto no-scrollbar rounded-3xl bg-[#111117]/95 border border-[#f4f1ea]/14 shadow-[0_35px_100px_rgba(0,0,0,0.92)] p-5 sm:p-8 lg:p-10"
            >
              {/* Top Back to 3D Museum Corridor Button */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={handleReturnToHall}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1a1a23] hover:bg-[#242430] border border-[#f4f1ea]/10 text-xs font-semibold text-[#d5d0c5] hover:text-[#f4f1ea] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#e5b85b]" />
                  <span>Back to 3D Hall</span>
                </button>

                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e5b85b]">
                  {focusedExhibit.hallNumber}
                </span>
              </div>

              {/* Side-by-Side Split: Framed Artwork Left · Curatorial Description & CTA Right */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
                {/* LEFT: Clean Full Uncropped Artwork */}
                <div className="md:col-span-6 flex items-center justify-center">
                  <div className="relative rounded-2xl overflow-hidden bg-[#09090d] p-2 border border-[#f4f1ea]/12 shadow-[0_24px_70px_rgba(0,0,0,0.85)]">
                    <img
                      src={focusedExhibit.images.main}
                      alt={focusedExhibit.title}
                      className="max-h-[42dvh] md:max-h-[58dvh] w-auto h-auto object-contain rounded-xl mx-auto"
                    />
                  </div>
                </div>

                {/* RIGHT: Art Description, Metadata & Enter Living Room Button Beneath */}
                <div className="md:col-span-6 flex flex-col justify-center space-y-4 text-left">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#e5b85b]">
                      <Compass className="w-3.5 h-3.5" />
                      {focusedExhibit.categoryLabel}
                    </span>

                    <h2 className="font-art-script text-4xl sm:text-5xl text-[#fdfbf7] leading-tight">
                      {focusedExhibit.title}
                    </h2>

                    <p className="text-sm font-medium text-[#d5d0c5]">
                      {focusedExhibit.creator}
                    </p>
                  </div>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap gap-2 py-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181822] border border-[#f4f1ea]/10 text-[11px] text-[#d5d0c5]">
                      <Calendar className="w-3 h-3 text-[#e5b85b]" />
                      {focusedExhibit.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181822] border border-[#f4f1ea]/10 text-[11px] text-[#d5d0c5]">
                      <MapPin className="w-3 h-3 text-[#e5b85b]" />
                      {focusedExhibit.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181822] border border-[#f4f1ea]/10 text-[11px] text-[#d5d0c5]">
                      <Layers className="w-3 h-3 text-[#e5b85b]" />
                      {focusedExhibit.mediumOrMaterial.split(';')[0]}
                    </span>
                  </div>

                  {/* Curatorial Description */}
                  <div className="space-y-3 text-xs sm:text-sm text-[#e6e1d6]/90 leading-relaxed">
                    <p>{focusedExhibit.introduction}</p>
                    {focusedExhibit.story.paragraphs[0] && (
                      <p className="text-[#a39e93] line-clamp-3">
                        {focusedExhibit.story.paragraphs[0]}
                      </p>
                    )}
                  </div>

                  {/* Primary CTA Beneath Description */}
                  <div className="pt-2">
                    <button
                      onClick={() => onSelectExhibit(focusedExhibit)}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#e5b85b] hover:bg-[#f0c770] text-[#09090c] text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer shadow-[0_10px_30px_rgba(229,184,91,0.28)]"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Enter Living Stage</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
