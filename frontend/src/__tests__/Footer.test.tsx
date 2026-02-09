import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/figma/Footer';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
    a: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a href={href} {...props}>{children}</a>,
    svg: ({ children, ...props }: React.SVGAttributes<SVGSVGElement>) => <svg {...props}>{children}</svg>,
    circle: (props: React.SVGAttributes<SVGCircleElement>) => <circle {...props} />,
  },
}));

jest.mock('lucide-react', () => ({
  Github: () => <span data-testid="icon-github">Github</span>,
  Linkedin: () => <span data-testid="icon-linkedin">Linkedin</span>,
  Mail: () => <span data-testid="icon-mail">Mail</span>,
  ExternalLink: () => <span data-testid="icon-external">ExternalLink</span>,
  Heart: () => <span data-testid="icon-heart">Heart</span>,
}));

describe('Footer Component', () => {
  it('should render the footer element with contact id', () => {
    render(<Footer />);
    const footer = document.getElementById('contact');
    expect(footer).toBeInTheDocument();
    expect(footer?.tagName.toLowerCase()).toBe('footer');
  });

  it('should render the art portfolio CTA', () => {
    render(<Footer />);
    expect(screen.getByText('Explore My Artistic Side')).toBeInTheDocument();
  });

  it('should render the portfolio link', () => {
    render(<Footer />);
    const portfolioLink = screen.getByText('footer.viewPortfolio');
    expect(portfolioLink.closest('a')).toHaveAttribute('href', '/art');
  });

  it('should render the email link', () => {
    render(<Footer />);
    const emailLinks = screen.getAllByText('Saeedeh.sarmadi89@gmail.com');
    expect(emailLinks.length).toBeGreaterThan(0);
    expect(emailLinks[0].closest('a')).toHaveAttribute('href', 'mailto:Saeedeh.sarmadi89@gmail.com');
  });

  it('should render social media links', () => {
    render(<Footer />);
    const githubLink = screen.getByTestId('icon-github').closest('a');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/Asalsr');
    expect(githubLink).toHaveAttribute('target', '_blank');

    const linkedinLink = screen.getByTestId('icon-linkedin').closest('a');
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/saeedeh-asal-sarmadi');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
  });

  it('should have noopener noreferrer on external links', () => {
    render(<Footer />);
    const githubLink = screen.getByTestId('icon-github').closest('a');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

    const linkedinLink = screen.getByTestId('icon-linkedin').closest('a');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render copyright year 2026', () => {
    render(<Footer />);
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });

  it('should render location from translations', () => {
    render(<Footer />);
    expect(screen.getByText('footer.location')).toBeInTheDocument();
  });

  it('should render the connect section', () => {
    render(<Footer />);
    expect(screen.getByText("Let's Connect")).toBeInTheDocument();
  });
});
