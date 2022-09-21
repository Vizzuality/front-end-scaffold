const THEME = {
  dark: {
    button: {
      base: 'bg-transparent top-[46px]',
      s: 'bg-white top-[35px]',
    },
    container: 'text-white text-sm',
    item: {
      base: 'text-sm text-white',
      active: 'opacity-80 text-white',
    },
    menu: 'bg-transparent',
    open: {
      button: 'bg-transparent',
    },
  },
  light: {
    button: {
      base: 'bg-white top-[46px]',
      s: 'bg-white top-[35px]',
    },
    container: 'text-gray-600 text-sm',
    item: {
      base: 'text-sm',
      active: 'opacity-70 text-black',
    },
    menu: 'bg-white',
    open: {
      button: 'bg-white',
    },
  },
  sizes: {
    base: 'pl-4 pr-10 py-3 text-sm',
    s: 'pl-4 pr-10 py-1.5 text-sm',
  },
};

export default THEME;
