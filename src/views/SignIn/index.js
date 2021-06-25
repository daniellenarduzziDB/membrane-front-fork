import { memo, useState } from 'react';
import { Animate } from 'react-simple-animate';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

//hooks
import useUser from '../../hooks/useUser';

//components
import Form from '../../components/Form';
import Splash from '../../components/Splash';

//regex validation
import * as regex from '../../helpers/regex';

export default memo(function SignIn(props) {
  //hook user
  const { signIn } = useUser();

  //states
  const [customError, setCustomError] = useState('');

  //bind styles
  classnames.bind(styles);

  const onSubmit = data => {
    signIn(data)
      .then(() => {
        props.history.push('/two-factor');
      })
      .catch(error => {
        setCustomError({
          field: 'email',
          type: 'custom',
          message: error.message
        });
      });
  };

  return (
    <Splash>
      <Animate
        play={true}
        duration={0.25}
        start={{ transform: 'scale(0)' }}
        end={{ transform: 'scale(1)' }}>
        <div className={styles.signInContainer}>
          <h2>Sign In</h2>
          <div className={styles.signInForm}>
            <Form
              customError={customError}
              items={[
                {
                  label: 'Email',
                  name: 'email',
                  placeholder: 'Enter your email',
                  type: 'text',
                  validation: {
                    required: {
                      value: true,
                      message: 'This field is required'
                    },
                    pattern: {
                      value: regex.VALID_EMAIL,
                      message: 'Invalid email format'
                    }
                  }
                },
                {
                  label: 'Password',
                  name: 'password',
                  placeholder: 'Enter your password',
                  type: 'password',
                  validation: {
                    required: {
                      value: true,
                      message: 'This field is required'
                    }
                  }
                }
              ]}
              actions={[
                {
                  type: 'primary',
                  actionType: 'submit',
                  label: 'Next',
                  onClick: onSubmit
                },
                {
                  type: 'tertiary',
                  label: 'Forgot Password',
                  linkTo: '/forgot-password'
                },
                {
                  type: 'tertiary',
                  label: 'Sign Up',
                  linkTo: '/sign-up'
                }
              ]}
            />
          </div>
        </div>
      </Animate>
    </Splash>
  );
});
