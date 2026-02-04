export type ArtworkCategory =
  | 'Photography'
  | 'Painting'
  | 'Workshop/Illustration'
  | 'Illustration'
  | 'Graphic Design'
  | 'Mural Art'
  | 'Video';

export type ArtworkType = 'image' | 'video';

export interface Artwork {
  id: number;
  title: string;
  category: ArtworkCategory;
  year: string;
  thumbnail: string;
  images: string[];
  type: ArtworkType;
  videoId?: string;
  description?: string;
  externalLink?: string;
  relatedProjects?: number[];
}

export const CATEGORIES: readonly (ArtworkCategory | 'All')[] = [
  'All',
  'Photography',
  'Painting',
  'Workshop/Illustration',
  'Illustration',
  'Graphic Design',
  'Mural Art',
  'Video',
] as const;
