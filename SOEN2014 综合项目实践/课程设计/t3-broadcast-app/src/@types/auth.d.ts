import type { Roles } from '@/constants/auth';

export type UserRole = (typeof Roles)[keyof typeof Roles];
