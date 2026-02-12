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
  Award: () => <span data-testid="icon-award">Award</span>,
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
    expect(screen.getAllByText('Agentic Developer Intern').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Full-Stack Developer & Systems Analyst').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Front-End Development Intern').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Software Engineer & Creative Designer').length).toBeGreaterThan(0);
  });

  it('should render education entry', () => {
    render(<Roadmap />);
    expect(screen.getAllByText(/Fine Arts/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Computer Science/).length).toBeGreaterThan(0);
  });

  it('should render company names', () => {
    render(<Roadmap />);
    expect(screen.getAllByText(/Sweden Startup Nation/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/RADA Computing Solutions/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Liquido Studio/).length).toBeGreaterThan(0);
  });

  it('should render year ranges', () => {
    render(<Roadmap />);
    expect(screen.getAllByText('Dec 2025 - Present').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Jun 2024 - Oct 2025').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Sep 2023 - May 2024').length).toBeGreaterThan(0);
    expect(screen.getAllByText('2009 - 2018').length).toBeGreaterThan(0);
    expect(screen.getAllByText('2023').length).toBeGreaterThan(0);
    expect(screen.getAllByText('2018 - 2022').length).toBeGreaterThan(0);
    expect(screen.getAllByText('2009 - 2012').length).toBeGreaterThan(0);
  });

  it('should render highlights for jobs that have them', () => {
    render(<Roadmap />);
    // Job 1 highlights
    expect(screen.getAllByText('Agent-First Development with AI').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Data models, APIs & automation workflows').length).toBeGreaterThan(0);
    // Job 2 highlights
    expect(screen.getAllByText('React migration (20+ modules)').length).toBeGreaterThan(0);
    expect(screen.getAllByText('AG Grid implementation (150k+ rows)').length).toBeGreaterThan(0);
    // Job 3 highlights (new)
    expect(screen.getAllByText('Responsive websites & web applications').length).toBeGreaterThan(0);
    // Job 4 highlights (new)
    expect(screen.getAllByText('Co-developed internal social-media platform').length).toBeGreaterThan(0);
    // Job 6 highlights (certifications)
    expect(screen.getAllByText('IBM – Developing Front-End Apps with React').length).toBeGreaterThan(0);
  });

  it('should render all 7 roadmap entries', () => {
    render(<Roadmap />);
    // Verify all 7 entries are present by checking their unique titles
    expect(screen.getAllByText('Agentic Developer Intern').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Full-Stack Developer & Systems Analyst').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Front-End Development Intern').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Professional Certifications').length).toBeGreaterThan(0);
    expect(screen.getAllByText('B.A. Fine Arts').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Software Engineer & Creative Designer').length).toBeGreaterThan(0);
    expect(screen.getAllByText('B.Sc. Computer Science').length).toBeGreaterThan(0);
  });
});
