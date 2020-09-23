/* eslint-disable @typescript-eslint/unbound-method */
// eslint-disable-next-line import/no-extraneous-dependencies
import { boundMethod } from 'autobind-decorator';

import './dropdown.sass';

interface IComponents {
  dropdown: HTMLElement;
  head: HTMLElement;
  headText: HTMLElement;
  items: HTMLElement[];
}

type SelectCallback = (name: string, value: string) => void;

const enum CLASSES {
  DROPDOWN = 'dropdown',
  DROPDOWN_EXPANDED = 'dropdown_expanded',
  HEAD = 'dropdown__head',
  HEAD_TEXT = 'dropdown__head-text',
  ITEM = 'dropdown__item',
  ITEM_TEXT = 'dropdown__item-text',
}

class Dropdown {
  private readonly components: IComponents;

  private currentItem: HTMLElement;

  private selectCallback: SelectCallback;

  constructor(selectorOrElement: string | HTMLElement) {
    this.components = Dropdown.findComponents(
      typeof selectorOrElement === 'string'
        ? document.querySelector(selectorOrElement)
        : selectorOrElement,
    );
    this.initEventListeners();
    const [firstItem] = this.components.items;
    this.currentItem = firstItem;
    this.selectCallback = null;
  }

  public onSelect(callback: SelectCallback): void {
    this.selectCallback = callback;
  }

  public getState(): { name: string; value: string } {
    return {
      name: this.components.dropdown.dataset.name,
      value: this.currentItem.dataset.value,
    };
  }

  private static findComponents(dropdown: HTMLElement): IComponents {
    return {
      dropdown,
      head: dropdown.querySelector(`.js-${CLASSES.HEAD}`),
      headText: dropdown.querySelector(`.js-${CLASSES.HEAD_TEXT}`),
      items: Array.from(dropdown.querySelectorAll(`.js-${CLASSES.ITEM_TEXT}`)),
    };
  }

  private initEventListeners(): void {
    const { head, items } = this.components;

    head.addEventListener('click', this.handleHeadClick);
    items.forEach((item) => item.addEventListener('click', this.handleItemClick));
  }

  @boundMethod
  private handleHeadClick(): void {
    const { dropdown } = this.components;
    dropdown.classList.toggle(CLASSES.DROPDOWN_EXPANDED);
  }

  @boundMethod
  private handleItemClick(ev: MouseEvent): void {
    const { dropdown, headText } = this.components;
    dropdown.classList.toggle(CLASSES.DROPDOWN_EXPANDED);

    const target = ev.target as HTMLElement;
    headText.innerHTML = target.innerHTML;

    this.currentItem = target;

    this.selectCallback
      && target.dataset.value
      && this.selectCallback(
        dropdown.dataset.name,
        target.dataset.value,
      );
  }
}

export default Dropdown;
