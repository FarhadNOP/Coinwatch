const form = document.getElementById('form');
const firstname_input = document.getElementById('firstname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const error_message = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let errors = [];


  errors = getSignupFormErrors(
    firstname_input.value,
    email_input.value,
    password_input.value,
    repeat_password_input.value
  );

  if (errors.length > 0) {

    error_message.innerText = errors.join('. ');
  } else {
 
    error_message.innerText = ''; 
    window.location.href = "index.html";
  }
});

function getSignupFormErrors(firstname, email, password, repeatPassword) {
  let errors = [];
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  if (firstname === '' || firstname == null) {
    errors.push('Firstname is required');
    firstname_input.parentElement.classList.add('incorrect');
  }
  if (email === '' || email == null) {
    errors.push('Email is required');
    email_input.parentElement.classList.add('incorrect');
  }
  if (password === '' || password == null) {
    errors.push('Password is required');
    password_input.parentElement.classList.add('incorrect');
  } else if (!passwordPattern.test(password)) {
    errors.push(
      'Password must be 8-15 characters long, include uppercase, lowercase, a number, and a special character (@.#$!%*?&)'
    );
    password_input.parentElement.classList.add('incorrect');
  }
  if (password !== repeatPassword) {
    errors.push('Password does not match repeated password');
    password_input.parentElement.classList.add('incorrect');
    repeat_password_input.parentElement.classList.add('incorrect');
  }

  return errors;
}

function getLoginFormErrors(email, password){
  let errors = []

  if(email === '' || email == null){
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  if(password === '' || password == null){
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }

  return errors;
}


const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(
  (input) => input != null
);

allInputs.forEach((input) => {
  input.addEventListener('input', () => {
    if (input.parentElement.classList.contains('incorrect')) {
      input.parentElement.classList.remove('incorrect');
      error_message.innerText = '';
    }
  });
});


