import React, { createContext, useContext, useState, useEffect } from 'react';
import { z } from 'zod';

const categoryEnum = z.enum(['ELECTRONICS', 'FURNITURE', 'HOME_APPLIANCES', 'SPORTING_GOODS', 'OUTDOOR', 'TOYS']);

// eslint-disable-next-line react-refresh/only-export-components
export const productFormSchema = z.object({
  title: z.string().min(2, "Title is required").max(100, "Title must be 100 characters or less"),
  categories: z.array(categoryEnum).min(1, "At least one category is required"),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description must be 1000 characters or less"),
  purchasePrice: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  rentPrice: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  rentDuration: z.enum(['per day', 'per hour', 'per year']),
});

export type ProductFormData = z.infer<typeof productFormSchema>;

interface ProductFormContextType {
  formData: ProductFormData;
  updateFormData: (data: Partial<ProductFormData>) => void;
  resetForm: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validateField: (field: keyof ProductFormData, value: any) => string | null;
}

const initialFormData: ProductFormData = {
  title: '',
  categories: [],
  description: '',
  purchasePrice: "",
  rentPrice: "",
  rentDuration: 'per day',
};

const ProductFormContext = createContext<ProductFormContextType | undefined>(undefined);

export const useProductForm = () => {
  const context = useContext(ProductFormContext);
  if (!context) {
    throw new Error('useProductForm must be used within a ProductFormProvider');
  }
  return context;
};

export const ProductFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<ProductFormData>(() => {
    const savedData = localStorage.getItem('productFormData');
    return savedData ? JSON.parse(savedData) : initialFormData;
  });

  useEffect(() => {
    localStorage.setItem('productFormData', JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (data: Partial<ProductFormData>) => {
    setFormData(prevData => ({ ...prevData, ...data }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    localStorage.removeItem('productFormData');
  };

  const validateField = <K extends keyof ProductFormData>(
    field: K,
    value: ProductFormData[K]
  ): string | null => {
    try {
      productFormSchema.shape[field].parse(value);
      return null;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0]?.message || 'Invalid input';
      }
      return 'Invalid input';
    }
  };
  

  return (
    <ProductFormContext.Provider value={{ formData, updateFormData, resetForm, validateField }}>
      {children}
    </ProductFormContext.Provider>
  );
};

