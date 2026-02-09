import { render, screen } from '@testing-library/react';
import { ArtProjects } from '@/components/figma/ArtProjects';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    svg: ({ children, ...props }: React.SVGAttributes<SVGSVGElement>) => <svg {...props}>{children}</svg>,
    path: (props: React.SVGAttributes<SVGPathElement>) => <path {...props} />,
    circle: (props: React.SVGAttributes<SVGCircleElement>) => <circle {...props} />,
  },
  useInView: () => true,
}));

jest.mock('lucide-react', () => ({
  Palette: () => <span data-testid="icon-palette">Palette</span>,
  Users: () => <span data-testid="icon-users">Users</span>,
  Sparkles: () => <span data-testid="icon-sparkles">Sparkles</span>,
}));

describe('ArtProjects Component', () => {
  it('should render the section with correct id', () => {
    render(<ArtProjects />);
    const section = document.getElementById('art-projects');
    expect(section).toBeInTheDocument();
  });

  it('should render the section heading', () => {
    render(<ArtProjects />);
    expect(screen.getByText('Artistic Projects')).toBeInTheDocument();
  });

  it('should render the subtitle', () => {
    render(<ArtProjects />);
    expect(screen.getByText('Where art meets activism and social impact')).toBeInTheDocument();
  });

  it('should render all three project titles', () => {
    render(<ArtProjects />);
    expect(screen.getByText('artProjects.plasticBlue.title')).toBeInTheDocument();
    expect(screen.getByText('artProjects.womenLifeFreedom.title')).toBeInTheDocument();
    expect(screen.getByText('artProjects.illustrationWorkshops.title')).toBeInTheDocument();
  });

  it('should render project years', () => {
    render(<ArtProjects />);
    expect(screen.getByText('2021-2022')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
  });

  it('should render project locations', () => {
    render(<ArtProjects />);
    expect(screen.getByText('Rome')).toBeInTheDocument();
    expect(screen.getAllByText('Turin')).toHaveLength(2);
  });

  it('should render project descriptions', () => {
    render(<ArtProjects />);
    expect(screen.getByText('artProjects.plasticBlue.description')).toBeInTheDocument();
    expect(screen.getByText('artProjects.womenLifeFreedom.description')).toBeInTheDocument();
    expect(screen.getByText('artProjects.illustrationWorkshops.description')).toBeInTheDocument();
  });

  it('should render three project cards in a grid', () => {
    const { container } = render(<ArtProjects />);
    const grid = container.querySelector('.grid.md\\:grid-cols-3');
    expect(grid).toBeInTheDocument();
    expect(grid?.children).toHaveLength(3);
  });
});
