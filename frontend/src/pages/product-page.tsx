import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { products } from '../lib/data';
import { Button } from '../components/ui/button';

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="text-orange-500 text-3xl font-bold">D</div>
            <nav className="flex gap-6">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
                Products
              </Link>
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/products')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Products
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-2xl font-bold text-orange-500">${product.price}</p>
              </div>
              <p className="text-gray-600 mb-4">Category: {product.category}</p>
              <p className="text-gray-600 mb-4">Condition: {product.condition}</p>
              <div className="border-t border-gray-200 pt-4">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>
              <Button className="w-full mt-8 bg-orange-500 hover:bg-orange-600">
                Contact Seller
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

