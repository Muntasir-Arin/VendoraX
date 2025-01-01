import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'sonner';
import { Calendar, DollarSign, Clock, Tag, ShoppingCart, Key } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GET_PRODUCT, GET_PRODUCT_TRANSACTIONS } from '@/lib/graphql/queries';
import { BUY_PRODUCT_MUTATION, RENT_PRODUCT_MUTATION } from '@/lib/graphql/mutations';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id!, 10);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isRentDialogOpen, setIsRentDialogOpen] = useState(false);
  const [isBuyDialogOpen, setIsBuyDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { data: productData, loading: productLoading, error: productError } = useQuery(GET_PRODUCT, {
    variables: { id: productId },
  });

  const { data: transactionsData, loading: transactionsLoading, error: transactionsError } = useQuery(GET_PRODUCT_TRANSACTIONS, {
    variables: { productId },
  });



  const [buyProduct] = useMutation(BUY_PRODUCT_MUTATION, {
    onCompleted: () => {
      toast.success('Product purchased successfully!');
      setIsBuyDialogOpen(false);
      navigate('/dashboard');

    },
    onError: (error) => {
      toast.error(`Failed to purchase product: ${error.message}`);
    },
  });

  const [rentProduct] = useMutation(RENT_PRODUCT_MUTATION, {
    onCompleted: () => {
      toast.success('Product rented successfully!');
      setIsRentDialogOpen(false);
    },
    onError: (error) => {
      toast.error(`Failed to rent product: ${error.message}`);
    },
  });
  if (productLoading || transactionsLoading ) return <p>Loading...</p>;
  if (productError || transactionsError ) return <p>Error: {productError?.message || transactionsError?.message}</p>;

  const product = productData.getProduct;
  const transactions = transactionsData.getProductTransactions;



  const handleBuy = () => {
    buyProduct({ variables: { id: productId } });
  };

  const handleRent = () => {
    if (startDate && endDate) {
      rentProduct({ 
        variables: { 
          id: productId, 
          startDate: startDate.toISOString(), 
          endDate: endDate.toISOString() 
        } 
      });
    } else {
      toast.error('Please select both start and end dates');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="mb-8 mt-20 border-2 border-orange-200">
        <CardHeader className="bg-gradient-to-r from-orange-100 to-orange-200">
          <CardTitle className="text-3xl font-bold text-orange-800">{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.categories.map((category: string) => (
                  <span key={category} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">
                    {category}
                  </span>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <DollarSign className="w-5 h-5 mr-2 text-orange-500" />
                  <span className="font-semibold">Buy: ${product.price}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="w-5 h-5 mr-2 text-orange-500" />
                  <span className="font-semibold">Rent: ${product.pricePer} {product.priceUnit}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Tag className="w-5 h-5 mr-2 text-orange-500" />
                  <span className="font-semibold">Status: {product.status}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-5 h-5 mr-2 text-orange-500" />
                  <span className="font-semibold">Created: {format(new Date(parseInt(product.createdAt)), 'PPP')}</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-orange-800">Actions</h3>
              
                <>
                  <Dialog open={isBuyDialogOpen} onOpenChange={setIsBuyDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-orange-500 hover:bg-orange-600">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Buy Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Purchase</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to buy this product for ${product.price}?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsBuyDialogOpen(false)}>Cancel</Button>
                        <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleBuy}>Confirm Purchase</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={isRentDialogOpen} onOpenChange={setIsRentDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-orange-500 hover:bg-orange-600">
                        <Key className="w-4 h-4 mr-2" />
                        Rent
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Rent Product</DialogTitle>
                        <DialogDescription>
                          Select the start and end dates for your rental period.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Start Date</label>
                            <DatePicker
                              selected={startDate}
                              onChange={(date: Date) => setStartDate(date)}
                              selectsStart
                              startDate={startDate}
                              endDate={endDate}
                              minDate={new Date()}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">End Date</label>
                            <DatePicker
                              selected={endDate}
                              onChange={(date: Date) => setEndDate(date)}
                              selectsEnd
                              startDate={startDate}
                              endDate={endDate}
                              minDate={startDate}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                            />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsRentDialogOpen(false)}>Cancel</Button>
                        <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleRent}>Confirm Rental</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8 border-2 border-orange-200">
        <CardHeader className="bg-gradient-to-r from-orange-100 to-orange-200">
          <CardTitle className="text-2xl font-bold text-orange-800">Transaction History</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {transactions.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {transactions.map((transaction: { id: string; type: string; buyer: { firstName: string; lastName: string; email: string }; startDate: string; endDate?: string }) => (
                <li key={transaction.id} className="py-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.type === 'BUY' ? 'Purchased' : 'Rented'} by {transaction.buyer.firstName} {transaction.buyer.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{transaction.buyer.email}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {transaction.type === 'BUY' ? (
                        <span>{format(new Date(parseInt(transaction.startDate)), 'PPP')}</span>
                      ) : (
                        <span>
                          {format(new Date(parseInt(transaction.startDate)), 'PPP')} - {format(new Date(parseInt(transaction.endDate)), 'PPP')}
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No transactions found for this product.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetailPage;

