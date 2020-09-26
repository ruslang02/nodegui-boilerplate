import {
  QIcon, QMainWindow, QStackedWidget, WidgetAttribute,
} from '@nodegui/nodegui';
import { existsSync, promises } from 'fs';
import path from 'path';
import { app } from '..';
import { Events as AppEvents } from '../structures/Events';
import { PrimaryView } from '../views/PrimaryView/PrimaryView';
import { SecondaryView } from '../views/SecondaryView/SecondaryView';

const { readFile } = promises;

export class RootWindow extends QMainWindow {
  private root = new QStackedWidget(this);

  private primaryView = new PrimaryView();

  private secondaryView = new SecondaryView();

  constructor() {
    super();
    this.loadStyles();
    this.loadIcon();
    this.initializeWindow();

    app.on(AppEvents.SWITCH_VIEW, (view: string) => {
      switch (view) {
        case 'primary':
          this.root.setCurrentWidget(this.primaryView);
          break;
        case 'secondary':
          this.root.setCurrentWidget(this.secondaryView);
          break;
        default:
      }
    });

    app.on(AppEvents.READY, () => this.loadStyles());
  }

  protected initializeWindow() {
    this.setWindowTitle('NodeGui boilerplate');
    this.setObjectName('RootWindow');
    this.setMinimumSize(1000, 500);
    this.resize(1200, 600);
    this.setAttribute(WidgetAttribute.WA_AlwaysShowToolTips, true);
    this.setCentralWidget(this.root);
    this.root.addWidget(this.primaryView);
    this.root.addWidget(this.secondaryView);
    this.root.setCurrentWidget(this.primaryView);
  }

  async loadStyles() {
    const stylePath = path.join(__dirname, 'themes', `${app.config.theme}.theme.css`);
    if (!existsSync(stylePath)) return;
    const stylesheet = await readFile(stylePath, 'utf8');
    this.setStyleSheet(stylesheet);
  }

  protected loadIcon() {
    const icon = new QIcon(path.resolve(__dirname, './assets/icon.png'));
    this.setWindowIcon(icon);
  }
}
