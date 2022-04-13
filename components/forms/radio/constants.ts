// eslint-disable-next-line import/prefer-default-export
export const THEME = {
  dark: {
    base: 'bg-slate-800 border rounded-full text-blue-500',
    status: {
      none: 'border-slate-800',
      valid: 'border-green-800',
      error: 'border-red-500',
      disabled: 'border-slate-800 opacity-50',
    },
  },
  light: {
    base: 'bg-white border rounded-full text-blue-500',
    status: {
      none: 'border-slate-800',
      valid: 'border-green-800',
      error: 'border-red-500 focus:border-red-500',
      disabled: 'border-slate-800 opacity-50',
    },
  },
};
