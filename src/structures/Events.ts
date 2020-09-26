import { ViewOptions } from '../views/ViewOptions';

type ValueOf<T> = T[keyof T];

export const Events = {
  CHANGE_BUTTON_COLOR: 'changeButtonColor',
  READY: 'ready',
  SWITCH_VIEW: 'switchView',
} as const;

export interface EventArgs extends Record<ValueOf<typeof Events>, any[]> {
  changeButtonColor: [string],
  ready: [],
  switchView: [string, ViewOptions?]
}
