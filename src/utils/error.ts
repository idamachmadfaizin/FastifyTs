export const isNodeError = (error: unknown): error is NodeJS.ErrnoException => {
  return (error as NodeJS.ErrnoException).code !== undefined;
};
