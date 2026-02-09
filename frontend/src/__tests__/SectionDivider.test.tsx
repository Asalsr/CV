import { render } from '@testing-library/react';
import { SectionDivider } from '@/components/figma/SectionDivider';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    path: (props: React.SVGAttributes<SVGPathElement>) => <path {...props} />,
    circle: (props: React.SVGAttributes<SVGCircleElement>) => <circle {...props} />,
  },
}));

describe('SectionDivider Component', () => {
  it('should render wave variant by default', () => {
    const { container } = render(<SectionDivider />);
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('.h-24')).toBeInTheDocument();
  });

  it('should render curve variant', () => {
    const { container } = render(<SectionDivider variant="curve" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('.h-20')).toBeInTheDocument();
  });

  it('should render organic variant', () => {
    const { container } = render(<SectionDivider variant="organic" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('.h-32')).toBeInTheDocument();
  });

  it('should accept custom colors', () => {
    const { container } = render(
      <SectionDivider variant="wave" color1="#FF0000" color2="#00FF00" />
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should render with overflow hidden', () => {
    const { container } = render(<SectionDivider />);
    expect(container.querySelector('.overflow-hidden')).toBeInTheDocument();
  });
});
