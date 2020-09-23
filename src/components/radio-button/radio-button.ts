/* eslint-disable @typescript-eslint/unbound-method */
// eslint-disable-next-line import/no-extraneous-dependencies
import { boundMethod } from 'autobind-decorator';

type ClickCallback = (value: string, name: string) => void;

class RadioButton {
  private radio: Element;

  private input: HTMLInputElement;

  private callback: ClickCallback;

  constructor(selectorOrElement: string | Element) {
    this.callback = null;
    this.init(selectorOrElement);
  }

  public onClick(callback: (value: string, name: string) => void): void {
    this.callback = callback;
  }

  public getState(): {
    value: string;
    name: string;
    checked: boolean;
  } {
    return {
      value: this.input.value,
      name: this.input.name,
      checked: this.input.checked,
    };
  }

  private init(selectorOrElement: string | Element): void {
    this.radio = typeof selectorOrElement === 'string'
      ? document.querySelector(selectorOrElement)
      : selectorOrElement;

    this.input = this.radio.querySelector('.radio-button__input');
    this.radio.addEventListener('click', this.handleClick);
  }

  @boundMethod
  private handleClick(ev: MouseEvent): void {
    const isTargetInput = (ev.target as Element).classList.contains('radio-button__input');
    if (
      this.callback
      && isTargetInput
    ) this.callback(this.input.value, this.input.name);
  }
}

export default RadioButton;
