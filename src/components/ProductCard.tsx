import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

/**
 * Individual product tile: square image, name, and "From $x" price line —
 * matches the reference site's compact product card used throughout the
 * catalogue grid.
 */
export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group cursor-pointer">
      <div className="aspect-square overflow-hidden rounded-lg bg-cream-dark">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-3 font-serif text-sm sm:text-base uppercase tracking-wide">{product.name}</h3>
      <p className="text-xs sm:text-sm text-charcoal-soft mt-1">{product.description}</p>
      <p className="mt-2 text-sm font-medium text-gold">From S${product.price.toFixed(2)}</p>
    </article>
  );
}
