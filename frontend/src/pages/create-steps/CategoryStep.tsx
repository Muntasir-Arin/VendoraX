import React, { useState } from 'react';
import { useProductForm } from '../../contexts/ProductFormContext';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const categories = [
  'ELECTRONICS',
  'FURNITURE',
  'HOME_APPLIANCES',
  'SPORTING_GOODS',
  'OUTDOOR',
  'TOYS',
] as const;

interface CategoryStepProps {
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  currentStepIndex: number;
}

export const CategoryStep: React.FC<CategoryStepProps> = ({
  goToNextStep,
  goToPreviousStep,
  currentStepIndex,
}) => {
  const { formData, updateFormData, validateField } = useProductForm();
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addCategory = (category: typeof categories[number]) => {
    if (!formData.categories.includes(category)) {
      const newCategories = [...formData.categories, category];
      updateFormData({ categories: newCategories });
      setError(validateField('categories', newCategories));
    }
  };

  const removeCategory = (category: string) => {
    const newCategories = formData.categories.filter((c) => c !== category);
    updateFormData({ categories: newCategories });
    setError(validateField('categories', newCategories));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Product Categories</h2>
      <div className="space-y-4">
        {/* Search Categories */}
        <div className="space-y-2">
          <Label htmlFor="category-search">Search Categories</Label>
          <Input
            id="category-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search categories"
          />
        </div>

        {/* Available Categories */}
        <div className="space-y-2">
          <Label>Available Categories</Label>
          <div className="flex flex-wrap gap-2">
            {filteredCategories.map((category) => (
              <Button
                key={category}
                variant="outline"
                onClick={() => addCategory(category)}
                disabled={formData.categories.includes(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Selected Categories */}
        <div className="space-y-2">
          <Label>Selected Categories</Label>
          <div className="flex flex-wrap gap-2">
            {formData.categories.map((category) => (
              <Button
                key={category}
                variant="secondary"
                onClick={() => removeCategory(category)}
              >
                {category} <X className="ml-2 h-4 w-4" />
              </Button>
            ))}
          </div>
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
          disabled={!!error || formData.categories.length === 0} // Disable if there's an error or no categories selected
          className="ml-auto"
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
