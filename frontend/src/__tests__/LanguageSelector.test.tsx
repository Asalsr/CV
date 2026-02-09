import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSelector from '@/components/LanguageSelector';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button onClick={onClick} {...props}>{children}</button>
    ),
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('lucide-react', () => ({
  Globe: () => <span data-testid="icon-globe">Globe</span>,
  ChevronDown: ({ className }: { className?: string }) => <span data-testid="icon-chevron" className={className}>ChevronDown</span>,
}));

describe('LanguageSelector Component', () => {
  it('should render the current locale name (English)', () => {
    render(<LanguageSelector />);
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  it('should render the Globe icon', () => {
    render(<LanguageSelector />);
    expect(screen.getByTestId('icon-globe')).toBeInTheDocument();
  });

  it('should render the ChevronDown icon', () => {
    render(<LanguageSelector />);
    expect(screen.getByTestId('icon-chevron')).toBeInTheDocument();
  });

  it('should show dropdown with all locales when clicked', () => {
    render(<LanguageSelector />);

    // Click the selector button
    fireEvent.click(screen.getByText('English'));

    // All locale options should be visible
    // "English" appears both in button and dropdown
    expect(screen.getAllByText('English').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('Svenska')).toBeInTheDocument();
    expect(screen.getByText('فارسی')).toBeInTheDocument();
  });

  it('should close dropdown when clicking backdrop', () => {
    render(<LanguageSelector />);

    // Open dropdown
    fireEvent.click(screen.getByText('English'));
    expect(screen.getByText('Svenska')).toBeInTheDocument();

    // Click backdrop (fixed inset-0 div)
    const backdrop = document.querySelector('.fixed.inset-0');
    fireEvent.click(backdrop!);

    // Dropdown should be closed - Svenska should no longer be visible
    expect(screen.queryByText('Svenska')).not.toBeInTheDocument();
  });
});
