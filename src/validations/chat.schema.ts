import { z } from 'zod';
import { ChatType } from '@/services/chat.service'; 

export const createChatSchema = z.object({
  title: z
    .string()
    .min(3, 'O título deve ter no mínimo 3 caracteres.')
    .max(100, 'O título é muito longo.'),
    
  type: z.nativeEnum(ChatType, {
    errorMap: () => ({ message: 'Selecione um tipo de simulação válido.' })
  }),
  
  tags: z
    .string()
    .min(1, 'Informe pelo menos uma tag (ex: java, spring).')
    .transform((val) => val.split(',').map((tag) => tag.trim().toLowerCase()).filter(Boolean))
});

export type CreateChatFormData = z.infer<typeof createChatSchema>;