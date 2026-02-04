import { renderHook, act } from '@testing-library/react';
import { useProjectModal } from '../hooks/useProjectModal';
import { Artwork } from '../types/artwork';

const mockArtworks: Artwork[] = [
  {
    id: 1,
    title: 'Project 1',
    category: 'Photography',
    year: '2021',
    thumbnail: '/thumb1.jpg',
    images: ['/img1-1.jpg', '/img1-2.jpg', '/img1-3.jpg'],
    type: 'image',
  },
  {
    id: 2,
    title: 'Project 2',
    category: 'Painting',
    year: '2022',
    thumbnail: '/thumb2.jpg',
    images: ['/img2-1.jpg'],
    type: 'image',
  },
  {
    id: 3,
    title: 'Project 3',
    category: 'Video',
    year: '2023',
    thumbnail: '/thumb3.jpg',
    images: [],
    type: 'video',
    videoId: 'abc123',
  },
];

describe('useProjectModal', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
  });

  describe('initial state', () => {
    it('should start with modal closed', () => {
      const { result } = renderHook(() => useProjectModal({ artworks: mockArtworks }));
      expect(result.current.isOpen).toBe(false);
      expect(result.current.currentProject).toBeNull();
      expect(result.current.currentImageIndex).toBe(0);
    });
  });

  describe('openProject', () => {
    it('should open modal with selected project', () => {
      const { result } = renderHook(() => useProjectModal({ artworks: mockArtworks }));

      act(() => {
        result.current.openProject(mockArtworks[0]);
      });

      expect(result.current.isOpen).toBe(true);
      expect(result.current.currentProject).toEqual(mockArtworks[0]);
      expect(result.current.currentImageIndex).toBe(0);
    });

    it('should lock body scroll when opening', () => {
      const { result } = renderHook(() => useProjectModal({ artworks: mockArtworks }));

      act(() => {
        result.current.openProject(mockArtworks[0]);
      });

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should reset image index when opening new project', () => {
      const { result } = renderHook(() => useProjectModal({ artworks: mockArtworks }));

      act(() => {
        result.current.openProject(mockArtworks[0]);
        result.current.setImageIndex(2);
      });

      expect(result.current.currentImageIndex).toBe(2);

      act(() => {
        result.current.openProject(mockArtworks[1]);
      });

      expect(result.current.currentImageIndex).toBe(0);
    });
  });

  describe('closeProject', () => {
    it('should close modal and reset state', () => {
      const { result } = renderHook(() => useProjectModal({ artworks: mockArtworks }));

      act(() => {
        result.current.openProject(mockArtworks[0]);
      });

      act(() => {
        result.current.closeProject();
      });

      expect(result.current.isOpen).toBe(false);
      expect(result.current.currentProject).toBeNull();
      expect(result.current.currentImageIndex).toBe(0);
    });

    it('should unlock body scroll when closing', () => {
      const { result } = renderHook(() => useProjectModal({ artworks: mockArtworks }));

      act(() => {
        result.current.openProject(mockArtworks[0]);
      });

      act(() => {
        result.current.closeProject();
      });

      expect(document.body.style.overflow).toBe('unset');
    });
  });

  describe('image navigation', () => {
    it('should go to next image', () => {
      const { result } = renderHook(() => useProjectModal({ artworks: mockArtworks }));

      act(() => {
        result.current.openProject(mockArtworks[0]); // Has 3 images
      });

      act(() => {
        result.current.nextImage();
      });

      expect(result.current.currentImageIndex).toBe(1);
    });

    it('should wrap to first image when at end', () => {
      const { result } = renderHook(() => useProjectModal({ artworks: mockArtworks }));

      act(() => {
        result.current.openProject(mockArtworks[0]); // Has 3 images
        result.current.setImageIndex(2);
      });

      act(() => {
        result.current.nextImage();
      });

      expect(result.current.currentImageIndex).toBe(0);
    });

    it('should go to previous image', () => {
      const { result } = renderHook(() => useProjectModal({ artworks: mockArtworks }));

      act(() => {
        result.current.openProject(mockArtworks[0]);
        result.current.setImageIndex(2);
      });

      act(() => {
        result.current.prevImage();
      });

      expect(result.current.currentImageIndex).toBe(1);
    });

    it('should wrap to last image when at beginning', () => {
      const { result } = renderHook(() => useProjectModal({ artworks: mockArtworks }));

      act(() => {
        result.current.openProject(mockArtworks[0]); // Has 3 images
      });

      act(() => {
        result.current.prevImage();
      });

      expect(result.current.currentImageIndex).toBe(2);
    });

    it('should not change index for single image projects', () => {
      const { result } = renderHook(() => useProjectModal({ artworks: mockArtworks }));

      act(() => {
        result.current.openProject(mockArtworks[1]); // Has 1 image
      });

      act(() => {
        result.current.nextImage();
      });

      expect(result.current.currentImageIndex).toBe(0);
    });
  });

  describe('project navigation', () => {
    it('should go to next project', () => {
      const { result } = renderHook(() => useProjectModal({ artworks: mockArtworks }));

      act(() => {
        result.current.openProject(mockArtworks[0]);
      });

      act(() => {
        result.current.nextProject();
      });

      expect(result.current.currentProject).toEqual(mockArtworks[1]);
    });

    it('should wrap to first project when at end', () => {
      const { result } = renderHook(() => useProjectModal({ artworks: mockArtworks }));

      act(() => {
        result.current.openProject(mockArtworks[2]); // Last project
      });

      act(() => {
        result.current.nextProject();
      });

      expect(result.current.currentProject).toEqual(mockArtworks[0]);
    });

    it('should go to previous project', () => {
      const { result } = renderHook(() => useProjectModal({ artworks: mockArtworks }));

      act(() => {
        result.current.openProject(mockArtworks[1]);
      });

      act(() => {
        result.current.prevProject();
      });

      expect(result.current.currentProject).toEqual(mockArtworks[0]);
    });

    it('should wrap to last project when at beginning', () => {
      const { result } = renderHook(() => useProjectModal({ artworks: mockArtworks }));

      act(() => {
        result.current.openProject(mockArtworks[0]); // First project
      });

      act(() => {
        result.current.prevProject();
      });

      expect(result.current.currentProject).toEqual(mockArtworks[2]);
    });

    it('should reset image index when navigating projects', () => {
      const { result } = renderHook(() => useProjectModal({ artworks: mockArtworks }));

      act(() => {
        result.current.openProject(mockArtworks[0]);
        result.current.setImageIndex(2);
      });

      act(() => {
        result.current.nextProject();
      });

      expect(result.current.currentImageIndex).toBe(0);
    });
  });

  describe('setImageIndex', () => {
    it('should set image index directly', () => {
      const { result } = renderHook(() => useProjectModal({ artworks: mockArtworks }));

      act(() => {
        result.current.openProject(mockArtworks[0]);
      });

      act(() => {
        result.current.setImageIndex(2);
      });

      expect(result.current.currentImageIndex).toBe(2);
    });
  });
});
