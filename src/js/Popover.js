export default class Popover {
  constructor() {
    this.targetEement = null; // элемент-кнопка, которую нажали
    this.popover = null; // Блок с подсказкой
    this.eventClick = this.eventClick.bind(this);
  }

  init() {
    this.create();
    this.eventClick();
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

  eventClick() {
    document.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('js-popover')) {
        this.targetElement = e.target;
        this.popover.classList.add('_hide');
        this.insertText();
        this.positionsElement();
      }
    });
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

  positionsElement() {
    const elemOffset = this.targetElement.getBoundingClientRect();
    const popoverOffset = this.popover.getBoundingClientRect();
    const top = elemOffset.top - popoverOffset.height - 8;
    const left = elemOffset.left + elemOffset.width / 2 - popoverOffset.width / 2;
    this.popover.style.top = `${top}px`;
    this.popover.style.left = `${left}px`;
  }
}
