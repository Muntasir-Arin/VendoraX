import { Link } from "react-router-dom";
import { ArrowRight, Eye } from "lucide-react";
import { Button } from "../components/ui/button";
import { ArrowUpRight, Clock, DollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GET_TOP_VIEWED } from "@/lib/graphql/queries";
import { useQuery } from "@apollo/client";

export function HomePage() {
  const { data, loading, error } = useQuery(GET_TOP_VIEWED, {
    variables: { limit: 6 },
  });
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen">
      <section className="bg-black text-white pb-32 pt-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Discover Amazing Products at Great Prices
            </h1>
            <p className="text-gray-400 text-xl mb-8">
              Browse through our collection of high-quality products from
              trusted sellers.
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
            {data.getTopViewedAvailableProducts.map((product) => (
              <Card
                key={product.id}
                className="flex flex-col overflow-hidden border-2 border-muted hover:border-orange-400 transition-colors duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-bold ">
                    {product?.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.categories.slice(0, 3).map((category) => (
                      <span
                        key={category}
                        className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                    {product?.categories.length > 3 && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">
                        +{product?.categories.length - 3}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-4">{product?.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700">
                      <DollarSign className="w-5 h-5 mr-2 text-orange-500" />
                      <span className="font-semibold">
                        Buy: ${product?.price}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-5 h-5 mr-2 text-orange-500" />
                      <span className="font-semibold">
                        Rent: ${product?.pricePer}{" "}
                        {product?.priceUnit || "per hour"}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Eye className="w-5 h-5 mr-2 text-orange-500" />
                      <span className="font-semibold">
                        Views: {product?.viewCount}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    <Link to={`/products/${product.id}`}>
                      View Details
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
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
