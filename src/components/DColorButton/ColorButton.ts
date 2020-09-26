import { CursorShape, QPushButton } from '@nodegui/nodegui';

type ValueOf<T> = T[keyof T];

export const ThemeColor = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
} as const;

export class ColorButton extends QPushButton {
  constructor(parent: any, color: ValueOf<typeof ThemeColor>) {
    super(parent);
    this.setObjectName('ColorButton');
    this.setCursor(CursorShape.PointingHandCursor);
    this.setColor(color);
  }

  setColor(color: ValueOf<typeof ThemeColor>) {
    this.setProperty('color', color);
    this.repolish();
  }
}
