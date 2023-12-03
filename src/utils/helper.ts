export const formatUsername = (name: string) => {
  if (!name) return '';
  return name
    .replace(/' '/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '')
    .replace(/\s/g, '')
    .toLowerCase();
};
