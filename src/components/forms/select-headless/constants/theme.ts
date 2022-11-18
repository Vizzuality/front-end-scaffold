const THEME = {
  dark: {
    container: 'text-white text-sm',
    button: {
      base: 'relative w-full text-left transition duration-150 ease-in-out cursor-pointer border rounded-lg bg-gray-700',
      states: {
        none: 'border-white',
        error: 'border-red-500',
        valid: 'border-green-500',
        disabled: 'opacity-50',
      },
    },
    menu: 'bg-gray-600',
    item: {
      base: 'text-sm text-white',
      active: 'bg-black text-white',
      selected: 'bg-gray-700 text-white',
      disabled: 'opacity-40 text-white',
    },
    loading: 'relative flex items-center w-full h-full',
  },

  light: {
    container: 'text-gray-600 text-sm',
    button: {
      base: 'relative w-full text-left transition duration-150 ease-in-out cursor-pointer border rounded-lg bg-white',
      states: {
        none: 'border-gray-800',
        error: 'border-red-500',
        valid: 'border-green-500',
        disabled: 'opacity-50',
      },
    },
    menu: 'bg-white',
    item: {
      base: 'text-sm',
      active: 'bg-black/30 text-black',
      selected: 'bg-black/40 text-black',
      disabled: 'opacity-40 text-black',
    },
    loading: 'relative flex items-center w-full h-full',
  },

  none: {
    container: 'w-auto inline-flex',
    button: {
      base: '',
      states: {
        none: '',
        error: 'text-red-500',
        valid: 'text-green-500',
        disabled: 'opacity-50',
      },
    },
    menu: 'bg-white text-gray-700',
    item: {
      base: 'text-sm',
      active: 'bg-gray-100 text-black',
      selected: 'bg-black/10 text-black',
      disabled: 'opacity-40 text-black',
    },
    loading: 'relative flex items-center w-full h-full',
  },

  sizes: {
    base: 'pl-4 pr-10 py-3 text-sm',
    s: 'pl-4 pr-10 py-1.5 text-sm',
    none: 'pr-10',
  },
};

export default THEME;
