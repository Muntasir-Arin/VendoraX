import SidebarLayout from "@/components/dash-layout";
import { useQuery } from "@apollo/client";
import {
  GET_ME_QUERY,
  GET_USER_TRANSACTIONS,
  GET_USER_PRODUCTS,
} from "../../lib/graphql/queries";
import {
  PlusCircle,
  Package,
  CreditCard,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Link } from "react-router-dom";

export default function DashboardHome() {
  const {
    data: meData,
    loading: meLoading,
    error: meError,
  } = useQuery(GET_ME_QUERY);
  const {
    data: transactionsData,
    loading: transactionsLoading,
    error: transactionsError,
  } = useQuery(GET_USER_TRANSACTIONS);
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useQuery(GET_USER_PRODUCTS);

  if (meLoading || transactionsLoading || productsLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  if (meError || transactionsError || productsError)
    return (
      <div className="text-red-500">
        Error:{" "}
        {meError?.message ||
          transactionsError?.message ||
          productsError?.message}
      </div>
    );

  const products = productsData?.getUserProducts || [];
  const transactions = transactionsData?.getUserTransactions || [];

  return (
    <SidebarLayout>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>

        {meData?.me ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Products
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{products.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Listings
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {
                      products.filter(
                        (product) => product.status === "AVAILABLE"
                      ).length
                    }
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Purchases
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {transactions.length}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader className="flex justify-between items-center">
                  <CardTitle className="flex justify-between items-center">
                    <span>My Products</span>
                    <Button
                      asChild
                      className="ml-4 bg-orange-500 hover:bg-orange-600 text-black font-semibold"
                    >
                      <Link to="/create-product/title">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add New Product
                      </Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.slice(0, 3).map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between bg-gray-100 p-4 rounded-lg"
                      >
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-gray-600">
                            Type: {product.type || "N/A"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <div className="flex justify-end px-2 pb-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="hover:bg-background"
                  >
                    <Link to="/dashboard/myproduct">
                      See All <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>

              <Card>
                <CardHeader className="flex justify-between items-center mb-4">
                  <CardTitle>Purchase History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.length === 0 ? (
                      <p className="text-center text-gray-600">
                        No transactions found.
                      </p>
                    ) : (
                      transactions.slice(0, 3).map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between bg-gray-100 p-4 rounded-lg"
                        >
                          <div>
                            <h3 className="font-semibold">
                              {transaction.product?.name || "Unknown Product"}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {transaction.startDate || "N/A"}
                            </p>
                          </div>
                          <p className="font-bold">
                            ${transaction.product?.price.toFixed(2) || "0.00"}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
                <div className="flex justify-end px-2 pb-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="hover:bg-background"
                  >
                    <Link to="/dashboard/purchasehistory">
                      See All <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </>
        ) : (
          <p>You are not logged in. Please log in to view your dashboard.</p>
        )}
      </div>
    </SidebarLayout>
  );
}
