import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ProductFormProvider } from '../contexts/ProductFormContext';
import { TitleStep } from './create-steps/TitleStep';
import { CategoryStep } from './create-steps/CategoryStep';
import { DescriptionStep } from './create-steps/DescriptionStep';
import { PriceStep } from './create-steps/PriceStep';
import { SummaryStep } from './create-steps/SummaryStep';

const steps = [
  { path: 'title', component: TitleStep },
  { path: 'category', component: CategoryStep },
  { path: 'description', component: DescriptionStep },
  { path: 'price', component: PriceStep },
  { path: 'summary', component: SummaryStep },
];

export const CreateProduct: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
  
    const currentStepIndex = steps.findIndex(step => location.pathname.includes(step.path));
  
    const goToNextStep = () => {
      if (currentStepIndex < steps.length - 1) {
        navigate(`/create-product/${steps[currentStepIndex + 1].path}`);
      }
    };
  
    const goToPreviousStep = () => {
      if (currentStepIndex > 0) {
        navigate(`/create-product/${steps[currentStepIndex - 1].path}`);
      }
    };
  
    return (
      <ProductFormProvider>
        <div className="max-w-2xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Create New Product</h1>
          <div className="mb-6">
            <Routes>
              {steps.map(step => (
                <Route
                  key={step.path}
                  path={`/${step.path}`}
                  element={
                    <step.component
                      goToNextStep={goToNextStep}
                      goToPreviousStep={goToPreviousStep}
                      currentStepIndex={currentStepIndex}
                    />
                  }
                />
              ))}
            </Routes>
          </div>
        </div>
      </ProductFormProvider>
    );
  };
  