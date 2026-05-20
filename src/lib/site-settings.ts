import { prisma } from "@/lib/prisma";

export async function getSiteSetting(
  key: string,
  fallback: string
): Promise<string> {
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key } });
    return setting?.value ?? fallback;
  } catch {
    return fallback;
  }
}
