import { render, screen, fireEvent } from '@testing-library/react';
import ProjectCard from '../components/ProjectCard';
import { Artwork } from '../types/artwork';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, onClick, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div onClick={onClick} {...props}>
        {children}
      </div>
    ),
  },
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

const mockImageArtwork: Artwork = {
  id: 1,
  title: 'Test Image Project',
  category: 'Photography',
  year: '2023',
  thumbnail: '/test-thumb.jpg',
  images: ['/img1.jpg', '/img2.jpg', '/img3.jpg'],
  type: 'image',
  description: 'A test project',
};

const mockVideoArtwork: Artwork = {
  id: 2,
  title: 'Test Video Project',
  category: 'Video',
  year: '2022',
  thumbnail: '/video-thumb.jpg',
  images: [],
  type: 'video',
  videoId: 'abc123',
};

const mockSingleImageArtwork: Artwork = {
  id: 3,
  title: 'Single Image Project',
  category: 'Painting',
  year: '2021',
  thumbnail: '/single-thumb.jpg',
  images: ['/single.jpg'],
  type: 'image',
};

describe('ProjectCard', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('should render artwork title', () => {
    render(<ProjectCard artwork={mockImageArtwork} onClick={mockOnClick} index={0} />);
    expect(screen.getAllByText('Test Image Project').length).toBeGreaterThan(0);
  });

  it('should render artwork category and year', () => {
    render(<ProjectCard artwork={mockImageArtwork} onClick={mockOnClick} index={0} />);
    expect(screen.getByText('Photography')).toBeInTheDocument();
    expect(screen.getAllByText('2023').length).toBeGreaterThan(0);
  });

  it('should render thumbnail image with correct alt text', () => {
    render(<ProjectCard artwork={mockImageArtwork} onClick={mockOnClick} index={0} />);
    const img = screen.getByAltText('Test Image Project');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test-thumb.jpg');
  });

  it('should call onClick when clicked', () => {
    render(<ProjectCard artwork={mockImageArtwork} onClick={mockOnClick} index={0} />);
    const card = screen.getAllByText('Test Image Project')[0].closest('.group');
    fireEvent.click(card!);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should show image count badge for multi-image projects', () => {
    render(<ProjectCard artwork={mockImageArtwork} onClick={mockOnClick} index={0} />);
    expect(screen.getByText('3 images')).toBeInTheDocument();
  });

  it('should not show image count badge for single image projects', () => {
    render(<ProjectCard artwork={mockSingleImageArtwork} onClick={mockOnClick} index={0} />);
    expect(screen.queryByText(/images/)).not.toBeInTheDocument();
  });

  it('should show play icon for video projects', () => {
    render(<ProjectCard artwork={mockVideoArtwork} onClick={mockOnClick} index={0} />);
    // The Play icon from lucide-react should be present
    const playIconContainer = document.querySelector('.w-16.h-16');
    expect(playIconContainer).toBeInTheDocument();
  });

  it('should not show play icon for image projects', () => {
    render(<ProjectCard artwork={mockImageArtwork} onClick={mockOnClick} index={0} />);
    const playIconContainer = document.querySelector('.w-16.h-16');
    expect(playIconContainer).not.toBeInTheDocument();
  });
});
