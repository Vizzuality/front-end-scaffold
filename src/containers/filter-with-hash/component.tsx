import { hash1Atom, hash2Atom } from 'store/filter-with-hash';

import { useAtom } from 'jotai';
import { RESET } from 'jotai/utils';

import { Button } from 'components/button/component';
import Input from 'components/forms/input';
import Select from 'components/forms/select/multi';

export const FilterWhithHash = () => {
  const [hash1, setHash1] = useAtom(hash1Atom);
  const [hash2, setHash2] = useAtom(hash2Atom);

  const handleClearFilters = () => {
    setHash1(RESET);
    setHash2(RESET);
  };

  return (
    <>
      <form className="space-y-4">
        <div className="flex justify-between gap-4">
          <Input
            theme="light"
            name="name"
            value={hash1}
            placeholder="hash1"
            onChange={(e) => setHash1(e.currentTarget.value)}
          />
          <Button size="s" theme="primary" onClick={() => setHash1(RESET)}>
            X
          </Button>
        </div>
        <div className="flex justify-between gap-4">
          <Select
            id="country"
            values={hash2}
            onChange={setHash2}
            options={[
              { label: 'Label1', value: 'value1' },
              { label: 'Label2', value: 'value2' },
              { label: 'Label3', value: 'value3' },
            ]}
            size="base"
            theme="light"
            placeholder="hash2"
          />
          <Button size="s" theme="primary" onClick={() => setHash2(RESET)}>
            X
          </Button>
        </div>
        <Button size="base" theme="danger" onClick={handleClearFilters}>
          Clear
        </Button>
      </form>
    </>
  );
};

export default FilterWhithHash;
