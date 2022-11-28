import { atom } from 'jotai';

export const acceptCookiesAtom = atom<boolean>(false);
acceptCookiesAtom.debugLabel = 'acceptCookies';
