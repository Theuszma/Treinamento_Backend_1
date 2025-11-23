import { vi } from 'vitest';
import prisma from '@/lib/__mocks__/prisma';

vi.mock('@/lib/prisma', () => ({
  default: prisma,
}));

vi.mock('@/lib/s3', () => ({
  uploadImageToS3: vi.fn().mockResolvedValue('https://fake-url.com/imagem-foda.png'),
}));