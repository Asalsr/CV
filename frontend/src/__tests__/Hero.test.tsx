import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/figma/Hero';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props}>{children}</p>,
    a: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props}>{children}</a>,
    ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => <ul {...props}>{children}</ul>,
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

  it('should render the tagline from translations', () => {
    render(<Hero />);
    expect(screen.getByText('hero.tagline')).toBeInTheDocument();
  });

  it('should render the four highlights from translations', () => {
    render(<Hero />);
    expect(screen.getByText('hero.highlight1')).toBeInTheDocument();
    expect(screen.getByText('hero.highlight2')).toBeInTheDocument();
    expect(screen.getByText('hero.highlight3')).toBeInTheDocument();
    expect(screen.getByText('hero.highlight4')).toBeInTheDocument();
  });

  it('should render Explore Journey CTA from translations', () => {
    render(<Hero />);
    const cta = screen.getByText('hero.exploreJourney');
    expect(cta).toBeInTheDocument();
    expect(cta.closest('a')).toHaveAttribute('href', '#roadmap');
  });

  it('should render View Skills CTA from translations', () => {
    render(<Hero />);
    const cta = screen.getByText('hero.viewSkills');
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
