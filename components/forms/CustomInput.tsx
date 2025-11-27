"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import CustomInputBase from "./CustomInputBase";
import FormikCustomInput from "./FormikCustomInput";

interface CustomInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  label?: string;
  variant?: "dark" | "light";
  containerClassName?: string;
  error?: string;
  name?: string;
}

// Error boundary for Formik errors
class FormikErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error if needed
    if (!error.message.includes("Formik")) {
      // Re-throw if it's not a Formik error
      throw error;
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Main component
const CustomInput: React.FC<CustomInputProps> = (props) => {
  // If no name provided, use base component (no Formik)
  if (!props.name) {
    return <CustomInputBase {...props} />;
  }

  // If name is provided, try to use Formik version with error boundary
  return (
    <FormikErrorBoundary fallback={<CustomInputBase {...props} />}>
      <FormikCustomInput {...props} name={props.name} />
    </FormikErrorBoundary>
  );
};

export default CustomInput;
