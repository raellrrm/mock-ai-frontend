import { z } from 'zod';

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'O e-mail é obrigatório.')
        .max(250, 'Tamanho excedido')
        .email('Formato de e-mail inválido.')
        .trim()
        .toLowerCase(),

    password: z
        .string()
        .min(1, 'A senha é obrigatória.')
        .min(8, 'A senha deve ter no mínimo 8 caracteres.')
        .regex(/[A-Z]/, 'Deve conter pelo menos uma letra maiúscula.')
        .regex(/[a-z]/, 'Deve conter pelo menos uma letra minúscula.')
        .regex(/[0-9]/, 'Deve conter pelo menos um número.')
});

export type LoginFormData = z.infer<typeof loginSchema>;