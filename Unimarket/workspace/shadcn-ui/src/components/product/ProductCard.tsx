import { Link } from 'react-router-dom';
import { Heart, Eye, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'like-new': return 'bg-blue-100 text-blue-800';
      case 'good': return 'bg-yellow-100 text-yellow-800';
      case 'fair': return 'bg-orange-100 text-orange-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img
            src={product.images[0] || '/api/placeholder/300/200'}
            alt={product.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Badge className={`absolute top-2 left-2 ${getConditionColor(product.condition)}`}>
            {product.condition}
          </Badge>
        </div>
        
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            
            <p className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{product.seller.full_name}</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{product.seller.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  <span>{product.views}</span>
                </div>
              </div>
            </div>

            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
          </div>

          {user && user.id !== product.seller_id && (
            <Button 
              className="w-full mt-3" 
              size="sm"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          )}
        </CardContent>
      </Link>
    </Card>
  );
};