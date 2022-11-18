const THEME = {
  dark: {
    container: 'text-white text-sm',
    button:
      'relative w-full py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out cursor-pointer sm:text-sm sm:leading-5 border border-white rounded-lg bg-gray-700',
    menu: 'bg-gray-600',
    item: {
      base: 'text-sm text-white',
      active: 'bg-black text-white',
      selected: 'bg-gray-700 text-white',
      disabled: 'opacity-40 text-white',
    },
    open: {
      button: 'bg-gray-700',
    },
    loading: 'relative flex items-center w-full h-full',
    states: {
      error: 'border-red-500',
      success: 'border-green-500',
      disabled: 'opacity-50',
    },
  },

  light: {
    container: 'text-gray-600 text-sm',
    button:
      'relative w-full py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out cursor-pointer sm:text-sm sm:leading-5 border border-gray-800 rounded-lg bg-white',
    menu: 'bg-white',
    item: {
      base: 'text-sm',
      active: 'bg-black/30 text-black',
      selected: 'bg-black/40 text-black',
      disabled: 'opacity-40 text-black',
    },
    open: {
      button: 'bg-white',
    },
    loading: 'relative flex items-center w-full h-full',
    states: {
      error: 'border-red-500',
      success: 'border-green-500',
      disabled: 'opacity-50',
    },
  },

  none: {
    container: 'w-auto inline-flex',
    button: 'pr-8 font-semibold',
    menu: 'bg-white text-gray-700',
    item: {
      base: '',
      active: 'bg-gray-100 text-black',
      selected: 'bg-black/10 text-black',
      disabled: 'opacity-40 text-black',
    },
    open: {
      button: '',
    },
    loading: 'relative flex items-center w-full h-full',
    states: {
      error: '',
      success: '',
      disabled: 'opacity-50',
    },
  },

  sizes: {
    base: 'pl-4 pr-10 py-3 text-sm',
    s: 'pl-4 pr-10 py-1.5 text-sm',
    none: '',
  },
};

export default THEME;
