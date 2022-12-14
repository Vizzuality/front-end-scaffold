export const serialize = (value: unknown) => {
  if (!value) return '';
  if (typeof value === 'string') {
    return value;
  }
  return JSON.stringify(value);
};

export const deserialize = (value: string) => {
  if (!value) return '';
  try {
    return JSON.parse(value);
  } catch (err) {
    return value;
  }
};
