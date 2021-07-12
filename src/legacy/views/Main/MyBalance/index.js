import { memo } from 'react';
import classnames from 'classnames';
import shortid from 'shortid';

//styles
import * as styles from './styles.module.scss';

//components
import Button from '../../../components/Button';

//coins images
// import coinBCH from '../../../assets/images/coins/BCH.svg';
// import coinBTC from '../../../assets/images/coins/BTC.svg';
// import coinETH from '../../../assets/images/coins/ETH.svg';
// import coinLTC from '../../../assets/images/coins/LTC.svg';
// import coinSNX from '../../../assets/images/coins/SNX.svg';
// import coinUSDC from '../../../assets/images/coins/USDC.svg';

const coins = [
  {
    name: 'Bitcoin (BTC)',
    // img: coinBTC
  },
  {
    name: 'Ethereum (ETC)',
    // img: coinETH
  },
  {
    name: 'Litecoin (LTC)',
    // img: coinLTC
  },
  {
    name: 'Bitcoin Cash (BCH)',
    // img: coinBCH
  },
  {
    name: 'Usdc Coin (USDC)',
    // img: coinUSDC
  },
  {
    name: 'Synthetix',
    // img: coinSNX
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
