import { render, screen } from '@testing-library/react';
import { Roadmap } from '@/components/figma/Roadmap';

// Mock motion/react
jest.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    path: (props: React.SVGAttributes<SVGPathElement>) => <path {...props} />,
    circle: (props: React.SVGAttributes<SVGCircleElement>) => <circle {...props} />,
    line: (props: React.SVGAttributes<SVGLineElement>) => <line {...props} />,
    svg: ({ children, ...props }: React.SVGAttributes<SVGSVGElement>) => <svg {...props}>{children}</svg>,
  },
  useInView: () => true,
}));

jest.mock('lucide-react', () => ({
  Briefcase: () => <span data-testid="icon-briefcase">Briefcase</span>,
  GraduationCap: () => <span data-testid="icon-grad">GraduationCap</span>,
  Rocket: () => <span data-testid="icon-rocket">Rocket</span>,
  Palette: () => <span data-testid="icon-palette">Palette</span>,
  Code2: () => <span data-testid="icon-code2">Code2</span>,
}));

describe('Roadmap Component', () => {
  it('should render the roadmap section with correct id', () => {
    render(<Roadmap />);
    const section = document.getElementById('roadmap');
    expect(section).toBeInTheDocument();
  });

  it('should render the section heading', () => {
    render(<Roadmap />);
    expect(screen.getByText('My Journey')).toBeInTheDocument();
  });

  it('should render the subtitle', () => {
    render(<Roadmap />);
    expect(screen.getByText('A roadmap of growth and innovation')).toBeInTheDocument();
  });

  it('should render all job titles', () => {
    render(<Roadmap />);
    expect(screen.getByText('Agentic Developer Intern')).toBeInTheDocument();
    expect(screen.getByText('Full-Stack Developer & Systems Analyst')).toBeInTheDocument();
    expect(screen.getByText('Front-End Development Intern')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer & Creative Designer')).toBeInTheDocument();
  });

  it('should render education entry', () => {
    render(<Roadmap />);
    expect(screen.getAllByText(/Fine Arts/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Computer Science/).length).toBeGreaterThan(0);
  });

  it('should render company names', () => {
    render(<Roadmap />);
    expect(screen.getByText(/Sweden Startup Nation/)).toBeInTheDocument();
    expect(screen.getByText(/RADA Computing Solutions/)).toBeInTheDocument();
    expect(screen.getByText(/Liquido Studio/)).toBeInTheDocument();
  });

  it('should render year ranges', () => {
    render(<Roadmap />);
    expect(screen.getByText('Dec 2025 - Present')).toBeInTheDocument();
    expect(screen.getByText('Jun 2024 - Oct 2025')).toBeInTheDocument();
    expect(screen.getByText('Sep 2023 - May 2024')).toBeInTheDocument();
    expect(screen.getByText('2009 - 2018')).toBeInTheDocument();
    expect(screen.getByText('Education')).toBeInTheDocument();
  });

  it('should render highlights for jobs that have them', () => {
    render(<Roadmap />);
    expect(screen.getByText('Agent-First Development with AI')).toBeInTheDocument();
    expect(screen.getByText('React migration (20+ modules)')).toBeInTheDocument();
    expect(screen.getByText('AG Grid implementation (150k+ rows)')).toBeInTheDocument();
  });

  it('should render all 5 roadmap entries', () => {
    render(<Roadmap />);
    // Verify all 5 entries are present by checking their unique titles
    expect(screen.getByText('Agentic Developer Intern')).toBeInTheDocument();
    expect(screen.getByText('Full-Stack Developer & Systems Analyst')).toBeInTheDocument();
    expect(screen.getByText('Front-End Development Intern')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer & Creative Designer')).toBeInTheDocument();
    expect(screen.getAllByText(/B\.A\. Fine Arts/).length).toBeGreaterThan(0);
  });
});
