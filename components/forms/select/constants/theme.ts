export default {
  dark: {
    container: 'text-white bg-transparent ring-1 ring-slate-400 rounded-3xl',
    open: 'ring-2 ring-blue-400 bg-slate-700 text-white rounded-2xl',
    closed: 'border-slate-400 text-slate-400',
    prefix: {
      base: 'text-white',
    },
    icon: {
      closed: 'text-white',
      open: 'text-blue-500 transform rotate-180',
      disabled: 'text-slate-400',
    },
    item: {
      base: 'text-sm text-slate-300',
      highlighted: 'text-sm bg-slate-700 text-white',
      disabled: 'text-sm opacity-50 pointer-events-none',
    },
  },
  light: {
    container: 'text-slate-600 bg-transparent ring-1 ring-slate-400 rounded-3xl',
    open: 'ring-2 ring-blue-400 bg-white text-slate-600 rounded-2xl',
    closed: 'text-slate-400',
    prefix: {
      base: 'text-slate-800',
    },
    icon: {
      closed: 'text-slate-600',
      open: 'text-blue-500 transform rotate-180',
      disabled: 'text-slate-400',
    },
    item: {
      base: 'text-sm text-slate-400',
      highlighted: 'text-sm bg-slate-100 text-slate-800',
      disabled: 'text-sm opacity-50 pointer-events-none',
    },
  },
  states: {
    none: '',
    error: 'ring-red-500',
    valid: 'ring-green-500',
  },
  sizes: {
    base: 'pl-4 pr-10 py-3 text-sm',
    s: 'pl-4 pr-10 py-1.5 text-sm',
  },
};
