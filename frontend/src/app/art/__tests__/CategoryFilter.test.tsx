import { render, screen, fireEvent } from '@testing-library/react';
import CategoryFilter from '../components/CategoryFilter';
import { ArtworkCategory } from '../types/artwork';

// Mock next-intl (handled by jest.config moduleNameMapper)

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    button: ({
      children,
      onClick,
      style,
      className,
    }: {
      children: React.ReactNode;
      onClick: () => void;
      style?: React.CSSProperties;
      className?: string;
    }) => (
      <button onClick={onClick} style={style} className={className}>
        {children}
      </button>
    ),
  },
}));

const mockCategories: readonly (ArtworkCategory | 'All')[] = [
  'All',
  'Photography',
  'Painting',
  'Video',
  'Graphic Design',
];

describe('CategoryFilter', () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it('should render all category buttons', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selected="All"
        onSelect={mockOnSelect}
      />
    );

    mockCategories.forEach((category) => {
      expect(screen.getByText(`art.categories.${category}`)).toBeInTheDocument();
    });
  });

  it('should call onSelect when a category is clicked', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selected="All"
        onSelect={mockOnSelect}
      />
    );

    fireEvent.click(screen.getByText('art.categories.Photography'));
    expect(mockOnSelect).toHaveBeenCalledWith('Photography');
  });

  it('should call onSelect with "All" when All is clicked', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selected="Photography"
        onSelect={mockOnSelect}
      />
    );

    fireEvent.click(screen.getByText('art.categories.All'));
    expect(mockOnSelect).toHaveBeenCalledWith('All');
  });

  it('should apply different styles to selected category', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selected="Photography"
        onSelect={mockOnSelect}
      />
    );

    const selectedButton = screen.getByText('art.categories.Photography');
    const unselectedButton = screen.getByText('art.categories.All');

    // Selected button uses gradient bg + text-white
    expect(selectedButton).toHaveClass('text-white');
    // Unselected button uses text-gray-300
    expect(unselectedButton).toHaveClass('text-gray-300');
  });

  it('should render with correct number of buttons', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selected="All"
        onSelect={mockOnSelect}
      />
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(mockCategories.length);
  });
});
