import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MultiSelect } from '@/components/ui/multi-select';
import { GET_PRODUCT } from '@/lib/graphql/queries';
import { UPDATE_PRODUCT_MUTATION } from '@/lib/graphql/mutations';

const categoryEnum = z.enum(['ELECTRONICS',
  'FURNITURE',
  'HOME_APPLIANCES',
  'SPORTING_GOODS',
  'OUTDOOR',
  'TOYS',]);

const productFormSchema = z.object({
  name: z.string().min(2, "Title is required").max(100, "Title must be 100 characters or less"),
  categories: z.array(categoryEnum).min(1, "At least one category is required"),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description must be 1000 characters or less"),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  pricePer: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  priceUnit: z.enum(['per day', 'per hour', 'per year']),
});

type ProductFormData = z.infer<typeof productFormSchema>;

const ProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productId = parseInt(id!, 10);

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id: productId },
  });

  console.log(data);

  const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
        name: '',
      categories: [],
      description: '',
      price: '',
      pricePer: '',
      priceUnit: 'per day',
    },
  });

  React.useEffect(() => {
    if (data && data.getProduct) {
      reset({
        name: data.getProduct.name,
        categories: data.getProduct.categories.map((cat: string) => cat),
        description: data.getProduct.description,
        price: data.getProduct.price.toFixed(2),
        pricePer: data.getProduct.pricePer.toFixed(2),
        priceUnit: data.getProduct.priceUnit || 'per day',
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: ProductFormData) => {
    try {
      await updateProduct({
        variables: {
          id: productId,
          ...formData,
          price: parseFloat(formData.price),
          pricePer: parseFloat(formData.pricePer),
        },
      });
      toast.success('Product updated successfully!');
      navigate('/products');
    } catch (error) {
      toast.error('Failed to update product. Please try again.');
      console.error('Update error:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-orange-600">Edit Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Label htmlFor="categories">Categories</Label>
            <Controller
              name="categories"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  {...field}
                  options={Object.values(categoryEnum.Values).map(cat => ({ label: cat, value: cat }))}
                  onValueChange={field.onChange}
                />
              )}
            />
            {errors.categories && <p className="text-red-500 text-sm mt-1">{errors.categories.message}</p>}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <Textarea {...field} />}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <Label htmlFor="price">Purchase Price</Label>
            <Controller
              name="price"
              control={control}
              render={({ field }) => <Input {...field} type="text" placeholder="0.00" />}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
          </div>

          <div>
            <Label htmlFor="pricePer">Rent Price</Label>
            <Controller
              name="pricePer"
              control={control}
              render={({ field }) => <Input {...field} type="text" placeholder="0.00" />}
            />
            {errors.pricePer && <p className="text-red-500 text-sm mt-1">{errors.pricePer.message}</p>}
          </div>

          <div>
            <Label htmlFor="priceUnit">Rent Duration</Label>
            <Controller
              name="priceUnit"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rent duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="per day">Per Day</SelectItem>
                    <SelectItem value="per hour">Per Hour</SelectItem>
                    <SelectItem value="per year">Per Year</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.priceUnit && <p className="text-red-500 text-sm mt-1">{errors.priceUnit.message}</p>}
          </div>

          <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white">
            Update Product
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductEdit;

