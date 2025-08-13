import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Users, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductCard } from '@/components/product/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { useAuth } from '@/hooks/useAuth';

const categories = [
  { name: 'Electronics & Gadgets', icon: '📱', count: 245 },
  { name: 'Sports Equipment', icon: '⚽', count: 189 },
  { name: 'Books & Study Materials', icon: '📚', count: 156 },
  { name: 'Furniture', icon: '🪑', count: 98 },
  { name: 'Clothing & Accessories', icon: '👕', count: 234 },
  { name: 'Musical Instruments', icon: '🎸', count: 67 },
  { name: 'Gaming', icon: '🎮', count: 123 },
  { name: 'Other', icon: '📦', count: 89 }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const { products, loading } = useProducts({ sortBy: 'newest' });
  const { user } = useAuth();

  const featuredProducts = products?.slice(0, 8) || [];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          UniMarket
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Your university's trusted marketplace for buying and selling gadgets, sports equipment, and more
        </p>
        
        <div className="max-w-md mx-auto mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button asChild>
              <Link to={`/search?q=${encodeURIComponent(searchQuery)}`}>
                Search
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!user ? (
            <>
              <Button size="lg" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </>
          ) : (
            <Button size="lg" asChild>
              <Link to="/sell">Start Selling</Link>
            </Button>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 mx-auto text-primary mb-4" />
              <CardTitle>University Verified</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Only verified university students can join, ensuring a safe and trusted community.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Users className="h-12 w-12 mx-auto text-primary mb-4" />
              <CardTitle>Local Community</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Connect with fellow students on campus for easy pickup and delivery.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto text-primary mb-4" />
              <CardTitle>Great Deals</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Find amazing deals on textbooks, electronics, and everything you need for student life.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/search?category=${encodeURIComponent(category.name)}`}
              className="group"
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.count} items
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Latest Items</h2>
            <Button variant="outline" asChild>
              <Link to="/search">View All</Link>
            </Button>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted"></div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-6 bg-muted rounded w-20"></div>
                      <div className="h-3 bg-muted rounded w-full"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}