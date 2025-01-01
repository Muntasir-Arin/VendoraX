import React, { useState } from 'react';
import { productFormSchema, useProductForm } from '../../contexts/ProductFormContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { CREATE_PRODUCT_MUTATION } from '@/lib/graphql/mutations';
import { useMutation } from '@apollo/client';
import { toast } from 'sonner';

interface SummaryStepProps {
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  currentStepIndex: number;

}

export const SummaryStep: React.FC<SummaryStepProps> = ({ goToPreviousStep }) => {
  const { formData, resetForm } = useProductForm();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT_MUTATION);

  const handleSubmit = async () => {
    try {
      // Validate the form data using the schema
      productFormSchema.parse(formData);

      // Prepare variables for the mutation
      const variables = {
        name: formData.title,
        description: formData.description,
        price: parseFloat(formData.purchasePrice),
        pricePer: parseFloat(formData.rentPrice),
        priceUnit: formData.rentDuration,
        categories: formData.categories,
      };

      console.log('Creating product with variables ', variables );

      // Execute the mutation
      const response = await createProduct({ variables });

      console.log('Product created:', response.data.createProduct);

      // Reset form and navigate to the start of the form
      toast.success('Product created successfully');
      setTimeout(() => navigate('/'), 2000);
      resetForm();
    } catch (err) {
      // Handle validation or GraphQL errors
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Product Summary</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Title:</h3>
          <p>{formData.title}</p>
        </div>
        <div>
          <h3 className="font-semibold">Categories:</h3>
          <p>{formData.categories.join(', ')}</p>
        </div>
        <div>
          <h3 className="font-semibold">Description:</h3>
          <p>{formData.description}</p>
        </div>
        <div>
          <h3 className="font-semibold">Purchase Price:</h3>
          <p>${formData.purchasePrice}</p>
        </div>
        <div>
          <h3 className="font-semibold">Rent Price:</h3>
          <p>
            ${formData.rentPrice} {formData.rentDuration}
          </p>
        </div>
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-between mt-6">
          <Button onClick={goToPreviousStep} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button onClick={handleSubmit} disabled={loading} className="ml-auto">
            {loading ? 'Submitting...' : 'Submit Product'}
          </Button>
        </div>
      </div>
    </div>
  );
};