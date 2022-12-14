import { atomWithHash } from 'jotai-location';

// **** IMPLEMENTATION EXAMPLE
export type Filters = {
  hash1: string;
  hash2: string[];
};

export const hash1Atom = atomWithHash('hash1', '');
export const hash2Atom = atomWithHash<string[]>('hash2', []);
// IMPLEMENTATION EXAMPLE ****

// How to use in components (examples):
//
// const hashses = {
//  hash1: useAtom(hash1),
//  hash2: useAtom(hash2),
// }
//            OR
// const hashValues: Filters = {
//  hash1: useAtomValue(hash1),
//  hash2: useAtomValue(hash2),
// }
//            OR
// const setHashes: Filters = {
//  hash1: useSetAtom(hash1),
//  hash2: useSetAtom(hash2),
// }
