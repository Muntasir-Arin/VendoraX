import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock, DollarSign, Eye } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GET_PRODUCTS } from '@/lib/graphql/queries'
import { useQuery } from '@apollo/client'


const ProductsPage: React.FC = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: { status: "AVAILABLE" },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="container mx-auto py-10 min-h-[60vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-24">
        {data.getProducts.map((product) => (
          <Card key={product.id} className="flex flex-col overflow-hidden border-2 border-muted hover:border-orange-400 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold ">{product?.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2 mb-4">
                {product.categories.slice(0, 3).map((category) => (
                  <span key={category} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">
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
                  <span className="font-semibold">Buy: ${product?.price}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="w-5 h-5 mr-2 text-orange-500" />
                  <span className="font-semibold">Rent: ${product?.pricePer} {product?.priceUnit|| 'per hour'}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Eye className="w-5 h-5 mr-2 text-orange-500" />
                  <span className="font-semibold">Views: {product?.viewCount}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-orange-500 hover:bg-orange-600">
                <Link to={`/products/${product.id}`}>
                  View Details
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ProductsPage

