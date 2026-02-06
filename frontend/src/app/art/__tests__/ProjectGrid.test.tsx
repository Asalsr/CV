import { render, screen, fireEvent } from '@testing-library/react';
import ProjectGrid from '../components/ProjectGrid';
import { Artwork } from '../types/artwork';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock ProjectCard component
jest.mock('../components/ProjectCard', () => ({
  __esModule: true,
  default: ({
    artwork,
    onClick,
  }: {
    artwork: Artwork;
    onClick: () => void;
    index: number;
  }) => (
    <div data-testid={`project-card-${artwork.id}`} onClick={onClick}>
      <span>{artwork.title}</span>
      <span>{artwork.category}</span>
      <span>{artwork.year}</span>
    </div>
  ),
}));

const mockArtworks: Artwork[] = [
  {
    id: 1,
    title: 'Photo Project',
    category: 'Photography',
    year: '2023',
    thumbnail: '/thumb1.jpg',
    images: ['/img1.jpg'],
    type: 'image',
  },
  {
    id: 2,
    title: 'Painting Project',
    category: 'Painting',
    year: '2022',
    thumbnail: '/thumb2.jpg',
    images: ['/img2.jpg'],
    type: 'image',
  },
  {
    id: 3,
    title: 'Another Photo',
    category: 'Photography',
    year: '2021',
    thumbnail: '/thumb3.jpg',
    images: ['/img3.jpg'],
    type: 'image',
  },
  {
    id: 4,
    title: 'Range Year Project',
    category: 'Digital Art',
    year: '2020-2021',
    thumbnail: '/thumb4.jpg',
    images: ['/img4.jpg'],
    type: 'image',
  },
];

describe('ProjectGrid', () => {
  const mockOnProjectClick = jest.fn();

  beforeEach(() => {
    mockOnProjectClick.mockClear();
  });

  describe('filtering', () => {
    it('should show all artworks when category is "All" and no year filter', () => {
      render(
        <ProjectGrid
          artworks={mockArtworks}
          categoryFilter="All"
          yearFilter={null}
          onProjectClick={mockOnProjectClick}
        />
      );

      expect(screen.getByTestId('project-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('project-card-2')).toBeInTheDocument();
      expect(screen.getByTestId('project-card-3')).toBeInTheDocument();
      expect(screen.getByTestId('project-card-4')).toBeInTheDocument();
    });

    it('should filter by category', () => {
      render(
        <ProjectGrid
          artworks={mockArtworks}
          categoryFilter="Photography"
          yearFilter={null}
          onProjectClick={mockOnProjectClick}
        />
      );

      expect(screen.getByTestId('project-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('project-card-3')).toBeInTheDocument();
      expect(screen.queryByTestId('project-card-2')).not.toBeInTheDocument();
      expect(screen.queryByTestId('project-card-4')).not.toBeInTheDocument();
    });

    it('should filter by year', () => {
      render(
        <ProjectGrid
          artworks={mockArtworks}
          categoryFilter="All"
          yearFilter="2023"
          onProjectClick={mockOnProjectClick}
        />
      );

      expect(screen.getByTestId('project-card-1')).toBeInTheDocument();
      expect(screen.queryByTestId('project-card-2')).not.toBeInTheDocument();
      expect(screen.queryByTestId('project-card-3')).not.toBeInTheDocument();
    });

    it('should handle year range filtering (extract start year)', () => {
      render(
        <ProjectGrid
          artworks={mockArtworks}
          categoryFilter="All"
          yearFilter="2020"
          onProjectClick={mockOnProjectClick}
        />
      );

      expect(screen.getByTestId('project-card-4')).toBeInTheDocument();
      expect(screen.queryByTestId('project-card-1')).not.toBeInTheDocument();
    });

    it('should filter by both category and year', () => {
      render(
        <ProjectGrid
          artworks={mockArtworks}
          categoryFilter="Photography"
          yearFilter="2023"
          onProjectClick={mockOnProjectClick}
        />
      );

      expect(screen.getByTestId('project-card-1')).toBeInTheDocument();
      expect(screen.queryByTestId('project-card-3')).not.toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    it('should show empty message when no projects match filters', () => {
      render(
        <ProjectGrid
          artworks={mockArtworks}
          categoryFilter="Video"
          yearFilter={null}
          onProjectClick={mockOnProjectClick}
        />
      );

      expect(
        screen.getByText('art.projectGrid.noResults')
      ).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('should call onProjectClick with correct artwork when card is clicked', () => {
      render(
        <ProjectGrid
          artworks={mockArtworks}
          categoryFilter="All"
          yearFilter={null}
          onProjectClick={mockOnProjectClick}
        />
      );

      fireEvent.click(screen.getByTestId('project-card-2'));
      expect(mockOnProjectClick).toHaveBeenCalledWith(mockArtworks[1]);
    });
  });

  describe('rendering', () => {
    it('should render grid with correct CSS classes', () => {
      const { container } = render(
        <ProjectGrid
          artworks={mockArtworks}
          categoryFilter="All"
          yearFilter={null}
          onProjectClick={mockOnProjectClick}
        />
      );

      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('grid-cols-1');
      expect(grid).toHaveClass('sm:grid-cols-2');
      expect(grid).toHaveClass('lg:grid-cols-3');
      expect(grid).toHaveClass('xl:grid-cols-4');
    });
  });
});
