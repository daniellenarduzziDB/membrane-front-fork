import { memo } from 'react';

//styles
import * as styles from '../styles.module.scss';

//components
import Form from '../../../components/Form';

//regex validation
import * as regex from '../../../helpers/regex';

//hooks
import useUser from '../../../hooks/useUser';
import useNotification from '../../../hooks/useNotification';

export default memo(function PersonalInformation(props) {
  //hook user
  const { signUp } = useUser();
  const [pushNotification] = useNotification();

  const onSubmit = data => {
    data.phoneNumber = data.prefix.concat(data.phoneNumber);
    delete data.prefix;

    data.jobTitle = '';
    data.state = 'CABA';

    signUp(data)
      .then(response => {
        props.onComplete(response);
      })
      .catch(error => {
        pushNotification({
          type: 'error',
          message: error.message,
          lifetime: 5000
        });
      });
  };

  return (
    <>
      <label>Please, enter your personal information</label>
      <span>*Required fields</span>
      <div className={styles.signUpForm}>
        <Form
          items={[
            {
              label: 'First Name *',
              name: 'firstName',
              type: 'text',
              size: 'col-6',
              placeholder: 'Enter your first name here',
              validation: {
                required: 'This field is required'
              }
            },
            {
              label: 'Last Name *',
              name: 'lastName',
              type: 'text',
              size: 'col-6',
              placeholder: 'Enter your last name here',
              validation: {
                required: 'This field is required'
              }
            },
            {
              label: 'Email *',
              name: 'email',
              type: 'text',
              placeholder: 'Enter your email here',
              validation: {
                required: 'This field is required',
                pattern: {
                  value: regex.EMAIL,
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
              label: 'Phone Number *',
              name: 'phoneNumber',
              type: 'tel',
              size: 'col-6'
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
              label: 'Already have an account?',
              linkTo: '/sign-in'
            }
          ]}
        />
      </div>
    </>
  );
});
