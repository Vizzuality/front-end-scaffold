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
