import { Component } from 'react';
import * as styles from './styles.module.scss';

import Image from '../../components/Image';

export default class Dashboard extends Component {
  render() {
    return (
      <div className={styles.dashboard_container}>
        <Image />
      </div>
    );
  }
}
