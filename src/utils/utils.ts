export function isLoadableFile(file: string): boolean {
  return (
    (file.endsWith(".ts") || file.endsWith(".js")) && !file.endsWith(".d.ts")
  );
}

export function isValidURL(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}
