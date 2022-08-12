const THEME = {
  dark: {
    container:
      'ring-1 ring-gray-400 relative flex items-center justify-between text-white bg-transparent hover:opacity-20 rounded-3xl w-full py-1 px-4',
    menu: 'ring-2 ring-blue-400 bg-gray-700 rounded-2xl overflow-y-auto overflow-x-hidden',
    category: 'px-4 my-5 text-white opacity-50',

    item: {
      base: 'flex items-center justify-between px-6 py-3 text-left text-white transition duration-150 ease-out rounded-sm cursor-pointer focus:bg-blue-500 outline-0 min-h-4',
      disabled: 'text-sm opacity-50 pointer-events-none',
    },
  },
  light: {
    container:
      'ring-1 ring-gray-400 relative flex items-center justify-between text-gray-600 bg-transparent hover:opacity-20 rounded-3xl w-full py-1 px-4',
    menu: 'ring-2 ring-blue-400  bg-transparent rounded-2xl overflow-y-auto overflow-x-hidden',
    category: 'px-4 my-5 text-gray-600 opacity-50',

    item: {
      base: 'flex items-center justify-between px-6 py-3 text-left text-gray-600 transition duration-150 ease-out rounded-sm cursor-pointer focus:bg-blue-500 outline-0 min-h-4',
      disabled: 'text-sm opacity-50 pointer-events-none',
    },
  },
};

export default THEME;
