import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import SidebarLayout from "@/components/dash-layout";
import { useQuery } from "@apollo/client";
import { GET_USER_TRANSACTIONS } from "@/lib/graphql/queries";

export function PurchaseHistoryPage() {
  const { data, loading, error } = useQuery(GET_USER_TRANSACTIONS);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10">Error: {error.message}</div>;

  const transactions = data?.getUserTransactions || [];
  console.log(transactions);

  return (
    <SidebarLayout>
      <div className="mx-10 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Purchase History</CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <p className="text-center text-gray-600">
                No transactions found.
              </p>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between bg-gray-100 p-4 rounded-lg"
                  >
                    <div>
                      <h3 className="font-semibold">
                        {transaction.product?.name || "Unknown Product"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Purchase Type:{" "}
                        <span className="font-medium">
                          {transaction.type.charAt(0).toUpperCase() +
                            transaction.type.slice(1).toLowerCase()}
                        </span>
                        <br />
                        Category:{" "}
                        <span className="font-medium">
                          {transaction.product?.categories.join(", ") || "N/A"}
                        </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        ${transaction.product?.price.toFixed(2) || "0.00"}
                        {transaction.type === "RENT" &&
                          transaction.product.priceUnit}
                      </p>
                      <p className="text-sm text-gray-600">
                        {transaction.startDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </SidebarLayout>
  );
}
