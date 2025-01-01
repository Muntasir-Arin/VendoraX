import { useQuery, useMutation } from '@apollo/client'
import { Trash2 } from 'lucide-react'
import * as React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Link, useNavigate } from 'react-router-dom'
import SidebarLayout from '@/components/dash-layout'
import { GET_USER_PRODUCTS } from '@/lib/graphql/queries'
import { DELETE_PRODUCT_MUTATION } from '@/lib/graphql/mutations'


export default function ProductListing() {
  const router = useNavigate()
  const [deleteId, setDeleteId] = React.useState<number | null>(null)
  const { data, loading, error } = useQuery(GET_USER_PRODUCTS)
  const handleEdit = (id: number) => {
    router(`/products/edit/${id}`)
  }

  const handleDelete = (id: number) => {
    setDeleteId(id)
  }

  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION, {
    refetchQueries: [GET_USER_PRODUCTS],
    onError: (err) => {
      console.error('Delete error:', err);
    },
  })

  const confirmDelete = async () => {
    if (deleteId !== null) {
      try {
        await deleteProduct({ variables: { id: deleteId } })
        setDeleteId(null)
        data?.getUserProducts?.filter((product) => product.id !== deleteId)
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return (
  <SidebarLayout>
    
    <div className="container mx-auto py-8">
      <Card className="border-none shadow-none">
        <CardHeader>
        <CardTitle className="flex justify-between items-center">
                  <span className='text-3xl ' >My Products</span>
                  <Button asChild className="ml-4 bg-orange-500 hover:bg-orange-600 text-black font-semibold">
                    <Link to="/create-product/title">Add New Product
                    </Link>
                  </Button>
                  </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          {data?.getUserProducts?.map((product) => (
            <Card 
              key={product.id}
              className="group cursor-pointer overflow-hidden border-2 transition-all hover:border-orange-500"
              onClick={(e) => {
                if ((e.target as HTMLElement).closest('button')) return
                handleEdit(product.id)
              }}
            >
              <CardContent className="flex items-start justify-between p-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg ">{product.name}</h3>
                  <p className="text-sm text-gray-600">
                    Categories: {product.categories.join(", ")}
                  </p>
                  <div className="space-y-1">
                    <p className="font-medium">
                      Price: <span className="">${product.price}</span>
                    </p>
                    <p className="font-medium">
                      Rent: <span className="">${product.pricePer} {product.priceUnit}</span>
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 max-w-lg">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span> {new Date(parseInt(product.createdAt)).toLocaleString()} </span>
                    <span>{product.viewCount} views</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-50 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="h-5 w-5 " />
                </Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your product listing.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-orange-600 hover:bg-orange-700"
              onClick={confirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    </SidebarLayout>
  )
}

