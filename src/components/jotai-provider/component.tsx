import { Provider } from 'jotai';
import { useAtomsDevtools } from 'jotai/devtools';

const AtomsDevtools = ({ children }) => {
  useAtomsDevtools('dev');
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
