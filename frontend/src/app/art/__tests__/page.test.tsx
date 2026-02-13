import { render, screen, fireEvent } from '@testing-library/react';
import ArtPortfolio from '../page';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, onClick, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} onClick={onClick} {...props}>
        {children}
      </div>
    ),
    button: ({
      children,
      onClick,
      ...props
    }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    ),
    path: (props: React.SVGAttributes<SVGPathElement>) => <path {...props} />,
    circle: (props: React.SVGAttributes<SVGCircleElement>) => <circle {...props} />,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock lucide-react
jest.mock('lucide-react', () => ({
  ArrowLeft: () => <span data-testid="icon-arrow-left">ArrowLeft</span>,
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock Redux hooks
jest.mock('@/lib/redux/hooks', () => ({
  useAppSelector: jest.fn((selector: (state: { theme: { mode: string; isHydrated: boolean; colorScheme: string } }) => unknown) =>
    selector({ theme: { mode: 'light', isHydrated: true, colorScheme: 'palette-colors' } })
  ),
  useAppDispatch: jest.fn(() => jest.fn()),
}));

jest.mock('@/lib/redux/themeSlice', () => ({
  toggleThemeMode: jest.fn(),
  __esModule: true,
  default: jest.fn(),
}));

// Mock child components
jest.mock('../components/HeroSection', () => ({
  __esModule: true,
  default: ({
    selectedCategory,
    onCategorySelect,
  }: {
    artworks: unknown[];
    selectedCategory: string;
    onCategorySelect: (category: string) => void;
  }) => (
    <div data-testid="hero-section">
      <span data-testid="selected-category">{selectedCategory}</span>
      <button onClick={() => onCategorySelect('Photography')}>Select Photography</button>
      <button onClick={() => onCategorySelect('All')}>Select All</button>
    </div>
  ),
}));

jest.mock('../components/ProjectGrid', () => ({
  __esModule: true,
  default: ({
    categoryFilter,
    yearFilter,
    onProjectClick,
    artworks,
  }: {
    artworks: { id: number; title: string }[];
    categoryFilter: string;
    yearFilter: string | null;
    onProjectClick: (artwork: { id: number }) => void;
  }) => (
    <div data-testid="project-grid">
      <span data-testid="category-filter">{categoryFilter}</span>
      <span data-testid="year-filter">{yearFilter || 'none'}</span>
      <button onClick={() => onProjectClick(artworks[0])}>Open Project</button>
    </div>
  ),
}));

jest.mock('../components/InteractiveTimeline', () => ({
  __esModule: true,
  default: ({
    selectedYear,
    onYearSelect,
  }: {
    artworks: unknown[];
    selectedYear: string | null;
    onYearSelect: (year: string | null) => void;
  }) => (
    <div data-testid="interactive-timeline">
      <span data-testid="selected-year">{selectedYear || 'none'}</span>
      <button onClick={() => onYearSelect('2023')}>Select 2023</button>
      <button onClick={() => onYearSelect(null)}>Clear Year</button>
    </div>
  ),
}));

jest.mock('../components/ProjectModal', () => ({
  __esModule: true,
  default: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
    <div data-testid="project-modal" data-open={isOpen}>
      <button onClick={onClose}>Close Modal</button>
    </div>
  ),
}));

jest.mock('@/components/theme/ThemeModeToggle', () => ({
  __esModule: true,
  default: () => <button data-testid="theme-toggle">Toggle Theme</button>,
}));

jest.mock('@/components/LanguageSelector', () => ({
  __esModule: true,
  default: () => <button data-testid="language-selector">Language</button>,
}));

describe('ArtPortfolio Page', () => {
  it('should render the page header', () => {
    render(<ArtPortfolio />);
    expect(screen.getByText('art.page.title')).toBeInTheDocument();
    expect(screen.getByText('Saeedeh Sarmadi')).toBeInTheDocument();
  });

  it('should render back link to home', () => {
    render(<ArtPortfolio />);
    const backLink = screen.getByText('art.page.back').closest('a');
    expect(backLink).toHaveAttribute('href', '/');
  });

  it('should render theme toggle and language selector', () => {
    render(<ArtPortfolio />);
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('language-selector')).toBeInTheDocument();
  });

  it('should render all main sections', () => {
    render(<ArtPortfolio />);
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('project-grid')).toBeInTheDocument();
    expect(screen.getByTestId('interactive-timeline')).toBeInTheDocument();
    expect(screen.getByTestId('project-modal')).toBeInTheDocument();
  });

  it('should render footer with copyright and links', () => {
    render(<ArtPortfolio />);
    expect(screen.getByText(/art\.page\.copyright/)).toBeInTheDocument();
    expect(screen.getByText('art.page.devPortfolio')).toHaveAttribute('href', '/');
  });

  describe('category filtering', () => {
    it('should start with "All" category selected', () => {
      render(<ArtPortfolio />);
      expect(screen.getByTestId('selected-category')).toHaveTextContent('All');
      expect(screen.getByTestId('category-filter')).toHaveTextContent('All');
    });

    it('should update category filter when category is selected', () => {
      render(<ArtPortfolio />);
      fireEvent.click(screen.getByText('Select Photography'));
      expect(screen.getByTestId('category-filter')).toHaveTextContent('Photography');
    });

    it('should reset year filter when category is changed to non-All', () => {
      render(<ArtPortfolio />);

      // First select a year
      fireEvent.click(screen.getByText('Select 2023'));
      expect(screen.getByTestId('year-filter')).toHaveTextContent('2023');

      // Then select a category (should reset year)
      fireEvent.click(screen.getByText('Select Photography'));
      expect(screen.getByTestId('year-filter')).toHaveTextContent('none');
    });
  });

  describe('year filtering', () => {
    it('should start with no year selected', () => {
      render(<ArtPortfolio />);
      expect(screen.getByTestId('selected-year')).toHaveTextContent('none');
      expect(screen.getByTestId('year-filter')).toHaveTextContent('none');
    });

    it('should update year filter when year is selected', () => {
      render(<ArtPortfolio />);
      fireEvent.click(screen.getByText('Select 2023'));
      expect(screen.getByTestId('year-filter')).toHaveTextContent('2023');
    });

    it('should reset category to "All" when year is selected', () => {
      render(<ArtPortfolio />);

      // First select a category
      fireEvent.click(screen.getByText('Select Photography'));
      expect(screen.getByTestId('category-filter')).toHaveTextContent('Photography');

      // Then select a year (should reset category to All)
      fireEvent.click(screen.getByText('Select 2023'));
      expect(screen.getByTestId('category-filter')).toHaveTextContent('All');
    });

    it('should clear year filter when null is selected', () => {
      render(<ArtPortfolio />);

      fireEvent.click(screen.getByText('Select 2023'));
      expect(screen.getByTestId('year-filter')).toHaveTextContent('2023');

      fireEvent.click(screen.getByText('Clear Year'));
      expect(screen.getByTestId('year-filter')).toHaveTextContent('none');
    });
  });

  describe('modal interactions', () => {
    it('should start with modal closed', () => {
      render(<ArtPortfolio />);
      expect(screen.getByTestId('project-modal')).toHaveAttribute('data-open', 'false');
    });

    it('should open modal when project is clicked', () => {
      render(<ArtPortfolio />);
      fireEvent.click(screen.getByText('Open Project'));
      expect(screen.getByTestId('project-modal')).toHaveAttribute('data-open', 'true');
    });

    it('should close modal when close is triggered', () => {
      render(<ArtPortfolio />);

      // Open modal
      fireEvent.click(screen.getByText('Open Project'));
      expect(screen.getByTestId('project-modal')).toHaveAttribute('data-open', 'true');

      // Close modal
      fireEvent.click(screen.getByText('Close Modal'));
      expect(screen.getByTestId('project-modal')).toHaveAttribute('data-open', 'false');
    });
  });
});
