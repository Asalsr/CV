import { render, screen, fireEvent } from '@testing-library/react';
import ThemeModeToggle from '@/components/theme/ThemeModeToggle';

const mockDispatch = jest.fn();

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button onClick={onClick} {...props}>{children}</button>
    ),
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
  },
}));

jest.mock('lucide-react', () => ({
  Moon: () => <span data-testid="icon-moon">Moon</span>,
  Sun: () => <span data-testid="icon-sun">Sun</span>,
}));

jest.mock('@/lib/redux/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(),
}));

jest.mock('@/lib/redux/themeSlice', () => ({
  toggleThemeMode: () => ({ type: 'theme/toggleThemeMode' }),
  __esModule: true,
  default: jest.fn(),
}));

const { useAppSelector } = jest.requireMock('@/lib/redux/hooks');

describe('ThemeModeToggle Component', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('should render placeholder when not hydrated', () => {
    (useAppSelector as jest.Mock).mockImplementation(
      (selector: (state: { theme: { mode: string; isHydrated: boolean } }) => unknown) =>
        selector({ theme: { mode: 'light', isHydrated: false } })
    );

    const { container } = render(<ThemeModeToggle />);
    // Should render placeholder div, not a button
    expect(container.querySelector('button')).not.toBeInTheDocument();
    expect(container.querySelector('.fixed')).toBeInTheDocument();
  });

  it('should render toggle button when hydrated in dark mode', () => {
    (useAppSelector as jest.Mock).mockImplementation(
      (selector: (state: { theme: { mode: string; isHydrated: boolean } }) => unknown) =>
        selector({ theme: { mode: 'dark', isHydrated: true } })
    );

    render(<ThemeModeToggle />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'theme.switchToLight');
  });

  it('should render toggle button when hydrated in light mode', () => {
    (useAppSelector as jest.Mock).mockImplementation(
      (selector: (state: { theme: { mode: string; isHydrated: boolean } }) => unknown) =>
        selector({ theme: { mode: 'light', isHydrated: true } })
    );

    render(<ThemeModeToggle />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'theme.switchToDark');
  });

  it('should dispatch toggleThemeMode when clicked', () => {
    (useAppSelector as jest.Mock).mockImplementation(
      (selector: (state: { theme: { mode: string; isHydrated: boolean } }) => unknown) =>
        selector({ theme: { mode: 'light', isHydrated: true } })
    );

    render(<ThemeModeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'theme/toggleThemeMode' });
  });

  it('should render Sun and Moon icons', () => {
    (useAppSelector as jest.Mock).mockImplementation(
      (selector: (state: { theme: { mode: string; isHydrated: boolean } }) => unknown) =>
        selector({ theme: { mode: 'light', isHydrated: true } })
    );

    render(<ThemeModeToggle />);
    expect(screen.getByTestId('icon-sun')).toBeInTheDocument();
    expect(screen.getByTestId('icon-moon')).toBeInTheDocument();
  });
});
