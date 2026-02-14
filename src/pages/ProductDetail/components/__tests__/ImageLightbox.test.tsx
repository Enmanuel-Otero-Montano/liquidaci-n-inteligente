import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ImageLightbox } from '../ImageLightbox';

const images = [
  'https://example.com/img1.jpg',
  'https://example.com/img2.jpg',
  'https://example.com/img3.jpg',
];

const defaultProps = {
  images,
  initialIndex: 0,
  title: 'Producto de prueba',
  open: true,
  onOpenChange: vi.fn(),
};

describe('ImageLightbox', () => {
  it('renders the correct image when open', () => {
    render(<ImageLightbox {...defaultProps} initialIndex={1} />);
    const img = screen.getByAltText('Producto de prueba - imagen 2');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', images[1]);
  });

  it('calls onOpenChange when close button is clicked', () => {
    const onOpenChange = vi.fn();
    render(<ImageLightbox {...defaultProps} onOpenChange={onOpenChange} />);
    fireEvent.click(screen.getByLabelText('Cerrar'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('navigates to next image when next button is clicked', () => {
    render(<ImageLightbox {...defaultProps} initialIndex={0} />);
    fireEvent.click(screen.getByLabelText('Imagen siguiente'));
    expect(screen.getByAltText('Producto de prueba - imagen 2')).toBeInTheDocument();
  });

  it('navigates to previous image when prev button is clicked', () => {
    render(<ImageLightbox {...defaultProps} initialIndex={1} />);
    fireEvent.click(screen.getByLabelText('Imagen anterior'));
    expect(screen.getByAltText('Producto de prueba - imagen 1')).toBeInTheDocument();
  });

  it('wraps around when navigating past last image', () => {
    render(<ImageLightbox {...defaultProps} initialIndex={2} />);
    fireEvent.click(screen.getByLabelText('Imagen siguiente'));
    expect(screen.getByAltText('Producto de prueba - imagen 1')).toBeInTheDocument();
  });

  it('shows image counter', () => {
    render(<ImageLightbox {...defaultProps} initialIndex={0} />);
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('does not show navigation for single image', () => {
    render(
      <ImageLightbox
        {...defaultProps}
        images={['https://example.com/single.jpg']}
      />
    );
    expect(screen.queryByLabelText('Imagen anterior')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Imagen siguiente')).not.toBeInTheDocument();
  });

  it('has accessible title', () => {
    render(<ImageLightbox {...defaultProps} />);
    expect(screen.getByText('Producto de prueba')).toBeInTheDocument();
  });
});
