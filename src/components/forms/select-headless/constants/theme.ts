const THEME = {
  dark: {
    container: 'text-white text-sm',
    button: {
      base: 'bg-gray-600 top-[46px]',
      s: 'bg-white top-[35px]',
    },
    menu: 'bg-gray-600',
    item: {
      base: 'text-sm text-white',
      active: 'opacity-80 text-white',
    },
    open: {
      button: 'bg-gray-600',
    },
    loading: 'relative flex items-center w-full h-full',
  },
  light: {
    container: 'text-gray-600 text-sm',
    button: {
      base: 'bg-white top-[46px]',
      s: 'bg-white top-[35px]',
    },
    menu: 'bg-white',
    item: {
      base: 'text-sm',
      active: 'bg-grey-0/30 text-black',
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
