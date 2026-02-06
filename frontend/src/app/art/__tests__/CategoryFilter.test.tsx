import { render, screen, fireEvent } from '@testing-library/react';
import CategoryFilter from '../components/CategoryFilter';
import { ArtworkCategory } from '../types/artwork';

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
  'Digital Art',
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
      expect(screen.getByText(category)).toBeInTheDocument();
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

    fireEvent.click(screen.getByText('Photography'));
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

    fireEvent.click(screen.getByText('All'));
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

    const selectedButton = screen.getByText('Photography');
    const unselectedButton = screen.getByText('All');

    // Check that selected button has different background color
    expect(selectedButton).toHaveStyle({
      backgroundColor: '#5B8DEF',
    });
    expect(unselectedButton).toHaveStyle({
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    });
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
