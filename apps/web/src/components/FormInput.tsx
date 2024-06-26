'use client';

import { Input } from './ui/input';
import { Label } from './ui/label';
import { FormikHandlers } from 'formik';

interface FormInputProps {
  name: string;
  label: string;
  type: string;
  value: string | number | Date;
  placeholder: string;
  isError: boolean;
  error: string | undefined;
  onChange: FormikHandlers['handleChange'];
  onBlur: FormikHandlers['handleBlur'];
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  type = 'text',
  isError,
  placeholder,
  value,
  error,
  onChange,
  onBlur,
}) => {
  const adjustedValue = value instanceof Date ? value.toISOString().split('T')[0] : value;
  
  const adjustedPlaceholder = type === 'date' ? 'YYYY-MM-DD' : type === 'time' ? 'HH:MM' : placeholder;
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={name} className={isError ? 'text-red-500' : 'text-black'}>
        {label}
      </Label>
      <Input
        name={name}
        type={type}
        placeholder={adjustedPlaceholder}
        onBlur={onBlur}
        onChange={onChange}
        value={adjustedValue}
        className={isError ? 'border-red-500' : ''}
      />
      {isError ? <div className="text-xs text-red-500">{error}</div> : null}
    </div>
  );
};

export default FormInput;
