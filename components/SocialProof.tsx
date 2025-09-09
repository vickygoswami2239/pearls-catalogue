import { Star } from 'lucide-react';

export default function SocialProof({
  rating = 4.8,
  reviews = 1200,
  stock = 3,
}: { rating?: number; reviews?: number; stock?: number }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-gray-500">({reviews.toLocaleString()})</span>
      </div>
      {stock <= 3 && <span className="text-red-600">Only {stock} left</span>}
    </div>
  );
}
