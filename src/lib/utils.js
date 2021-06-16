import { APP_NAME } from '../contants/app';

export default class Utils {
  static logAppVersion() {
    import(`../../package.json`).then(({ version }) =>
      console.log(
        `%c${APP_NAME} ${version}`,
        ['background: #003daf', 'color: white', 'padding: 8px 16px'].join(';')
      )
    );
  }
}
