import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/figma/Hero';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props}>{children}</p>,
    a: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props}>{children}</a>,
    svg: ({ children, ...props }: React.SVGAttributes<SVGSVGElement>) => <svg {...props}>{children}</svg>,
    path: (props: React.SVGAttributes<SVGPathElement>) => <path {...props} />,
    line: (props: React.SVGAttributes<SVGLineElement>) => <line {...props} />,
    circle: (props: React.SVGAttributes<SVGCircleElement>) => <circle {...props} />,
  },
}));

jest.mock('lucide-react', () => ({
  Code: () => <span data-testid="icon-code">Code</span>,
  Palette: () => <span data-testid="icon-palette">Palette</span>,
  Sparkles: () => <span data-testid="icon-sparkles">Sparkles</span>,
}));

describe('Hero Component', () => {
  it('should render the name', () => {
    render(<Hero />);
    expect(screen.getByText('Saeedeh Sarmadi')).toBeInTheDocument();
  });

  it('should render the tagline', () => {
    render(<Hero />);
    expect(screen.getByText(/Agentic Developer/)).toBeInTheDocument();
  });

  it('should render the subtitle from translations', () => {
    render(<Hero />);
    expect(screen.getByText('hero.subtitle')).toBeInTheDocument();
  });

  it('should render Explore My Journey CTA', () => {
    render(<Hero />);
    const cta = screen.getByText('Explore My Journey');
    expect(cta).toBeInTheDocument();
    expect(cta.closest('a')).toHaveAttribute('href', '#roadmap');
  });

  it('should render View Skills CTA', () => {
    render(<Hero />);
    const cta = screen.getByText('View Skills');
    expect(cta).toBeInTheDocument();
    expect(cta.closest('a')).toHaveAttribute('href', '#skills');
  });

  it('should render three icons (Code, Sparkles, Palette)', () => {
    render(<Hero />);
    expect(screen.getByTestId('icon-code')).toBeInTheDocument();
    expect(screen.getByTestId('icon-sparkles')).toBeInTheDocument();
    expect(screen.getByTestId('icon-palette')).toBeInTheDocument();
  });

  it('should render hero section as a section element', () => {
    render(<Hero />);
    const section = document.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('min-h-screen');
  });
});
