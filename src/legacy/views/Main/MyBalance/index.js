import { memo } from 'react';
import classnames from 'classnames';
import shortid from 'shortid';

//styles
import * as styles from './styles.module.scss';

//components
import Button from '../../../components/Button';

const coins = [
  {
    name: 'Bitcoin (BTC)',
    img: "/static/images/coins/BTC.svg"
  },
  {
    name: 'Ethereum (ETC)',
    img: "/static/images/coins/ETH.svg"
  },
  {
    name: 'Litecoin (LTC)',
    img: "/static/images/coins/LTC.svg"
  },
  {
    name: 'Bitcoin Cash (BCH)',
    img: "/static/images/coins/BCH.svg"
  },
  {
    name: 'Usdc Coin (USDC)',
    img: "/static/images/coins/USDC.svg"
  },
  {
    name: 'Synthetix',
    img: "/static/images/coins/SNX.svg"
  }
];

export default memo(function MyBalance() {
  //bind styles
  classnames.bind(styles);

  return (
    <div className={styles.myBalanceContainer}>
      {coins.map(coin => (
        <div key={shortid.generate()} className={styles.coinCard}>
          <div className={styles.coinCardTitle}>
            {/* <img alt={coin.name} src={coin.img} /> */}
            <label>{coin.name}</label>
          </div>
          <div className={styles.coinCardContent}>
            <label>Total</label>
            <label>0</label>
          </div>
          <div className={styles.coinCardActions}>
            <Button text="Buy" />
            <Button text="Borrow" type="secondary" />
          </div>
        </div>
      ))}
    </div>
  );
});
