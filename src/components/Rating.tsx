import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  rating: number;
  totalStars?: number;
  size?: number;
  className?: string;
  showText?: boolean;
}

export function Rating({ rating, totalStars = 5, size = 20, className, showText = true }: RatingProps) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = totalStars - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} fill="hsl(var(--primary))" strokeWidth={0} style={{ width: size, height: size }} />
        ))}
        {halfStar && (
          <div style={{ position: 'relative', width: size, height: size }}>
            <Star style={{ width: size, height: size }} fill="hsl(var(--border))" strokeWidth={0} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', overflow: 'hidden' }}>
              <Star style={{ width: size, height: size }} fill="hsl(var(--primary))" strokeWidth={0} />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} fill="hsl(var(--border))" strokeWidth={0} style={{ width: size, height: size }} />
        ))}
      </div>
      {showText && <span className="text-muted-foreground font-medium">{rating.toFixed(1)}</span>}
    </div>
  );
}
