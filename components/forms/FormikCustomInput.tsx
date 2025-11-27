"use client";

import React from "react";
import { useField } from "formik";
import CustomInputBase from "./CustomInputBase";

interface FormikCustomInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  label?: string;
  variant?: "dark" | "light";
  containerClassName?: string;
  error?: string;
  name: string;
}

// Component that uses Formik (must be inside Formik Form)
const FormikCustomInput: React.FC<FormikCustomInputProps> = (props) => {
  const [field, meta] = useField(props.name);
  const error = props.error || (meta.touched && meta.error ? meta.error : undefined);
  
  return (
    <CustomInputBase
      {...props}
      error={error}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      name={field.name}
    />
  );
};

export default FormikCustomInput;

