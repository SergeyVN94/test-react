import React, { useState } from 'react';
import { block } from 'bem-cn';
import {
  Button,
  FormControlLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@material-ui/core';

import { Role } from '../../store/filters/types';

import { IEmployeeInfo } from '../../store/employees/types';
import MaskedTextField from './components/MaskedTextField/MaskedTextField';
import './FormEmployee.sass';

interface IFormEmployeeProps {
  info?: IEmployeeInfo;
  onSubmit: (info: IEmployeeInfo) => void;
}

interface IFormState {
  name: string;
  isArchive: boolean;
  role: Role;
  phone: string;
  birthday: string;
}

const b = block('form-employee');

const dateToString = (date: Date): string => (
  [
    date.getDate().toString().padStart(2, '0'),
    (date.getMonth() + 1).toString().padStart(2, '0'),
    date.getFullYear(),
  ].join('.')
);

const stringToDate = (dateAsStr: string): Date => {
  const [day, month, year] = dateAsStr.split('.').map((i) => parseInt(i, 10));
  return new Date(year, month - 1, day);
};

const isValidBirthday = (birthday: string): boolean => {
  if (!/\d{2}\.\d{2}\.\d{4}/.test(birthday)) return false;

  const [day, month, year] = birthday.split('.').map((i) => parseInt(i, 10));
  const tmpDate = new Date(year, month - 1, day);

  return (tmpDate.getDate() === day && tmpDate.getMonth() + 1 === month
  && tmpDate.getFullYear() === year);
};

const masks = {
  phone: '+7 (999) 999-9999',
  birthday: '99.99.9999',
};

const FormEmployee: React.FC<IFormEmployeeProps> = ({ info, onSubmit }) => {
  const [formState, setFormState] = useState<IFormState>(() => ({
    name: info ? info.name : '',
    phone: info ? info.phone : '',
    role: info ? info.role : 'cook',
    isArchive: info ? info.isArchive : false,
    birthday: info ? dateToString(info.birthday) : '',
  }));
  const [errorsValidate, setErrorsValidate] = useState(() => ({
    name: '',
    phone: '',
    birthday: '',
  }));

  const handleSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault();

    const newErrorsValidate = {
      birthday: isValidBirthday(formState.birthday) ? '' : 'Некорректная дата!',
      phone: /\+7 \(\d{3}\) \d{3}-\d{4}/.test(formState.phone) ? '' : 'Некорректный номер телефона!',
      name: formState.name.length === 0 ? 'Необходимо указать имя!' : '',
    };

    const isFormValid = (Object.keys(newErrorsValidate) as (keyof typeof newErrorsValidate)[])
      .every((key) => newErrorsValidate[key].length === 0);

    if (isFormValid) {
      onSubmit({
        ...formState,
        id: info ? info.id : -1,
        birthday: stringToDate(formState.birthday),
      });
    }

    setErrorsValidate(newErrorsValidate);
  };

  const handleCheckboxChange = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean): void => {
    setFormState((prev) => ({
      ...prev,
      isArchive: checked,
    }));
  };

  const handleSelectChange = (ev: React.ChangeEvent<{
    name?: string | undefined;
    value: Role;
  }>): void => {
    setFormState((prev) => ({
      ...prev,
      role: ev.target.value,
    }));
  };

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = ev.target;

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className={b()} onSubmit={handleSubmit}>
      <div className={b('row')}>
        <TextField
          label="Имя"
          name="name"
          value={formState.name}
          fullWidth
          onChange={handleInputChange}
          error={Boolean(errorsValidate.name)}
          helperText={errorsValidate.name}
        />
      </div>
      <div className={b('row')}>
        <MaskedTextField
          value={formState.phone}
          type="tel"
          label="Телефон"
          name="phone"
          placeholder="+7 (___) ___-____"
          mask={masks.phone}
          onChange={handleInputChange}
          errorMessage={errorsValidate.phone}
        />
      </div>
      <div className={b('row')}>
        <MaskedTextField
          value={formState.birthday}
          label="Дата рождения"
          name="birthday"
          placeholder="ДД.ММ.ГГГГ"
          mask={masks.birthday}
          onChange={handleInputChange}
          errorMessage={errorsValidate.birthday}
        />
      </div>
      <div className={b('row')}>
        <Select id="select" label="Должность" value={formState.role} onChange={handleSelectChange} >
          <MenuItem value="cook">Повар</MenuItem>
          <MenuItem value="driver">Водитель</MenuItem>
          <MenuItem value="waiter">Официант</MenuItem>
        </Select>
      </div>
      <div className={b('row')}>
        <FormControlLabel
          label="в архиве"
          control={<Switch
            value="in-archive"
            checked={formState.isArchive}
            onChange={handleCheckboxChange}
          />}
        />
      </div>
      <div className={b('row')}>
        <Button type="submit" variant="contained" color="secondary">Сохранить</Button>
      </div>
    </form>
  );
};

export default FormEmployee;
