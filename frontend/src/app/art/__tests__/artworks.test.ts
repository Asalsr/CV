import { artworks, getRelatedProjects, getYearStats, getUniqueCategories } from '../data/artworks';
import { Artwork } from '../types/artwork';

describe('Artworks Data', () => {
  describe('artworks array', () => {
    it('should have 15 artworks', () => {
      expect(artworks).toHaveLength(15);
    });

    it('should have unique IDs for all artworks', () => {
      const ids = artworks.map((a) => a.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(artworks.length);
    });

    it('should have required fields for each artwork', () => {
      artworks.forEach((artwork) => {
        expect(artwork.id).toBeDefined();
        expect(artwork.title).toBeDefined();
        expect(artwork.category).toBeDefined();
        expect(artwork.year).toBeDefined();
        expect(artwork.thumbnail).toBeDefined();
        expect(artwork.images).toBeDefined();
        expect(artwork.type).toBeDefined();
      });
    });

    it('should have descriptions for all artworks', () => {
      artworks.forEach((artwork) => {
        expect(artwork.description).toBeDefined();
        expect(artwork.description!.length).toBeGreaterThan(0);
      });
    });

    it('should have valid type values', () => {
      artworks.forEach((artwork) => {
        expect(['image', 'video']).toContain(artwork.type);
      });
    });

    it('should have videoId for video type artworks', () => {
      const videoArtworks = artworks.filter((a) => a.type === 'video');
      videoArtworks.forEach((artwork) => {
        expect(artwork.videoId).toBeDefined();
      });
    });
  });

  describe('getRelatedProjects', () => {
    it('should return related projects based on relatedProjects array', () => {
      const artworkWithRelated = artworks.find((a) => a.relatedProjects && a.relatedProjects.length > 0);
      if (artworkWithRelated) {
        const related = getRelatedProjects(artworkWithRelated, artworks);
        expect(related.length).toBeGreaterThan(0);
        expect(related.length).toBeLessThanOrEqual(3);
      }
    });

    it('should fallback to same category if no relatedProjects', () => {
      const artworkWithoutRelated: Artwork = {
        id: 999,
        title: 'Test',
        category: 'Photography',
        year: '2023',
        thumbnail: '/test.jpg',
        images: ['/test.jpg'],
        type: 'image',
      };
      const related = getRelatedProjects(artworkWithoutRelated, artworks);
      related.forEach((r) => {
        expect(r.category).toBe('Photography');
      });
    });

    it('should not include the current artwork in related', () => {
      artworks.forEach((artwork) => {
        const related = getRelatedProjects(artwork, artworks);
        const ids = related.map((r) => r.id);
        expect(ids).not.toContain(artwork.id);
      });
    });

    it('should return max 3 projects', () => {
      artworks.forEach((artwork) => {
        const related = getRelatedProjects(artwork, artworks);
        expect(related.length).toBeLessThanOrEqual(3);
      });
    });
  });

  describe('getYearStats', () => {
    it('should return a map of years to project counts', () => {
      const stats = getYearStats(artworks);
      expect(stats).toBeInstanceOf(Map);
      expect(stats.size).toBeGreaterThan(0);
    });

    it('should count projects correctly', () => {
      const stats = getYearStats(artworks);
      let total = 0;
      stats.forEach((count) => {
        total += count;
      });
      expect(total).toBe(artworks.length);
    });

    it('should extract start year from year ranges', () => {
      const stats = getYearStats(artworks);
      // Artwork with year "2015-2018" should be counted under "2015"
      const has2015 = stats.has('2015');
      expect(has2015).toBe(true);
    });
  });

  describe('getUniqueCategories', () => {
    it('should return unique categories', () => {
      const categories = getUniqueCategories(artworks);
      expect(categories).toBeInstanceOf(Set);
      expect(categories.size).toBeGreaterThan(0);
    });

    it('should include Photography category', () => {
      const categories = getUniqueCategories(artworks);
      expect(categories.has('Photography')).toBe(true);
    });
  });
});
