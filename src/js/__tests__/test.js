/**
 * @jest-environment jsdom
 */

import Popover from '../POPOVER';

test('При клике на элемент с классом "js-popover" должно показываться окно с соответствующим текстом', () => {
  const popover = new Popover();
  popover.init();

  document.body.innerHTML = '<button type=\'button\' class="button button-red js-popover" data-popover-title="Кнопка-Запрет!" data-popover-text="При нажатии редактирование текста запрещено!">Красная кнопка</button>';
  const element = document.querySelector('.js-popover');
  const popoverBlock = popover.popover;
  element.click();
  const { popoverTitle, popoverText } = popover.targetElement.dataset;

  expect(popoverBlock.classList.contains('_hide')).toBeFalsy();
  expect(popoverTitle).toEqual('Кнопка-Запрет!');
  expect(popoverText).toEqual('При нажатии редактирование текста запрещено!');
});
