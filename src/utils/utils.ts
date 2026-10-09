export function isLoadableFile(file: string): boolean {
  return (
    (file.endsWith(".ts") || file.endsWith(".js")) && !file.endsWith(".d.ts")
  );
}
