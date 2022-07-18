export default class Popover {
  constructor() {
    this.popover = null; // Блок с подсказкой
    this.targetElement = null; // Элемент, по которому кликнули и у которого надо вывести подсказку
    this.hangEventClick = this.hangEventClick.bind(this);
  }

  init() {
    this.create();
    this.hangEventClick();
  }

  create() {
    const popover = document.createElement('div');
    popover.classList.add('popover', '_hide');
    popover.innerHTML = `
      <div class="popover__arrow"></div>
      <div class="popover__content"></div>
    `;
    document.body.append(popover);
    this.popover = popover;
  }

  hangEventClick() {
    document.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('js-popover')) {
        this.targetElement = e.target;
        this.hide();
        this.insertText();
        this.positionsAboutElement();
        this.show();
        return;
      }
      this.hide();
    });
  }

  show() {
    this.popover.classList.remove('_hide');
  }

  hide() {
    this.popover.classList.add('_hide');
  }

  insertText() {
    let titleBlock = '';
    let textBlock = '';
    const title = this.targetElement.dataset.popoverTitle;
    const text = this.targetElement.dataset.popoverText;
    if (title) titleBlock = `<div class="popover__title">${title}</div>`;
    if (text) {
      textBlock = `<div class="popover__text">${text}</div>`;
      this.popover.querySelector('.popover__content').innerHTML = titleBlock + textBlock;
    }
  }

  positionsAboutElement() {
    const elemOffset = this.targetElement.getBoundingClientRect();
    const popoverOffset = this.popover.getBoundingClientRect();
    const top = elemOffset.top - popoverOffset.height - 8;
    const left = elemOffset.left + elemOffset.width / 2 - popoverOffset.width / 2;
    this.popover.style.top = `${top}px`;
    this.popover.style.left = `${left}px`;
  }
}
