import type { Exhibit } from '../types/exhibit';

export interface CameraTarget {
  /** Target horizontal focal point percentage (0-100, 50 is center) */
  x: number;
  /** Target vertical focal point percentage (0-100, 50 is center) */
  y: number;
  /** Zoom level (1.0 = 100% full artwork completely visible, 1.15-1.22 = gentle focal zoom) */
  scale: number;
  /** Subtle 3D tilt angles in degrees */
  rotateX: number;
  rotateY: number;
}

export interface StoryChapter {
  id: string;
  indexLabel: string;
  tabLabel: string;
  badge: string;
  heading: string;
  body: string;
  secondaryText?: string;
  camera: CameraTarget;
  hotspotCoord?: { x: number; y: number };
}

/**
 * Generates an uncropped, full-visibility sequence of story chapters.
 * Keeps the full artwork visible while gently guiding the eye.
 */
export function buildExhibitChapters(exhibit: Exhibit): StoryChapter[] {
  const chapters: StoryChapter[] = [];

  // Chapter 1: Overview (100% Full Uncropped Canvas View)
  chapters.push({
    id: 'intro',
    indexLabel: '01',
    tabLabel: 'Overview',
    badge: 'FEATURED EXHIBIT',
    heading: exhibit.title,
    body: exhibit.introduction,
    secondaryText: exhibit.quote
      ? `"${exhibit.quote.text}" — ${exhibit.quote.attribution}`
      : `${exhibit.creator} · ${exhibit.date} · ${exhibit.location}`,
    camera: {
      x: 50,
      y: 50,
      scale: 1.0,
      rotateX: 0.5,
      rotateY: -0.8,
    },
  });

  // Chapter 2: The Story (Gentle subtle camera glide, full artwork remains in view)
  if (exhibit.story.paragraphs.length > 0) {
    chapters.push({
      id: 'story-1',
      indexLabel: '02',
      tabLabel: 'The Story',
      badge: 'ORIGIN & HISTORY',
      heading: exhibit.story.heading,
      body: exhibit.story.paragraphs[0],
      secondaryText: exhibit.story.paragraphs[1] || undefined,
      camera: {
        x: 48,
        y: 48,
        scale: 1.04,
        rotateX: -0.5,
        rotateY: 0.8,
      },
    });
  }

  // Chapters 3..N: Look Closer Details (Gentle focal zoom: ~1.16x so the detail is clear without cutting off the artwork)
  exhibit.lookCloser.forEach((detail, idx) => {
    const targetX = detail.x ?? (idx % 2 === 0 ? 42 : 58);
    const targetY = detail.y ?? (idx % 2 === 0 ? 40 : 55);
    const chapterNum = chapters.length + 1;

    chapters.push({
      id: `detail-${detail.id}`,
      indexLabel: `0${chapterNum}`,
      tabLabel: detail.title.length > 18 ? `${detail.tag}` : detail.title,
      badge: `LOOK CLOSER · ${detail.tag.toUpperCase()}`,
      heading: detail.title,
      body: detail.description,
      camera: {
        x: targetX,
        y: targetY,
        scale: 1.18,
        rotateX: idx % 2 === 0 ? 0.8 : -0.8,
        rotateY: idx % 2 === 0 ? -1.0 : 1.0,
      },
      hotspotCoord:
        detail.x !== undefined && detail.y !== undefined
          ? { x: detail.x, y: detail.y }
          : undefined,
    });
  });

  // Meaning & Significance Chapter (Full 100% canvas view)
  const meaningNum = chapters.length + 1;
  chapters.push({
    id: 'meaning',
    indexLabel: `0${meaningNum}`,
    tabLabel: 'Significance',
    badge: 'MEANING & LEGACY',
    heading: exhibit.meaning.heading,
    body: exhibit.meaning.paragraphs[0],
    secondaryText: `Key Takeaway: ${exhibit.meaning.keyTakeaway}`,
    camera: {
      x: 50,
      y: 50,
      scale: 1.0,
      rotateX: 0,
      rotateY: 0.5,
    },
  });

  // Did You Know Chapter (Full 100% canvas view with calm drift)
  if (exhibit.didYouKnow.length > 0) {
    const factsNum = chapters.length + 1;
    chapters.push({
      id: 'did-you-know',
      indexLabel: `0${factsNum}`,
      tabLabel: 'Did You Know?',
      badge: 'HIDDEN HISTORY',
      heading: 'Surprising Archival Facts',
      body: exhibit.didYouKnow[0],
      secondaryText: exhibit.didYouKnow[1]
        ? `Also: ${exhibit.didYouKnow[1]}`
        : undefined,
      camera: {
        x: 50,
        y: 50,
        scale: 1.03,
        rotateX: 0.5,
        rotateY: -0.6,
      },
    });
  }

  return chapters;
}
