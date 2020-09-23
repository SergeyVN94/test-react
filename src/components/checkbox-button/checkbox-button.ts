/* eslint-disable @typescript-eslint/unbound-method */
// eslint-disable-next-line import/no-extraneous-dependencies
import { boundMethod } from 'autobind-decorator';

type ClickCallback = (value: string, text: string, checked: boolean) => void;

class Checkbox {
  private checkbox: Element;

  private input: HTMLInputElement;

  private text: string;

  private callback: ClickCallback;

  constructor(selectorOrElement: string | Element) {
    this.callback = null;
    this.init(selectorOrElement);
  }

  public onClick(callback: (value: string, text: string, checked: boolean) => void): void {
    this.callback = callback;
  }

  public getState(): {
    value: string;
    text: string;
    checked: boolean;
  } {
    return {
      text: this.text,
      value: this.input.value,
      checked: this.input.checked,
    };
  }

  private init(selectorOrElement: string | Element): void {
    this.checkbox = typeof selectorOrElement === 'string'
      ? document.querySelector(selectorOrElement)
      : selectorOrElement;

    this.input = this.checkbox.querySelector('.checkbox-button__input');
    this.text = this.checkbox.querySelector('.checkbox-button__text').innerHTML;

    this.checkbox.addEventListener('click', this.handleClick);
  }

  @boundMethod
  private handleClick(ev: MouseEvent): void {
    const isTargetInput = (ev.target as Element).classList.contains('checkbox-button__input');
    if (
      this.callback
      && isTargetInput
    ) this.callback(this.input.value, this.text, this.input.checked);
  }
}

export default Checkbox;
