import { memo, useState } from 'react';
import { Animate } from 'react-simple-animate';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

//hooks
import useUser from '../../hooks/useUser';

//components
import Splash from '../Splash';
import Form from '../../components/Form';

//rejex validation
import { VALID_EMAIL } from '../../helpers/rejex';

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
                      value: VALID_EMAIL,
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
                  actionType: 'custom',
                  label: 'Forgot Password',
                  linkTo: '/forgot-password'
                },
                {
                  type: 'tertiary',
                  actionType: 'custom',
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
