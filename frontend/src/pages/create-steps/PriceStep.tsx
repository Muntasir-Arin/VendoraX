import React, { useState } from 'react';
import { useProductForm } from '../../contexts/ProductFormContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface PriceStepProps {
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  currentStepIndex: number;
}

export const PriceStep: React.FC<PriceStepProps> = ({
  goToNextStep,
  goToPreviousStep,
  currentStepIndex,
}) => {
  const { formData, updateFormData, validateField } = useProductForm();
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const handleChange = (field: 'purchasePrice' | 'rentPrice' | 'rentDuration', value: string) => {
    updateFormData({ [field]: value });
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const isNextDisabled =
    !!errors.purchasePrice ||
    !!errors.rentPrice ||
    !!errors.rentDuration ||
    !formData.purchasePrice ||
    !formData.rentPrice ||
    !formData.rentDuration;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Product Pricing</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="purchasePrice">Purchase Price</Label>
          <Input
            id="purchasePrice"
            type="text"
            value={formData.purchasePrice}
            onChange={(e) => handleChange('purchasePrice', e.target.value)}
            placeholder="Enter purchase price"
          />
          {errors.purchasePrice && <p className="text-red-500 text-sm">{errors.purchasePrice}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="rentPrice">Rent Price</Label>
          <Input
            id="rentPrice"
            type="text"
            value={formData.rentPrice}
            onChange={(e) => handleChange('rentPrice', e.target.value)}
            placeholder="Enter rent price"
          />
          {errors.rentPrice && <p className="text-red-500 text-sm">{errors.rentPrice}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="rentDuration">Rent Duration</Label>
          <Select
            value={formData.rentDuration}
            onValueChange={(value) => handleChange('rentDuration', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select rent duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="per day">Per Day</SelectItem>
              <SelectItem value="per hour">Per Hour</SelectItem>
              <SelectItem value="per year">Per Year</SelectItem>
            </SelectContent>
          </Select>
          {errors.rentDuration && <p className="text-red-500 text-sm">{errors.rentDuration}</p>}
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
          disabled={isNextDisabled} // Disable button if validation fails
          className="ml-auto"
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
