// eslint-disable-next-line import/prefer-default-export
export const THEME = {
  dark: {
    base: 'w-full leading-tight text-white bg-slate-800 bg-opacity-0',
    status: {
      none: 'border-slate-500',
      valid: 'border-emerald-500',
      error: 'border-red-500',
      disabled: 'border-slate-500 opacity-50',
    },
    icon: 'text-white',
    mode: {
      normal: 'border rounded',
      dashed: 'border-dashed border-b',
    },
  },
  light: {
    base: 'w-full leading-tight text-slate-800 bg-white border rounded',
    status: {
      none: 'border-slate-800',
      valid: 'border-emerald-500',
      error: 'border-red-500',
      disabled: 'border-slate-800 opacity-50',
    },
    icon: 'text-slate-800 text-opacity-50',
    mode: {
      normal: 'border rounded',
      dashed: 'border-dashed border-b',
    },
  },
};
