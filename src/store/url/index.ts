import { scenarioAtom, pageAtom } from 'store/ui';

import { atom } from 'jotai';

export const tagsAtom = atom(['software', 'hardware', 'paid']);

const priceAtom = atom(50);
export const readWriteAtom = atom(
  // (get) => get(priceAtom) * 2,
  null,
  (get, set, newPrice: number) => {
    debugger;
    console.log('WAT', newPrice);
    set(priceAtom, newPrice / 2);
    // you can set as many atoms as you want at the same time
  }
);

export const projectsURLAtom = atom((get) => {
  return {
    scenario: get(scenarioAtom),
    page: get(pageAtom),
    tags: get(tagsAtom),
  };
});

projectsURLAtom.debugLabel = 'projectsURL';
