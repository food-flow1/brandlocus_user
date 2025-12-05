/**
 * Form Submission Hooks
 * React Query hooks for form operations
 */

import { useMutation } from "@tanstack/react-query";
import { api } from "../apiClient";
import { FormSubmitPayload, FormSubmitResponse, ContactFormPayload } from "../types";

// Query Keys
export const formKeys = {
  all: ["forms"] as const,
  submit: () => [...formKeys.all, "submit"] as const,
};

/**
 * Hook for submitting forms (JoinPlayTest, ReadyToTurn)
 */
export const useSubmitForm = () => {
  return useMutation({
    mutationFn: async (payload: FormSubmitPayload): Promise<FormSubmitResponse> => {
      const response = await api.post<FormSubmitResponse>("/forms/submit", payload);
      // Check if API returned status: false (business logic error)
      if (response && typeof response === 'object' && 'status' in response && response.status === false) {
        const errorMessage = (response as { message?: string }).message || "Form submission failed";
        throw new Error(errorMessage);
      }
      return response;
    },
  });
};

/**
 * Hook for submitting contact form
 */
export const useSubmitContactForm = () => {
  return useMutation({
    mutationFn: async (payload: ContactFormPayload): Promise<FormSubmitResponse> => {
      const response = await api.post<FormSubmitResponse>("/forms/submit", payload);
      // Check if API returned status: false (business logic error)
      if (response && typeof response === 'object' && 'status' in response && response.status === false) {
        const errorMessage = (response as { message?: string }).message || "Form submission failed";
        throw new Error(errorMessage);
      }
      return response;
    },
  });
};

