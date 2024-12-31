import { Link } from 'react-router-dom';
import { products } from '../lib/data';

export  function ProductsPage() {
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
              <Link to="/products" className="text-white font-medium">
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
        <h1 className="text-4xl font-bold mb-8">All Products</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <span className="text-orange-500 font-bold">${product.price}</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">Category: {product.category}</p>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Condition: {product.condition}</span>
                  <Link
                    to={`/products/${product.id}`}
                    className="text-orange-500 hover:text-orange-600 font-medium text-sm"
                  >
                    See more →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

