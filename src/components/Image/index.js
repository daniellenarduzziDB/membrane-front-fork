import { Component } from 'react';
import * as styles from './styles.module.scss';

import a1Logo from '../../assets/images/companies/logo_a1.svg';

export default class Image extends Component {
  render() {
    return (
      <img
        className={styles.img}
        src={a1Logo}
        alt="Company Accel One Logotype"
      />
    );
  }
}
