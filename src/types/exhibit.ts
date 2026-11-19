export type ExhibitCategory =
  | 'paintings'
  | 'sculptures'
  | 'wonders'
  | 'architecture'
  | 'books'
  | 'artefacts';

export interface CategoryMeta {
  id: ExhibitCategory;
  label: string;
  shortLabel: string;
  description: string;
  coverImage: string;
  featuredArtworkTitle: string;
  count?: number;
}

export interface ExhibitAtmosphere {
  name: string;
  bgPrimary: string;
  bgSecondary: string;
  accent: string;
  ambientGradient: string;
  borderSubtle: string;
}

export interface LookCloserDetail {
  id: string;
  title: string;
  description: string;
  tag: string;
  /** Optional percentage coordinates (0-100) for interactive artwork hotspot markers */
  x?: number;
  y?: number;
}

export interface SupportingImage {
  url: string;
  caption: string;
  credit?: string;
}

export interface ExhibitSource {
  provider: string;
  url: string;
  license: string;
  accessionNumber?: string;
  attribution: string;
}

export interface Exhibit {
  id: string;
  title: string;
  subtitle?: string;
  category: ExhibitCategory;
  categoryLabel: string;
  creator: string;
  creatorRole: string;
  date: string;
  period: string;
  location: string;
  mediumOrMaterial: string;
  dimensions?: string;
  featured?: boolean;
  hallNumber: string;
  curatedCollectionIds: string[];
  tagline: string;
  introduction: string;
  quote?: {
    text: string;
    attribution: string;
  };
  story: {
    heading: string;
    paragraphs: string[];
  };
  lookCloser: LookCloserDetail[];
  meaning: {
    heading: string;
    paragraphs: string[];
    keyTakeaway: string;
  };
  didYouKnow: string[];
  images: {
    main: string;
    aspectRatio: 'landscape' | 'portrait' | 'square';
    supporting?: SupportingImage[];
  };
  atmosphere: ExhibitAtmosphere;
  source: ExhibitSource;
  relatedExhibitIds: string[];
}

export interface CuratedCollection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  curatorNote: string;
  coverImage: string;
  exhibitIds: string[];
}
