import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props}>{children}</p>,
    a: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props}>{children}</a>,
    button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props}>{children}</button>,
    svg: ({ children, ...props }: React.SVGAttributes<SVGSVGElement>) => <svg {...props}>{children}</svg>,
    path: (props: React.SVGAttributes<SVGPathElement>) => <path {...props} />,
    line: (props: React.SVGAttributes<SVGLineElement>) => <line {...props} />,
    circle: (props: React.SVGAttributes<SVGCircleElement>) => <circle {...props} />,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useInView: () => true,
}));

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

// Mock Redux
jest.mock('@/lib/redux/hooks', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: (selector: (state: { theme: { mode: string; isHydrated: boolean; colorScheme: string } }) => unknown) =>
    selector({ theme: { mode: 'dark', isHydrated: true, colorScheme: 'palette-colors' } }),
}));

jest.mock('@/lib/redux/themeSlice', () => ({
  toggleThemeMode: jest.fn(),
  __esModule: true,
  default: jest.fn(),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Code: () => <span data-testid="icon-code">Code</span>,
  Palette: () => <span data-testid="icon-palette">Palette</span>,
  Sparkles: () => <span data-testid="icon-sparkles">Sparkles</span>,
  Code2: () => <span data-testid="icon-code2">Code2</span>,
  Figma: () => <span data-testid="icon-figma">Figma</span>,
  Database: () => <span data-testid="icon-database">Database</span>,
  Cloud: () => <span data-testid="icon-cloud">Cloud</span>,
  Cpu: () => <span data-testid="icon-cpu">Cpu</span>,
  Briefcase: () => <span data-testid="icon-briefcase">Briefcase</span>,
  GraduationCap: () => <span data-testid="icon-grad">GraduationCap</span>,
  Rocket: () => <span data-testid="icon-rocket">Rocket</span>,
  Github: () => <span data-testid="icon-github">Github</span>,
  Linkedin: () => <span data-testid="icon-linkedin">Linkedin</span>,
  Mail: () => <span data-testid="icon-mail">Mail</span>,
  ExternalLink: () => <span data-testid="icon-external">ExternalLink</span>,
  Heart: () => <span data-testid="icon-heart">Heart</span>,
  Users: () => <span data-testid="icon-users">Users</span>,
  Moon: () => <span data-testid="icon-moon">Moon</span>,
  Sun: () => <span data-testid="icon-sun">Sun</span>,
  Globe: () => <span data-testid="icon-globe">Globe</span>,
  ChevronDown: () => <span data-testid="icon-chevron">ChevronDown</span>,
}));

describe('Home Page', () => {
  it('should render the navigation bar', () => {
    render(<Home />);
    const nav = document.querySelector('nav');
    expect(nav).toBeInTheDocument();
  });

  it('should render the SS brand logo', () => {
    render(<Home />);
    expect(screen.getByText('SS')).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(<Home />);
    expect(screen.getByText('nav.journey')).toBeInTheDocument();
    expect(screen.getByText('nav.skills')).toBeInTheDocument();
    expect(screen.getByText('nav.art')).toBeInTheDocument();
    expect(screen.getByText('nav.contact')).toBeInTheDocument();
  });

  it('should render nav links with correct hrefs', () => {
    render(<Home />);
    expect(screen.getByText('nav.journey').closest('a')).toHaveAttribute('href', '#roadmap');
    expect(screen.getByText('nav.skills').closest('a')).toHaveAttribute('href', '#skills');
    expect(screen.getByText('nav.art').closest('a')).toHaveAttribute('href', '#art-projects');
    expect(screen.getByText('nav.contact').closest('a')).toHaveAttribute('href', '#contact');
  });

  it('should render the name "Saeedeh Sarmadi"', () => {
    render(<Home />);
    expect(screen.getByText('Saeedeh Sarmadi')).toBeInTheDocument();
  });

  it('should render the hero subtitle', () => {
    render(<Home />);
    expect(screen.getByText('hero.subtitle')).toBeInTheDocument();
  });

  it('should render CTA buttons', () => {
    render(<Home />);
    expect(screen.getByText('Explore My Journey')).toBeInTheDocument();
    expect(screen.getByText('View Skills')).toBeInTheDocument();
  });

  it('should render the roadmap section with correct id', () => {
    render(<Home />);
    const roadmap = document.getElementById('roadmap');
    expect(roadmap).toBeInTheDocument();
  });

  it('should render the skills section with correct id', () => {
    render(<Home />);
    const skills = document.getElementById('skills');
    expect(skills).toBeInTheDocument();
  });

  it('should render the art projects section with correct id', () => {
    render(<Home />);
    const artProjects = document.getElementById('art-projects');
    expect(artProjects).toBeInTheDocument();
  });

  it('should render the contact/footer section with correct id', () => {
    render(<Home />);
    const contact = document.getElementById('contact');
    expect(contact).toBeInTheDocument();
  });

  it('should render the footer copyright', () => {
    render(<Home />);
    expect(screen.getAllByText(/Saeedeh Sarmadi/).length).toBeGreaterThan(0);
  });
});
