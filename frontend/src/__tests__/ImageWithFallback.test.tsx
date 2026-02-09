import { render, screen, fireEvent } from '@testing-library/react';
import ImageWithFallback from '@/components/figma/ImageWithFallback';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ onError, ...props }: { onError?: () => void; src: string; alt: string; width?: number; height?: number; fill?: boolean }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      onError={onError}
      data-testid="next-image"
    />
  ),
}));

describe('ImageWithFallback Component', () => {
  it('should render next/image by default', () => {
    render(
      <ImageWithFallback src="/test.jpg" alt="Test image" width={200} height={200} />
    );
    expect(screen.getByTestId('next-image')).toBeInTheDocument();
    expect(screen.getByTestId('next-image')).toHaveAttribute('src', '/test.jpg');
  });

  it('should show fallback when image errors', () => {
    render(
      <ImageWithFallback src="/broken.jpg" alt="Broken image" width={200} height={200} />
    );
    const img = screen.getByTestId('next-image');
    fireEvent.error(img);

    // After error, should show the fallback SVG
    expect(screen.getByAltText('Broken image')).toBeInTheDocument();
  });

  it('should show default alt text when alt is empty in error state', () => {
    render(
      <ImageWithFallback src="/broken.jpg" alt="" width={200} height={200} />
    );
    const img = screen.getByTestId('next-image');
    fireEvent.error(img);

    expect(screen.getByAltText('Error loading image')).toBeInTheDocument();
  });

  it('should render fill variant fallback with absolute positioning', () => {
    render(
      <ImageWithFallback src="/broken.jpg" alt="Fill image" fill />
    );
    const img = screen.getByTestId('next-image');
    fireEvent.error(img);

    const container = screen.getByAltText('Fill image').closest('div');
    expect(container).toHaveClass('absolute', 'inset-0');
  });
});
