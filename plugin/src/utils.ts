import fs from 'fs/promises'

export function capitalize(str: string): string {
  if (!str) return ''

  return str[0].toUpperCase() + str.slice(1)
}

export async function file_exists(path: string): Promise<boolean> {
  try {
    await fs.access(path)
    return true
  } catch {
    return false
  }
}

export async function delete_file(path: string) {
  if (await file_exists(path)) {
    await fs.unlink(path)
  }
}
