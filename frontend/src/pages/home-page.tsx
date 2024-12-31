import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { products } from '../lib/data';

export function HomePage() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen">
      <section className="bg-black text-white pb-32 pt-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Discover Amazing Products at Great Prices
            </h1>
            <p className="text-gray-400 text-xl mb-8">
              Browse through our collection of high-quality products from trusted sellers.
            </p>
            <Link to="/products">
              <Button className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-6">
                Browse Products
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <span className="text-orange-500 font-bold">${product.price}</span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  <Link
                    to={`/products/${product.id}`}
                    className="text-orange-500 hover:text-orange-600 font-medium"
                  >
                    See more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products">
              <Button className="bg-gray-900 hover:bg-gray-800">
                View All Products
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

