declare module '*.svg';
declare module '*.svg?sprite' {
  interface BrowserSpriteSymbol {
    id: string;
    viewBox: string;
    content: string;
    node: SVGSymbolElement;
  }

  const content: BrowserSpriteSymbol;
  export default content;
}
declare module '*.png';
declare module '*.jpg';
