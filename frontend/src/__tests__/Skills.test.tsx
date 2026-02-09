import { render, screen } from '@testing-library/react';
import { Skills } from '@/components/figma/Skills';

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
  Code2: () => <span data-testid="icon-code2">Code2</span>,
  Figma: () => <span data-testid="icon-figma">Figma</span>,
  Database: () => <span data-testid="icon-database">Database</span>,
  Cloud: () => <span data-testid="icon-cloud">Cloud</span>,
  Cpu: () => <span data-testid="icon-cpu">Cpu</span>,
}));

describe('Skills Component', () => {
  it('should render the skills section with correct id', () => {
    render(<Skills />);
    const section = document.getElementById('skills');
    expect(section).toBeInTheDocument();
  });

  it('should render the section heading', () => {
    render(<Skills />);
    expect(screen.getByText(/Skills/)).toBeInTheDocument();
    expect(screen.getByText(/Expertise/)).toBeInTheDocument();
  });

  it('should render all four skill categories', () => {
    render(<Skills />);
    // "UI/UX Design" appears as both section title and skill name
    expect(screen.getAllByText('UI/UX Design').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Front-End')).toBeInTheDocument();
    expect(screen.getByText('Back-End & Database')).toBeInTheDocument();
    expect(screen.getByText('DevOps & Cloud')).toBeInTheDocument();
  });

  it('should render UI/UX skills', () => {
    render(<Skills />);
    // "Figma" appears as both skill name and icon mock text
    expect(screen.getAllByText('Figma').length).toBeGreaterThan(0);
    expect(screen.getByText('Photoshop & Illustrator')).toBeInTheDocument();
    expect(screen.getByText('InDesign')).toBeInTheDocument();
  });

  it('should render front-end skills', () => {
    render(<Skills />);
    expect(screen.getByText('React (JS/TS)')).toBeInTheDocument();
    expect(screen.getByText('Redux & React Query')).toBeInTheDocument();
    expect(screen.getByText('HTML5/CSS3')).toBeInTheDocument();
  });

  it('should render back-end skills', () => {
    render(<Skills />);
    expect(screen.getByText('.NET Core (C#)')).toBeInTheDocument();
    expect(screen.getByText('RESTful APIs & GraphQL')).toBeInTheDocument();
    expect(screen.getByText('SQL/PL-SQL & MongoDB')).toBeInTheDocument();
  });

  it('should render devops skills', () => {
    render(<Skills />);
    expect(screen.getByText('Docker & Kubernetes')).toBeInTheDocument();
    expect(screen.getByText('AWS & Azure')).toBeInTheDocument();
    expect(screen.getByText('Git & Bash')).toBeInTheDocument();
  });

  it('should render skill percentages', () => {
    render(<Skills />);
    // 95% appears twice (Figma and React), 98% once (Photoshop)
    expect(screen.getAllByText('95%').length).toBeGreaterThan(0);
    expect(screen.getByText('98%')).toBeInTheDocument();
  });

  it('should render special focus areas', () => {
    render(<Skills />);
    expect(screen.getByText('Special Focus')).toBeInTheDocument();
    expect(screen.getAllByText(/AI/).length).toBeGreaterThan(0);
    expect(screen.getByText('Performance')).toBeInTheDocument();
    expect(screen.getByText('Serverless')).toBeInTheDocument();
    expect(screen.getByText('Design Systems')).toBeInTheDocument();
  });
});
