const THEME = {
  dark: {
    container: 'text-white text-sm',
    button:
      'relative w-full py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out cursor-pointer sm:text-sm sm:leading-5 border border-grey-0 rounded-lg',
    menu: 'bg-gray-600',
    item: {
      base: 'text-sm text-white',
      active: 'bg-black text-white',
      selected: 'bg-gray-700 text-white',
      disabled: 'opacity-40 text-white',
    },
    open: {
      button: 'bg-gray-600',
    },
    loading: 'relative flex items-center w-full h-full',
  },
  light: {
    container: 'text-gray-600 text-sm',
    button:
      'relative w-full py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out cursor-pointer sm:text-sm sm:leading-5 border border-grey-0 rounded-lg',
    menu: 'bg-white',
    item: {
      base: 'text-sm',
      active: 'bg-black/30 text-black',
      selected: 'bg-black/40 text-black',
      disabled: 'opacity-40 text-black',
    },
    open: {
      button: 'bg-transparent',
    },
    loading: 'relative flex items-center w-full h-full',
  },
  sizes: {
    base: 'pl-4 pr-10 py-3 text-sm',
    s: 'pl-4 pr-10 py-1.5 text-sm',
  },
};

export default THEME;
