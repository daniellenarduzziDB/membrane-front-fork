import { useState, useEffect } from 'react';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';
import * as fieldStyles from '../styles.module.scss';

//regex
import * as regex from '../../../../helpers/regex';

//services
import { getCountries } from '../../../../services/countries';

export default function MobileNumber({
  name,
  watch,
  trigger,
  register,
  setValue,
  getValues
}) {
  //bind styles
  classnames.bind(styles);
  classnames.bind(fieldStyles);

  //states
  const [countries, setCountries] = useState([]);

  let code = watch('prefix');

  useEffect(() => {
    let country = countries.find(c => c.phone_code === code)?.country_id ?? '';
    setValue('country', country, { shouldValidate: true });
    // eslint-disable-next-line
  }, [code]);

  useEffect(() => {
    getCountries().then(response => {
      setCountries(response);
    });
  }, []);

  return (
    <div className={classnames(styles.mobileNumber)}>
      <select
        className={classnames(fieldStyles.fieldInput, fieldStyles['col-4'])}
        {...register('prefix', {
          validate: {
            phoneNumberComplete: () => {
              trigger(name);
            }
          }
        })}>
        <option value="" label=""></option>

        {countries.map(country => {
          const { country_id, phone_code } = country;
          return (
            <option key={country_id} value={phone_code} label={phone_code} />
          );
        })}
      </select>

      <div className={classnames(fieldStyles.fieldInput, fieldStyles['col-7'])}>
        <input
          placeholder="Mobile number"
          onKeyDown={e => {
            if (e.key !== 'Backspace' && !regex.ONLY_NUMBERS.test(e.key))
              e.preventDefault();
          }}
          {...register(name, {
            required: 'This field is required',
            validate: {
              phoneNumberComplete: () => {
                const values = getValues();
                let prefix = values.prefix;
                let phone = values[name];

                if (!prefix || !phone) return 'This field is required';
              }
            }
          })}
        />
      </div>
    </div>
  );
}
