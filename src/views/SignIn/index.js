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
        start={{ opacity: 0 }}
        end={{ opacity: 1 }}>
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
                    required: 'This field is required',
                    pattern: {
                      value: regex.EMAIL,
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
                    required: 'This field is required'
                  }
                }
              ]}
              actions={[
                {
                  type: 'primary',
                  useSubmitBehavior: true,
                  label: 'Next',
                  onClick: onSubmit
                },
                {
                  type: 'tertiary',
                  label: 'Sign Up',
                  linkTo: '/sign-up'
                },
                {
                  type: 'tertiary',
                  label: 'Forgot Password',
                  linkTo: '/forgot-password'
                }
              ]}
            />
          </div>
        </div>
      </Animate>
    </Splash>
  );
});
