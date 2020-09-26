import {
  Direction,
  QBoxLayout,
  QWidget,
} from '@nodegui/nodegui';
import { __ } from 'i18n';
import { app } from '../..';
import { ColorButton, ThemeColor } from '../../components/DColorButton/ColorButton';
import { Events } from '../../structures/Events';

export class SecondaryView extends QWidget {
  layout = new QBoxLayout(Direction.LeftToRight);

  constructor() {
    super();
    this.setLayout(this.layout);
    this.setObjectName('SecondaryView');
    this.initView();
  }

  private initView() {
    const {
      layout,
    } = this;

    layout.setContentsMargins(0, 0, 0, 0);
    layout.setSpacing(0);

    const backBtn = new ColorButton(this, ThemeColor.SECONDARY);
    backBtn.addEventListener('clicked', () => app.emit(Events.SWITCH_VIEW, 'primary'));
    backBtn.setText(__('SECONDARY_BUTTON_TEXT'));
    layout.addStretch(1);
    layout.addWidget(backBtn);
    layout.addStretch(1);
  }
}
