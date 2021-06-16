import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//import actions
import { setUserProfile } from '../../store/actions/userProfile';

//import styles
import * as styles from './styles.module.scss';

//import hoc
import withTheme from '../../hoc/withTheme';

//import components
import FontAwesomeIcon, {
  faSun,
  faMoon
} from '../../components/FontAwesomeIcon';

//others
import a1Logo from '../../assets/images/companies/logo_a1.svg';

class Splash extends Component {
  render() {
    const { theme } = this.props;

    return (
      <div className={styles.splashContainer}>
        <img
          className={styles.image}
          src={a1Logo}
          alt="Company Accel One Logotype"
        />

        <button className={styles.themeButton} onClick={theme.toggleTheme}>
          <FontAwesomeIcon
            icon={theme.current === 'dark' ? faSun : faMoon}
            size="2x"
          />
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userProfile: state.userProfile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ setUserProfile }, dispatch)
  };
};

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(Splash));
