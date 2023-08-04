interface BrowserSpriteSymbol {
  id: string;
  viewBox: string;
  content: string;
  node: SVGSymbolElement;
}

export interface IconProps {
  icon?:
    | {
        id: string;
        viewBox: string;
      }
    | BrowserSpriteSymbol;
  className?: string;
  style?: unknown;
}
