import { memo, useState } from 'react';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

//components
import Form from '../../components/Form';
import Splash from '../../components/Splash';

//regex validation
import * as regex from '../../helpers/regex';

export default memo(function SignUp(props) {
  //states
  const [error, setError] = useState('');

  //bind styles
  classnames.bind(styles);

  return (
    <Splash>
      <div className={styles.signUpContainer}>
        <h2>Sign Up</h2>
        <label>Please enter your personal information</label>

        <div className={styles.signUpForm}>
          <Form
            customError={error}
            items={[
              {
                label: 'First Name *',
                name: 'firstName',
                type: 'text',
                size: 'col-6',
                placeholder: 'Enter your first name here',
                validation: {
                  required: {
                    value: true,
                    message: 'This field is required'
                  }
                }
              },
              {
                label: 'Last Name *',
                name: 'lastName',
                type: 'text',
                size: 'col-6',
                placeholder: 'Enter your last name here',
                validation: {
                  required: {
                    value: true,
                    message: 'This field is required'
                  }
                }
              },
              {
                label: 'Email *',
                name: 'email',
                type: 'text',
                placeholder: 'Enter your email here',
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
                label: 'Company',
                name: 'company',
                type: 'text',
                size: 'col-6',
                placeholder: 'Enter your company name here'
              },
              {
                label: 'Prefix *',
                name: 'prefix',
                type: 'text',
                size: 'col-2',
                placeholder: '+1'
              },
              {
                label: 'Phone Number *',
                name: 'phone',
                type: 'text',
                size: 'col-4',
                placeholder: 'Mobile number'
              }
            ]}
            actions={[
              {
                type: 'primary',
                actionType: 'submit',
                label: 'Next',
                onClick: () => {}
              },
              {
                type: 'tertiary',
                label: 'Alerady have an account?',
                onClick: () => {}
              }
            ]}
          />
        </div>
      </div>
    </Splash>
  );
});
