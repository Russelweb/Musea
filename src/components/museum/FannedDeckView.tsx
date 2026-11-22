import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Layers,
  MapPin,
  Minus,
  MoveHorizontal,
  Play,
  Plus,
} from 'lucide-react';
import { CATEGORIES, EXHIBITS } from '../../data/exhibits';
import type { Exhibit } from '../../types/exhibit';

interface ScreenRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface FocusedSelection {
  exhibit: Exhibit;
  sourceRect: ScreenRect | null;
}

interface FannedDeckViewProps {
  activeExhibit: Exhibit;
  onSelectExhibit: (exhibit: Exhibit) => void;
}

/** Draw an elegant placeholder canvas while a high-res artwork texture streams in */
function createPlaceholderTexture(exhibit: Exhibit): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 640;
  const ctx = c.getContext('2d');
  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, 512, 640);
    grad.addColorStop(0, '#2a2933');
    grad.addColorStop(1, '#18171e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 640);

    ctx.strokeStyle = 'rgba(229, 184, 91, 0.35)';
    ctx.lineWidth = 4;
    ctx.strokeRect(24, 24, 464, 592);

    ctx.fillStyle = '#e5b85b';
    ctx.font = '600 18px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(exhibit.categoryLabel.toUpperCase(), 256, 290);

    ctx.fillStyle = '#f4f1ea';
    ctx.font = '700 30px Inter, sans-serif';
    ctx.fillText(exhibit.title.slice(0, 26), 256, 336);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Draw a crisp museum wall caption plaque mounted directly on the wall below each artwork */
function createCaptionTexture(exhibit: Exhibit): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 768;
  c.height = 192;
  const ctx = c.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 768, 192);

    ctx.fillStyle = '#f5f2eb';
    ctx.font = '700 40px Inter, -apple-system, sans-serif';
    ctx.fillText(exhibit.title, 12, 54);

    ctx.fillStyle = '#e6c278';
    ctx.font = '500 28px Inter, -apple-system, sans-serif';
    ctx.fillText(`${exhibit.creator} · ${exhibit.date}`, 12, 106);

    ctx.fillStyle = '#b9b4ab';
    ctx.font = '600 20px Inter, -apple-system, sans-serif';
    ctx.fillText(exhibit.categoryLabel.toUpperCase(), 12, 150);
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
    const g = ctx.createRadialGradient(128, 114, 12, 128, 128, 124);
    g.addColorStop(0, 'rgba(255, 236, 196, 0.75)');
    g.addColorStop(0.48, 'rgba(240, 212, 154, 0.24)');
    g.addColorStop(1, 'rgba(240, 212, 154, 0)');
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
  const [focusedSelection, setFocusedSelection] = useState<FocusedSelection | null>(null);
  const focusedExhibit = focusedSelection?.exhibit ?? null;
  const focusTimerRef = useRef<number | null>(null);
  const targetArtRef = useRef<HTMLDivElement>(null);
  const [flipOrigin, setFlipOrigin] = useState<{ x: number; y: number; scale: number }>({
    x: 40,
    y: 0,
    scale: 1.08,
  });

  // Compute exact 3D-to-2D FLIP delta before first paint so the artwork smoothly resizes from its exact 3D wall position
  useLayoutEffect(() => {
    if (!focusedSelection?.sourceRect || !targetArtRef.current) return;
    const targetRect = targetArtRef.current.getBoundingClientRect();
    const src = focusedSelection.sourceRect;
    if (targetRect.width > 0 && targetRect.height > 0 && src.width > 0) {
      const srcCenterX = src.left + src.width / 2;
      const srcCenterY = src.top + src.height / 2;
      const tgtCenterX = targetRect.left + targetRect.width / 2;
      const tgtCenterY = targetRect.top + targetRect.height / 2;
      const scale = Math.max(0.45, Math.min(1.6, src.width / targetRect.width));
      setFlipOrigin({
        x: srcCenterX - tgtCenterX,
        y: srcCenterY - tgtCenterY,
        scale,
      });
    }
  }, [focusedSelection]);

  const handleReturnToHall = useCallback(() => {
    if (focusTimerRef.current) window.clearTimeout(focusTimerRef.current);
    setFocusedSelection(null);
    // Delay stepping the 3D camera back so the artwork calmly glides back onto the wall first
    window.setTimeout(() => {
      apiRef.current.releaseFocus();
    }, 360);
  }, []);

  // Escape & Arrow Key navigation
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

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);

    // Lighter, Sculpted Architectural Warm-Charcoal Gallery Atmosphere so walls, floor, ceiling & bends read clearly
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2d2c34);
    scene.fog = new THREE.Fog(0x2d2c34, 8, 48);

    const cam = new THREE.PerspectiveCamera(W < 640 ? 70 : 60, W / H, 0.1, 130);

    // Balanced Museum Architectural Lighting
    scene.add(new THREE.HemisphereLight(0xfff7ea, 0x3f3d4a, 1.35));
    const lamp = new THREE.PointLight(0xfff1d8, 1.75, 24);
    scene.add(lamp);

    // Winding Architectural Corridor Spline
    const pts: THREE.Vector3[] = [];
    for (let k = 0; k <= 16; k++) {
      pts.push(new THREE.Vector3(Math.sin(k * 0.48) * 6.8, 0, -k * 6.8));
    }
    const curve = new THREE.CatmullRomCurve3(pts);

    const HW = 3.35; // Half-width of corridor
    const HT = 4.55; // Ceiling height
    const S = 320;   // Corridor segments

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

    // Distinct Architectural Surfaces: Warm Plaster Walls, Slate Floor, Lighter Ceiling & Crisp Baseboards
    addStrip((f) => at(f, -1, 0), (f) => at(f, -1, HT), 0x45434e); // Left wall
    addStrip((f) => at(f, 1, 0), (f) => at(f, 1, HT), 0x45434e);   // Right wall
    addStrip((f) => at(f, -1, 0), (f) => at(f, 1, 0), 0x2f2e36);   // Floor
    addStrip((f) => at(f, -1, HT), (f) => at(f, 1, HT), 0x565460); // Ceiling
    addStrip((f) => at(f, -0.992, 0), (f) => at(f, -0.992, 0.16), 0x1d1c22); // Crisp skirting L
    addStrip((f) => at(f, 0.992, 0), (f) => at(f, 0.992, 0.16), 0x1d1c22);   // Crisp skirting R
    // Luminous Architectural Ceiling Light Strip
    addStrip((f) => at(f, -0.2, HT - 0.015), (f) => at(f, 0.2, HT - 0.015), 0xfff4dd, 0xfff4dd);

    // Soft Floating Golden Dust Motes
    const dp: number[] = [];
    for (let k = 0; k < 520; k++) {
      const f = frames[Math.floor(Math.random() * S)];
      const q = f.p.clone().addScaledVector(f.n, (Math.random() * 2 - 1) * HW * 0.92);
      dp.push(q.x, 0.35 + Math.random() * (HT - 0.6), q.z);
    }
    const dg = new THREE.BufferGeometry();
    dg.setAttribute('position', new THREE.Float32BufferAttribute(dp, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xfff0cc,
      size: 0.048,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    geometries.push(dg);
    materials.push(dustMat);
    const dust = new THREE.Points(dg, dustMat);
    scene.add(dust);

    // Load Real CORS-Verified High-Res Masterwork Textures
    const texLoader = new THREE.TextureLoader();
    texLoader.setCrossOrigin('anonymous');

    const poolTex = createSpotlightPoolTexture();
    textures.push(poolTex);

    const meshes: THREE.Mesh[] = [];
    const meshDims: Array<{ w: number; h: number }> = [];
    const focusPositions: THREE.Vector3[] = [];
    const ts: number[] = [];
    const N = hallExhibits.length;

    const frameMat = new THREE.MeshLambertMaterial({ color: 0x18161a });
    const brassTrimMat = new THREE.MeshBasicMaterial({ color: 0xc5a260 });
    const benchMat = new THREE.MeshLambertMaterial({ color: 0x201e24 });
    const benchLegMat = new THREE.MeshLambertMaterial({ color: 0x7a6540 });
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
          // Fallback already visible
        }
      );

      const wp = p.clone().addScaledVector(n, side * (HW - 0.06));
      const artGeo = new THREE.PlaneGeometry(artW, artH);
      geometries.push(artGeo);
      const artMesh = new THREE.Mesh(artGeo, artMat);
      artMesh.position.set(wp.x, 2.28, wp.z);
      artMesh.lookAt(p.x, 2.28, p.z);
      artMesh.userData.i = i;
      scene.add(artMesh);
      meshes.push(artMesh);
      meshDims.push({ w: artW, h: artH });

      // Compute exact perpendicular camera dolly position directly in front of this painting
      const dollyDist = isPortrait ? 3.1 : 3.25;
      const focusCamPos = wp
        .clone()
        .addScaledVector(n, -side * dollyDist)
        .setY(2.26);
      focusPositions.push(focusCamPos);

      // 3D Museum Frame + Subtle Gold Lip
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
      const poolGeo = new THREE.PlaneGeometry(artW + 2.8, artH + 2.6);
      const poolMat = new THREE.MeshBasicMaterial({
        map: poolTex,
        transparent: true,
        opacity: 0.58,
        depthWrite: false,
      });
      geometries.push(poolGeo);
      materials.push(poolMat);
      const pool = new THREE.Mesh(poolGeo, poolMat);
      pool.position.set(wl.x, 2.3, wl.z);
      pool.lookAt(p.x, 2.3, p.z);
      scene.add(pool);

      // Museum Gallery Benches Along the Corridor
      if (i % 2 === 0) {
        const bn = p.clone().addScaledVector(n, -side * (HW - 1.3));
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

      // Museum Wall Caption Plaque Mounted Below Each Frame
      const cTex = createCaptionTexture(exhibit);
      textures.push(cTex);
      const capGeo = new THREE.PlaneGeometry(1.7, 0.42);
      const capMat = new THREE.MeshBasicMaterial({ map: cTex, transparent: true });
      geometries.push(capGeo);
      materials.push(capMat);
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(wp.x, 2.28 - artH / 2 - 0.36, wp.z);
      cap.lookAt(p.x, 2.28 - artH / 2 - 0.36, p.z);
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

    const camPosCur = new THREE.Vector3();
    const camPosTarget = new THREE.Vector3();
    const lookAtCur = new THREE.Vector3();
    const lookAtTarget = new THREE.Vector3();
    const tmpPos = new THREE.Vector3();
    let camInitialized = false;
    let baseFov = W < 640 ? 70 : 60;
    let curFov = baseFov;

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
        const primaryDelta = Math.abs(dx) >= Math.abs(dy) ? dx : dy;
        tgt = clamp(tgt - primaryDelta * 0.00052);
        dragStartX = e.clientX;
        dragStartY = e.clientY;
      } else if (focus < 0) {
        hov = pick(e.clientX, e.clientY);
        dom.style.cursor = hov >= 0 ? 'pointer' : 'grab';
      }
    };

    const projectMeshToScreenRect = (index: number): ScreenRect | null => {
      const mesh = meshes[index];
      const dims = meshDims[index];
      if (!mesh || !dims) return null;
      mesh.updateMatrixWorld(true);
      cam.updateMatrixWorld(true);
      const rect = dom.getBoundingClientRect();
      const hw = dims.w / 2;
      const hh = dims.h / 2;
      const corners = [
        new THREE.Vector3(-hw, -hh, 0),
        new THREE.Vector3(hw, -hh, 0),
        new THREE.Vector3(-hw, hh, 0),
        new THREE.Vector3(hw, hh, 0),
      ];
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      corners.forEach((c) => {
        c.applyMatrix4(mesh.matrixWorld).project(cam);
        const px = rect.left + (c.x * 0.5 + 0.5) * rect.width;
        const py = rect.top + (-c.y * 0.5 + 0.5) * rect.height;
        if (px < minX) minX = px;
        if (px > maxX) maxX = px;
        if (py < minY) minY = py;
        if (py > maxY) maxY = py;
      });
      return {
        left: minX,
        top: minY,
        width: Math.max(40, maxX - minX),
        height: Math.max(40, maxY - minY),
      };
    };

    const onPointerUp = (e: PointerEvent) => {
      const wasMoved = moved;
      dragStartX = null;
      dragStartY = null;
      if (!wasMoved && focus < 0) {
        const i = pick(e.clientX, e.clientY);
        if (i >= 0) {
          focus = i;
          tgt = clamp(ts[i] - 0.015);
          if (focusTimerRef.current) window.clearTimeout(focusTimerRef.current);
          focusTimerRef.current = window.setTimeout(() => {
            const sourceRect = projectMeshToScreenRect(i);
            setFocusedSelection({
              exhibit: hallExhibits[i],
              sourceRect,
            });
          }, 1200);
        }
      }
    };

    const onResize = () => {
      if (!el) return;
      W = el.clientWidth || window.innerWidth;
      H = el.clientHeight || window.innerHeight;
      renderer.setSize(W, H);
      baseFov = W < 640 ? 70 : 60;
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
        setFocusedSelection(null);
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

      meshes.forEach((m, i) => {
        const targetScale = i === hov && focus < 0 ? 1.035 : 1;
        m.scale.setScalar(m.scale.x + (targetScale - m.scale.x) * 0.14);
      });

      const now = performance.now();
      dust.position.y = Math.sin(now / 2600) * 0.08;
      dust.rotation.y = Math.sin(now / 11000) * 0.008;

      const safeCur = Math.max(0.001, Math.min(0.999, cur));
      const p = curve.getPointAt(safeCur);

      if (focus >= 0 && meshes[focus] && focusPositions[focus]) {
        // Dolly camera off the spline directly in front of the selected artwork
        camPosTarget.copy(focusPositions[focus]);
        meshes[focus].getWorldPosition(tmpPos);
        lookAtTarget.copy(tmpPos);
      } else {
        camPosTarget.set(p.x, 1.72 + Math.sin(safeCur * 420) * 0.011, p.z);
        const q = curve.getPointAt(Math.min(0.999, safeCur + 0.032));
        lookAtTarget.set(q.x, 1.78, q.z);
      }

      if (!camInitialized) {
        camPosCur.copy(camPosTarget);
        lookAtCur.copy(lookAtTarget);
        camInitialized = true;
      } else {
        // Calm, half-speed dolly-in & step-back interpolation
        const posEase = focus >= 0 ? 0.038 : 0.042;
        const lookEase = focus >= 0 ? 0.042 : 0.048;
        camPosCur.lerp(camPosTarget, posEase);
        lookAtCur.lerp(lookAtTarget, lookEase);
      }

      // Subtle cinema telephoto lens pull when approaching a painting, widening back when stepping out
      const targetFov = focus >= 0 ? baseFov - 11 : baseFov;
      if (Math.abs(targetFov - curFov) > 0.02) {
        curFov += (targetFov - curFov) * 0.038;
        cam.fov = curFov;
        cam.updateProjectionMatrix();
      }

      cam.position.copy(camPosCur);
      cam.lookAt(lookAtCur);
      if (focus < 0) {
        cam.rotateY(yaw);
      }

      lamp.position.set(cam.position.x, 3.65, cam.position.z);

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
    <div className="relative w-full h-full overflow-hidden select-none bg-[#2d2c34]">
      {/* 1. Three.js Interactive 3D Winding Museum Corridor */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full touch-none" />

      {/* Gentle Architectural Edge Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, transparent 58%, rgba(15, 14, 20, 0.42) 100%)',
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
            <div className="text-center">
              <span className="block text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.26em] text-[#d5d0c5]">
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
                  <h2 className="font-art-script text-3xl sm:text-4xl text-[#fdfbf7] leading-tight drop-shadow">
                    {nearestExhibit.title}
                  </h2>
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#e5b85b]">
                    {nearestExhibit.categoryLabel} · {nearestExhibit.creator}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Wing Quick-Jump Bar */}
            <div className="pointer-events-auto flex items-center gap-1 px-2 py-1 rounded-full bg-[#191820]/75 backdrop-blur-2xl border border-[#f4f1ea]/15 overflow-x-auto no-scrollbar max-w-[90vw]">
              {CATEGORIES.map((cat) => {
                const isActiveWing = nearestExhibit.category === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => jumpToCategory(cat.id)}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer shrink-0 ${
                      isActiveWing
                        ? 'bg-[#e5b85b] text-[#09090c] font-semibold'
                        : 'text-[#d5d0c5] hover:text-[#f4f1ea]'
                    }`}
                  >
                    {cat.shortLabel}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[#d5d0c5]/80">
              <MoveHorizontal className="w-3 h-3 text-[#e5b85b]" />
              <span>Scroll or drag to walk · Click any painting to step closer</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Step Forward / Backward Buttons (Bottom-Right) */}
      {!focusedExhibit && (
        <div className="hidden sm:flex items-center gap-2 fixed right-6 bottom-6 z-20">
          <button
            onClick={() => apiRef.current.step(-0.045)}
            className="w-9 h-9 rounded-full bg-[#1c1b24]/80 hover:bg-[#e5b85b] text-[#f4f1ea] hover:text-[#09090c] backdrop-blur-xl border border-[#f4f1ea]/18 flex items-center justify-center transition-all cursor-pointer"
            title="Walk Backward"
            aria-label="Walk backward"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={() => apiRef.current.step(0.045)}
            className="w-9 h-9 rounded-full bg-[#1c1b24]/80 hover:bg-[#e5b85b] text-[#f4f1ea] hover:text-[#09090c] backdrop-blur-xl border border-[#f4f1ea]/18 flex items-center justify-center transition-all cursor-pointer"
            title="Walk Forward"
            aria-label="Walk forward"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 3. FULL-SCREEN ON-THE-WALL CURATORIAL VIEW (Silky Cinema In & Out Choreography) */}
      <AnimatePresence>
        {focusedExhibit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-30 overflow-y-auto no-scrollbar cursor-default"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 34% 42%, rgba(244, 214, 152, 0.14) 0%, transparent 65%), linear-gradient(180deg, #32313a 0%, #26252d 55%, #1d1c23 100%)',
            }}
          >
            {/* Minimal On-Wall Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              onClick={handleReturnToHall}
              className="fixed top-20 left-5 sm:left-10 z-40 inline-flex items-center gap-2 text-xs font-medium text-[#d5d0c5] hover:text-[#f4f1ea] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#e5b85b]" />
              <span>Back to gallery</span>
            </motion.button>

            {/* Full-Wall Split Presentation: Artwork Smoothly Resizes From 3D Wall Position While Text Slides In Simultaneously */}
            <div className="min-h-full w-full max-w-6xl mx-auto px-6 sm:px-12 lg:px-16 pt-32 pb-16 flex items-center">
              <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-center">
                {/* LEFT: Artwork Morphs & Resizes Smoothly From Exact 3D Screen Rect Into View-Mode Size */}
                <div className="md:col-span-6 flex flex-col items-center">
                  <motion.div
                    ref={targetArtRef}
                    initial={{
                      x: flipOrigin.x,
                      y: flipOrigin.y,
                      scale: flipOrigin.scale,
                      opacity: 0.92,
                    }}
                    animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                    exit={{
                      x: flipOrigin.x,
                      y: flipOrigin.y,
                      scale: flipOrigin.scale,
                      opacity: 0,
                    }}
                    transition={{ duration: 1.44, ease: [0.16, 1, 0.3, 1] }}
                    className="relative"
                  >
                    <div
                      className="pointer-events-none absolute -inset-12 -z-10"
                      style={{
                        background:
                          'radial-gradient(circle at 50% 45%, rgba(255, 232, 184, 0.24) 0%, transparent 68%)',
                      }}
                    />
                    <div className="p-2 bg-[#17161b] ring-1 ring-[#c5a260]/45 shadow-[0_32px_70px_rgba(0,0,0,0.65)]">
                      <img
                        src={focusedExhibit.images.main}
                        alt={focusedExhibit.title}
                        className="max-h-[52dvh] md:max-h-[64dvh] w-auto h-auto object-contain block"
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, delay: 0.45 }}
                    className="mt-4 w-full max-w-md flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#b8b3aa]"
                  >
                    <span>{focusedExhibit.hallNumber}</span>
                    <span>{focusedExhibit.dimensions || focusedExhibit.period}</span>
                  </motion.div>
                </div>

                {/* RIGHT: Curatorial Text Slides In Smoothly From the Right At The Same Time */}
                <motion.div
                  initial={{ opacity: 0, x: 56 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 44 }}
                  transition={{ duration: 1.44, ease: [0.16, 1, 0.3, 1] }}
                  className="md:col-span-6 space-y-5 text-left"
                >
                  <div>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e5b85b] mb-1.5">
                      {focusedExhibit.categoryLabel}
                    </span>
                    <h1 className="font-art-script text-5xl sm:text-6xl text-[#fdfbf7] leading-[1.04]">
                      {focusedExhibit.title}
                    </h1>
                    <p className="text-base sm:text-lg text-[#e8e3d8] font-medium mt-1">
                      {focusedExhibit.creator}
                    </p>
                  </div>

                  {/* Subtle Wall Hairline Metadata Row */}
                  <div className="flex flex-wrap gap-x-5 gap-y-2 py-3 border-y border-[#f4f1ea]/15 text-xs text-[#d5d0c5]">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#e5b85b]" />
                      {focusedExhibit.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#e5b85b]" />
                      {focusedExhibit.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#e5b85b]" />
                      {focusedExhibit.mediumOrMaterial.split(';')[0]}
                    </span>
                  </div>

                  {/* Clean Wall Description */}
                  <div className="space-y-3 text-sm sm:text-[15px] text-[#e8e3d8]/92 leading-relaxed max-w-lg">
                    <p>{focusedExhibit.introduction}</p>
                    {focusedExhibit.story.paragraphs[0] && (
                      <p className="text-[#c5c0b7] text-xs sm:text-sm leading-relaxed">
                        {focusedExhibit.story.paragraphs[0]}
                      </p>
                    )}
                  </div>

                  {/* Primary CTA Directly Beneath the Wall Text */}
                  <div className="pt-3 max-w-md">
                    <button
                      onClick={() => onSelectExhibit(focusedExhibit)}
                      className="w-full inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#e5b85b] hover:bg-[#f0c770] text-[#09090c] text-xs sm:text-sm font-bold uppercase tracking-[0.16em] transition-all cursor-pointer shadow-[0_14px_34px_rgba(0,0,0,0.35)]"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Enter Living Stage</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
