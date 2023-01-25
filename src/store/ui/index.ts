import { atom } from 'jotai';

export const filtersAtom = atom({
  size: 30,
  state: ['some', 'random', 'values'],
});

filtersAtom.debugLabel = 'filtersAtom';

export const scenarioAtom = atom(1);
scenarioAtom.debugLabel = 'scenarioAtom';

export const pageAtom = atom(5);
scenarioAtom.debugLabel = 'pageAtom';

export const acceptCookiesAtom = atom(false);
acceptCookiesAtom.debugLabel = 'acceptCookies';
