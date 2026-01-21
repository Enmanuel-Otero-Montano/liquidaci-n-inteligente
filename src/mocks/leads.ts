import { Lead, CreateLeadInput } from '@/types/lead';

export const mockLeads: Lead[] = [];

export async function createLeadMock(input: CreateLeadInput): Promise<Lead> {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newLead: Lead = {
    id: `lead-${Date.now()}`,
    ...input,
    status: 'new',
    created_at: new Date().toISOString(),
  };
  
  mockLeads.push(newLead);
  return newLead;
}
