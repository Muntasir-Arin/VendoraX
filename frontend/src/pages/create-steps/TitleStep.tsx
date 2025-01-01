import React, { useState } from 'react';
import { useProductForm } from '../../contexts/ProductFormContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TitleStepProps {
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  currentStepIndex: number;
}

export const TitleStep: React.FC<TitleStepProps> = ({
  goToNextStep,
  goToPreviousStep,
  currentStepIndex,
}) => {
  const { formData, updateFormData, validateField } = useProductForm();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    updateFormData({ title: value });
    setError(validateField('title', value));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Product Title</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product title"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
      <div className="flex justify-between mt-6">
        {currentStepIndex > 0 && (
          <Button onClick={goToPreviousStep} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
        )}
        <Button
          onClick={goToNextStep}
          disabled={!!error || !formData.title} // Disable if there's an error or title is empty
          className="ml-auto"
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
