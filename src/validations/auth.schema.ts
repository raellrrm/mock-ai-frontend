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

export const registerSchema = z.object({
    name: z
        .string()
        .min(3, 'O nome deve ter no mínimo 3 caracteres.')
        .max(100, 'Nome muito longo.')
        .trim(),

    email: z
        .string()
        .min(1, 'O e-mail é obrigatório.')
        .email('Formato de e-mail inválido.')
        .trim()
        .toLowerCase(),

    password: z
        .string()
        .min(1, 'A senha é obrigatória.')
        .min(8, 'A senha deve ter no mínimo 8 caracteres.')
        .regex(/[A-Z]/, 'Deve conter pelo menos uma letra maiúscula.')
        .regex(/[a-z]/, 'Deve conter pelo menos uma letra minúscula.')
        .regex(/[0-9]/, 'Deve conter pelo menos um número.'),

    confirmPassword: z
        .string()
        .min(1, 'Confirme sua senha.')
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;