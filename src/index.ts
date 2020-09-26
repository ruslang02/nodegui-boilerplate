/* eslint-disable no-console */
import i18n from 'i18n';
import { join } from 'path';
import { Application } from './Application';

i18n.configure({
  directory: join(__dirname, 'locales'),
  locales: ['en-US', 'ru-RU'],
  defaultLocale: 'en-US',

  logDebugFn() { },
  logWarnFn() { },
  logErrorFn(msg) {
    console.log('error', msg);
  },
  // @ts-ignore
  missingKeyFn(locale, value) {
    console.error(`Translation missing for word "${value}" in locale "${locale}".`);
    return value;
  },
});
export const app = new Application();
export const MAX_QSIZE = 16777215;
app.start();
