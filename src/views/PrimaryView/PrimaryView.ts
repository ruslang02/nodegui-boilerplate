import { Direction, QBoxLayout, QWidget } from '@nodegui/nodegui';
import { __ } from 'i18n';
import { app } from '../..';
import { ColorButton, ThemeColor } from '../../components/DColorButton/ColorButton';
import { Events } from '../../structures/Events';

export class PrimaryView extends QWidget {
  private controls = new QBoxLayout(Direction.LeftToRight);

  constructor() {
    super();
    this.setObjectName('MainView');
    this.initView();
  }

  private initView() {
    const { controls } = this;

    this.setLayout(controls);
    controls.setSpacing(0);
    controls.setContentsMargins(0, 0, 0, 0);
    const nextButton = new ColorButton(this, ThemeColor.PRIMARY);
    nextButton.setText(__('PRIMARY_BUTTON_TEXT'));
    nextButton.addEventListener('clicked', () => app.emit(Events.SWITCH_VIEW, 'secondary'));
    controls.addStretch(1);
    controls.addWidget(nextButton);
    controls.addStretch(1);
  }
}
