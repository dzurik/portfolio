const form = document.querySelector('.form');
const hide = document.querySelector('.form__hide');
const message = document.querySelector('.form__msg');
const inputs = document.querySelectorAll('.form__input');
const icons = document.querySelectorAll('.form__icon');

// form submit

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let valid = validateContact();

  const formData = new FormData(this);
  const searchParams = new URLSearchParams();

  if (valid) {
    fetch(form.action, {
      method: 'post',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          inputs.forEach((input) => {
            input.value = '';
          });

          icons.forEach((icon) => {
            icon.style.display = 'none';
          });

          hide.classList.add('accepted');
        } else {
          hide.classList.add('declined');
        }

        return response.text();
      })
      .then((text) => {
        message.classList.remove('form__alert');
        message.innerHTML = text;

        setTimeout(function () {
          message.classList.add('form__alert');
          hide.classList.remove('accepted');
          hide.classList.remove('declined');
        }, 2500);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    message.classList.remove('form__alert');
    hide.classList.add('declined');
    message.innerHTML = 'Please complete the form and try again.';

    setTimeout(function () {
      message.classList.add('form__alert');
      hide.classList.remove('accepted');
      hide.classList.remove('declined');
    }, 2500);
  }
});

// form validate

const validateFalse = function (input) {
  input.style.borderBottom = '1px solid #a72a2a';

  const box = input.previousElementSibling;

  box.classList.remove('icon-checkmark');
  box.classList.add('icon-cross');
  box.style.display = 'block';
};

const validateTrue = function (input) {
  const box = input.previousElementSibling;

  box.classList.remove('icon-cross');
  box.classList.add('icon-checkmark');
  box.style.display = 'block';
};

const validateContact = function () {
  let valid, userValid, phoneValid, emailValid, subjectValid, messageValid;

  inputs.forEach((i) => {
    i.style.borderBottom = '1px solid #e1e1e1';
  });

  const userName = document.querySelector('#userName');
  const userPhone = document.querySelector('#userPhone');
  const userSubject = document.querySelector('#userSubject');
  const userEmail = document.querySelector('#userEmail');
  const userMessage = document.querySelector('#userMessage');

  if (!userName.value) {
    validateFalse(userName);
    userValid = false;
  } else {
    validateTrue(userName);
    userValid = true;
  }

  //let phonePattern = /^-?\d*\.?\d*$/;

  //if (!userPhone.value || !userPhone.value.match(phonePattern)) {
  if (!userPhone.value) {
    validateFalse(userPhone);
    phoneValid = false;
  } else {
    validateTrue(userPhone);
    phoneValid = true;
  }

  if (!userSubject.value) {
    validateFalse(userSubject);
    subjectValid = false;
  } else {
    validateTrue(userSubject);
    subjectValid = true;
  }

  let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailPattern.test(userEmail.value.toLowerCase())) {
    validateFalse(userEmail);
    emailValid = false;
  } else {
    validateTrue(userEmail);
    emailValid = true;
  }

  if (!userMessage.value) {
    validateFalse(userMessage);
    messageValid = false;
  } else {
    validateTrue(userMessage);
    messageValid = true;
  }

  !userValid || !phoneValid || !emailValid || !subjectValid || !messageValid
    ? (valid = false)
    : (valid = true);

  return valid;
};
