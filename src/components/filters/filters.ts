/* eslint-disable @typescript-eslint/unbound-method */
// eslint-disable-next-line import/no-extraneous-dependencies
import { boundMethod } from 'autobind-decorator';

import Dropdown from '../dropdown/dropdown';
import Checkbox from '../checkbox-button/checkbox-button';
import './filters.sass';
import RadioButton from '../radio-button/radio-button';

interface IStateComponents {
  dropdown: {
    [index: string]: { text: string; value: string; };
  };
  checkbox: {
    [index: string]: { text: string; checked: boolean; };
  };
  radio: {
    [index: string]: { text: string; value: string; };
  };
}

type ChangeEventCallback = (state: IStateComponents) => void;

class Filters {
  private readonly filters: HTMLElement;

  private readonly stateComponents: IStateComponents;

  private changeEventCallback: ChangeEventCallback;

  constructor(filters: string | HTMLElement) {
    this.filters = typeof filters === 'string'
      ? document.querySelector(filters) as HTMLElement
      : filters;
    this.stateComponents = {
      checkbox: {},
      dropdown: {},
      radio: {},
    };
    this.changeEventCallback = null;
    this.initComponents();
  }

  public onChange(callback: ChangeEventCallback): void {
    this.changeEventCallback = callback;
  }

  public getState(): IStateComponents {
    return this.stateComponents;
  }

  private initComponents(): void {
    Array.from(this.filters.querySelectorAll('.js-dropdown')).forEach((dropdownElement) => {
      const dropdown = new Dropdown(dropdownElement as HTMLElement);
      dropdown.onSelect(this.handleSelect);

      const { name, text, value } = dropdown.getState();
      this.stateComponents.dropdown[name] = { text, value };
    });

    Array.from(this.filters.querySelectorAll('.js-checkbox-button')).forEach((checkboxElement) => {
      const checkbox = new Checkbox(checkboxElement);
      checkbox.onClick(this.handleCheckboxClick);

      const { text, value, checked } = checkbox.getState();
      this.stateComponents.checkbox[value] = { text, checked };
    });

    Array.from(this.filters.querySelectorAll('.js-radio-button')).forEach((radioElement) => {
      const checkbox = new RadioButton(radioElement);
      checkbox.onClick(this.handleRadioClick);

      const {
        text,
        value,
        name,
        checked,
      } = checkbox.getState();
      if (checked) this.stateComponents.radio[name] = { text, value };
    });
  }

  private triggerChangeEvent(): void {
    this.changeEventCallback(this.stateComponents);
  }

  @boundMethod
  private handleRadioClick(value: string, text: string, name: string): void {
    this.stateComponents.radio[name] = { value, text };
    this.triggerChangeEvent();
  }

  @boundMethod
  private handleCheckboxClick(value: string, text: string, checked: boolean): void {
    this.stateComponents.checkbox[value] = { text, checked };
    this.triggerChangeEvent();
  }

  @boundMethod
  private handleSelect(name: string, text: string, value: string): void {
    this.stateComponents.dropdown[name] = { text, value };
    this.triggerChangeEvent();
  }
}

export default Filters;
export { IStateComponents };
