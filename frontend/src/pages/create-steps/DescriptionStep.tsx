import React, { useState } from 'react';
import { useProductForm } from '../../contexts/ProductFormContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface DescriptionStepProps {
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  currentStepIndex: number;
}

export const DescriptionStep: React.FC<DescriptionStepProps> = ({
  goToNextStep,
  goToPreviousStep,
  currentStepIndex,
}) => {
  const { formData, updateFormData, validateField } = useProductForm();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    updateFormData({ description: value });
    setError(validateField('description', value));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows={6}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        {currentStepIndex > 0 && (
          <Button onClick={goToPreviousStep} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
        )}
        <Button
          onClick={goToNextStep}
          disabled={!!error || !formData.description.trim()} // Disable if there's an error or no description
          className="ml-auto"
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
  