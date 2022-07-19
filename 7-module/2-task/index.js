import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = this.init();
    this.modalTitle = this.elem.querySelector('.modal__title');
    this.modalBody = this.elem.querySelector('.modal__body');
    this.bodyElement = document.querySelector('body');
    this.modalCloseButton = this.elem.querySelector('.modal__close');
    this.modalCloseButton.addEventListener('click', () => this.close());
    this.close();
    this.closeEsc();
  }

  init() {
    return createElement(`
      <div class="modal">
          <!--Прозрачная подложка перекрывающая интерфейс-->
          <div class="modal__overlay"></div>

          <div class="modal__inner">
            <div class="modal__header">
              <!--Кнопка закрытия модального окна-->
              <button type="button" class="modal__close">
                <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
              </button>

              <h3 class="modal__title"></h3>
            </div>

            <div class="modal__body"></div>
          </div>
        </div>
    `);
  }

  open() {
    document.body.classList.add('is-modal-open');
    this.bodyElement.append(this.elem);
    this.bodyElement.classList.add('is-modal-open');
  }

  setTitle(title) {
    this.modalTitle.innerHTML = title;
  }

  setBody(body) {
    this.modalBody.innerHTML = '';
    this.modalBody.prepend(body);
  }

  close() {
    this.elem.remove();
    this.bodyElement.classList.remove('is-modal-open');
  }

  closeEsc() {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        this.elem.remove();
        this.bodyElement.classList.remove('is-modal-open');
      }
    });
  }
}
