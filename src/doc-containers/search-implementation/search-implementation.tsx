import { useState } from 'react';

import Search from 'components/search';

const SearchImplementation = () => {
  const [value, setValue] = useState('');

  return (
    <Search
      theme="light"
      placeholder="Search for something..."
      size="sm"
      value={value}
      setValue={setValue}
    />
  );
};

export default SearchImplementation;
