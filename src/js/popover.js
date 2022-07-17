export default class Popover {
  constructor() {
    this.element = null; // элемент-кнопка, которую нажали
    this.popover = null; // Блок с подсказкой
    this.eventClick = this.eventClick.bind(this);
  }
}
