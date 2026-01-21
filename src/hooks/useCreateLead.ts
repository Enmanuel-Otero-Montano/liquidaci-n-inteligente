import { useMutation } from '@tanstack/react-query';
import { createLeadMock } from '@/mocks/leads';
import { CreateLeadInput, Lead } from '@/types/lead';

export function useCreateLead() {
  return useMutation<Lead, Error, CreateLeadInput>({
    mutationFn: createLeadMock,
  });
}
