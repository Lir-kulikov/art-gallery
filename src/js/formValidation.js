import Bouncer from '../../node_modules/formbouncerjs/dist/bouncer.polyfills.min'

let validateAutorize;
const validateAutorizeInit = () => {
  validateAutorize = new Bouncer('.form-autorize', {
    disableSubmit: true,
    messageAfterField: true,
    messages: {
      missingValue: {
        default: 'Заполните поле'
      },
      patternMismatch: {
        email: 'Введите правильный e-mail',
        password: 'Введите не менее 6 символов'
      },
      wrongLength: {
        under: 'Введите не менее {minLength} символов.'
      }
    },
  });
}

let validateReg;
const validateRegInit = () => {
  validateReg = new Bouncer('.form-reg', {
    disableSubmit: true,
    messageAfterField: true,
    messages: {
      missingValue: {
        default: 'Заполните поле',
        checkbox: 'Заполните поле'
      },
      patternMismatch: {
        email: 'Неверный формат email',
        password: 'Введите не менее 6 символов'
      },
      wrongLength: {
        under: 'Введите не менее {minLength} символов.'
      },
    },
  });
}

let validateRes;
const validateResInit = () => {
  validateRes = new Bouncer('.form-res', {
    disableSubmit: true,
    messageAfterField: true,
    messages: {
      missingValue: {
        default: 'Заполните поле',
      },
      patternMismatch: {
        email: 'Неверный формат email',
        password: 'Введите не менее 6 символов'
      },
      wrongLength: {
        under: 'Введите не менее {minLength} символов.'
      },
    },
  });
}

validateAutorizeInit();
validateRegInit();
validateResInit();

// убирает отображение ошибки, если input пустой (отключается при неудачной попытке submit)

const autorizeForm = document.querySelector(".form-autorize");
const regForm = document.querySelector(".form-reg");
const resForm = document.querySelector(".form-res");

// document.addEventListener('bouncerShowError', function (event) {
// 	event.target.previousElementSibling.style.color = "var(--error)";
// }, false);

// document.addEventListener('bouncerRemoveError', function (event) {
// 	event.target.previousElementSibling.style.color = "var(--dark-3)";
// }, false);


const fixEmptyError = (form) => {
  let trySubmit = 0;
  for(let item of form.elements) {
    if(item.tagName == 'INPUT') {
      item.addEventListener('blur', () => {
        if(item.value == "" && trySubmit === 0) {
          item.classList.remove('error');
          item.nextElementSibling.parentNode.removeChild(item.nextElementSibling);
        }
      })
    }
  }
  form.addEventListener('bouncerFormInvalid', () => {
    trySubmit = 1;
  })
}
fixEmptyError(autorizeForm);
fixEmptyError(regForm);
fixEmptyError(resForm);

// очистка формы
const modalClose = document.querySelectorAll('[data-modal-close]');
const triggerNextModal = document.querySelectorAll('.js-next-modal')

// очистка авторизации

for (let item of modalClose) {
  item.addEventListener('click', (e) => {
    if (item === e.target) {
      for (let element of autorizeForm.elements) {
        if (element.tagName == 'INPUT') {
          element.value = "";
          validateAutorize.destroy();
          validateAutorizeInit();
        }
      }
    }
  }, true);
}

for (let item of triggerNextModal) {
  item.addEventListener('click', (e) => {
    if (item === e.target) {
      for (let element of autorizeForm.elements) {
        if (element.tagName == 'INPUT') {
          element.value = "";
          validateAutorize.destroy();
          validateAutorizeInit();
        }
      }
    }
  }, true);
}

// очистка регистрации

for (let item of modalClose) {
  item.addEventListener('click', (e) => {
    if (item === e.target) {
      for (let element of regForm.elements) {
        if (element.tagName == 'INPUT') {
          element.value = "";
          validateReg.destroy();
          validateRegInit();
        }
      }
    }
  }, true);
}

for (let item of triggerNextModal) {
  item.addEventListener('click', (e) => {
    if (item === e.target) {
      for (let element of regForm.elements) {
        if (element.tagName == 'INPUT') {
          element.value = "";
          validateReg.destroy();
          validateRegInit();
        }
      }
    }
  }, true);
}

// очистка сброса пароля

for (let item of modalClose) {
  item.addEventListener('click', (e) => {
    if (item === e.target) {
      for (let res of resForm.elements) {
        if (res.tagName == 'INPUT') {
          res.value = "";
          validateRes.destroy();
          validateResInit();
        }
      }
    }
  }, true);
}

for (let item of triggerNextModal) {
  item.addEventListener('click', (e) => {
    if (item === e.target) {
      for (let res of resForm.elements) {
        if (res.tagName == 'INPUT') {
          res.value = "";
          validateRes.destroy();
          validateResInit();
        }
      }
    }
  }, true);
}

resForm.addEventListener('bouncerFormValid', () => {
  document.querySelector('#modal-succes').classList.add('is-open');
  document.querySelector('#modal-succes').setAttribute('aria-hidden', 'false')
  document.querySelector('#modal-res').classList.remove('is-open');
  const modalSucces = document.querySelector('.modal-succes');
  const modalSuccesCloseBtns = modalSucces.querySelectorAll('[data-modal-close]');
  console.log(modalSuccesCloseBtns)

  for( let btn of modalSuccesCloseBtns) {
    btn.addEventListener('click', (e) => {
      if (btn === e.target) {
        document.querySelector('#modal-succes').classList.remove('is-open');
        document.querySelector('#modal-succes').setAttribute('aria-hidden', 'true')
      }
    })
  }
}, false);