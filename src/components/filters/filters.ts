/* eslint-disable @typescript-eslint/unbound-method */
// eslint-disable-next-line import/no-extraneous-dependencies
import { boundMethod } from 'autobind-decorator';

import Dropdown from '../dropdown/dropdown';
import Checkbox from '../checkbox-button/checkbox-button';
import './filters.sass';
import RadioButton from '../radio-button/radio-button';

class Filters {
  private readonly filters: HTMLElement;

  private readonly stateComponents: IFiltersState;

  private changeEventCallback: ChangeEventCallback;

  constructor(filters: string | HTMLElement) {
    this.filters = typeof filters === 'string'
      ? document.querySelector(filters) as HTMLElement
      : filters;
    this.stateComponents = {};
    this.changeEventCallback = null;
    this.initComponents();
  }

  public onChange(callback: ChangeEventCallback): void {
    this.changeEventCallback = callback;
  }

  public getState(): IFiltersState {
    return this.stateComponents;
  }

  private initComponents(): void {
    Array.from(this.filters.querySelectorAll('.js-dropdown')).forEach((dropdownElement) => {
      const dropdown = new Dropdown(dropdownElement as HTMLElement);
      dropdown.onSelect(this.handleSelect);

      const { name, value } = dropdown.getState();
      this.stateComponents[name] = value;
    });

    Array.from(this.filters.querySelectorAll('.js-checkbox-button')).forEach((checkboxElement) => {
      const checkbox = new Checkbox(checkboxElement);
      checkbox.onClick(this.handleCheckboxClick);

      const { value, checked } = checkbox.getState();
      this.stateComponents[value] = checked;
    });

    Array.from(this.filters.querySelectorAll('.js-radio-button')).forEach((radioElement) => {
      const checkbox = new RadioButton(radioElement);
      checkbox.onClick(this.handleRadioClick);

      const { value, name, checked } = checkbox.getState();
      if (checked) this.stateComponents[name] = value;
    });
  }

  private triggerChangeEvent(): void {
    this.changeEventCallback(this.stateComponents);
  }

  @boundMethod
  private handleRadioClick(value: string, name: string): void {
    this.stateComponents[name] = value;
    this.triggerChangeEvent();
  }

  @boundMethod
  private handleCheckboxClick(value: string, checked: boolean): void {
    this.stateComponents[value] = checked;
    this.triggerChangeEvent();
  }

  @boundMethod
  private handleSelect(name: string, value: string): void {
    this.stateComponents[name] = value;
    this.triggerChangeEvent();
  }
}

export default Filters;
