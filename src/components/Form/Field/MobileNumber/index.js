import { useState, useEffect } from 'react';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';
import * as fieldStyles from '../styles.module.scss';

//regex
import * as regex from '../../../../helpers/regex';

//services
import { getCountries } from '../../../../services/countries';

import DropDown from '../DropDown';

export default function MobileNumber({
  name,
  isSubmitted,
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

  useEffect(() => {
    getCountries().then(response => {
      setCountries(response);
    });
  }, []);

  return (
    <div className={classnames(styles.mobileNumber)}>
      <DropDown
        classes={fieldStyles['col-4']}
        items={countries}
        name="phoneCode"
        placeholder="+1"
        labelKey="country_id"
        valueKey="country_id"
        displayKey="phone_code"
        register={register}
        setValue={setValue}
        onOptionChanged={value => {
          let country = countries.find(c => c.country_id === value);

          setValue('country', country.country_id);
          setValue('prefix', country.phone_code);
          if (isSubmitted) trigger(name);
        }}
      />

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
