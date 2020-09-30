import React, { FormEvent } from 'react';

import config from '../../data/config';
import CheckboxButton from '../CheckboxButton/CheckboxButton';
import Dropdown from '../Dropdown/Dropdown';
import TextField from '../TextField/TextField';

import './form-edit.sass';

const FormEdit = (props: IFormEditProps): JSX.Element => {
  const {
    id = -1,
    birthday = '',
    isArchive = false,
    name = '',
    phone = '',
    role = config.defaultRole,
  } = props.employeeInfo || {};

  const { onSubmit = null } = props;

  const roles = config.filters.dropdowns[0].items;

  const checkName = (userName: string): boolean => {
    const words = userName.trim().split(' ').filter((word) => word.length);
    return words.every((word) => word.length) && words.length === 2;
  };

  const checkBirthday = (birthdayValue: string): boolean => (
    /\d\d\.\d\d.\d{4}/.test(birthdayValue)
  );

  const checkPhone = (phoneValue: string): boolean => (
    /\+\d \(\d{3}\) \d{3}-\d{4}/.test(phoneValue)
  );

  const [state, setState] = React.useState({
    birthday,
    isArchive,
    name,
    phone,
    role,
    isNameCorrect: checkName(name),
    isBirthdayCorrect: checkBirthday(birthday),
    isPhoneCorrect: checkPhone(phone),
  });

  const handleUserNameInput = (value: string): void => {
    setState({ ...state, name: value, isNameCorrect: checkName(value) });
  };

  const handlePhoneInput = (value: string): void => {
    setState({ ...state, phone: value, isPhoneCorrect: checkPhone(value) });
  };

  const handleBirthdayInput = (value: string): void => {
    setState({ ...state, birthday: value, isBirthdayCorrect: checkBirthday(value) });
  };

  const handleOnSelect = (_: string, value: string): void => {
    setState({ ...state, role: value });
  };

  const handleToggle = (_: string, checked: boolean): void => {
    setState({ ...state, isArchive: checked });
  };

  const handleSubmit = (ev: FormEvent<HTMLFormElement>): void => {
    ev.preventDefault();

    const isBirthdayCorrect = checkBirthday(state.birthday);
    const isPhoneCorrect = checkPhone(state.phone);
    const isNameCorrect = checkName(state.name);

    const fieldsIsCorrect = isBirthdayCorrect && isNameCorrect && isPhoneCorrect;

    if (fieldsIsCorrect && onSubmit) {
      onSubmit({
        id,
        birthday: state.birthday,
        isArchive: state.isArchive,
        name: state.name,
        phone: state.phone,
        role: state.role,
      });
    }

    setState({
      ...state,
      isBirthdayCorrect,
      isPhoneCorrect,
      isNameCorrect,
    });
  };

  return (
    <form className='form-edit' onSubmit={ handleSubmit }>
      <div className="form-edit__item">
        <div className="form-edit__name">
          <TextField
            name='user-name'
            placeholder='Имя и фамилия'
            value={ state.name }
            onInput={ handleUserNameInput }
            theme={ state.isNameCorrect ? '' : 'incorrect-value' }
          />
        </div>
      </div>
      <div className="form-edit__item">
        <div className="form-edit__phone">
          <TextField
            name='phone'
            mask='+0 (000) 000-0000'
            value={ state.phone }
            onInput={ handlePhoneInput }
            theme={ state.isPhoneCorrect ? '' : 'incorrect-value' }
          />
        </div>
      </div>
      <div className="form-edit__item">
        <div className="form-edit__birthday">
          <TextField
            name='birthday'
            mask='00.00.0000'
            value={ state.birthday }
            onInput={ handleBirthdayInput }
            theme={ state.isBirthdayCorrect ? '' : 'incorrect-value' }
          />
        </div>
      </div>
      <div className="form-edit__item">
        <div className="form-edit__role">
          <Dropdown name='role' title='Должность' items={ roles } role={ state.role } onSelect={ handleOnSelect } />
        </div>
      </div>
      <div className="form-edit__item">
        <div className="form-edit__is-archive">
          <CheckboxButton text='В архиве' value='in-archive' checked={ state.isArchive } onToggle={ handleToggle } />
        </div>
      </div>
      <div className="form-edit__item">
        <button className="form-edit__save-button">Сохранить</button>
      </div>
    </form>
  );
};

export default FormEdit;
