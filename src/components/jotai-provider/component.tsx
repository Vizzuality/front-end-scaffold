import { Provider } from 'jotai';
import { useAtomsDevtools } from 'jotai-devtools';

const AtomsDevtools = ({ children }) => {
  useAtomsDevtools('viz');
  return children;
};

const JotaiProvider = ({ children }) => {
  return (
    <Provider>
      <AtomsDevtools>{children}</AtomsDevtools>
    </Provider>
  );
};

export default JotaiProvider;
