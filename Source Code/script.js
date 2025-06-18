document.addEventListener('DOMContentLoaded', () => {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');

    const showSignUpBtn = document.getElementById('showSignUpBtn');
    const showSignInBtn = document.getElementById('showSignInBtn');

    function isValidEmail(email) {
      return /^[\\w-.]+@[\\w-]+\\.[a-z]{2,}$/i.test(email);
    }
    function clearErrors(form) {
      const errors = form.querySelectorAll('.field-error');
      errors.forEach(el => (el.textContent = ''));
    }

    function validateSignIn() {
      clearErrors(signInForm);
      let valid = true;
      const email = signInForm.signInEmail.value.trim();
      const password = signInForm.signInPassword.value;
      if (!email) {
        signInForm.signInEmailError.textContent = 'Email is required.';
        valid = false;
      } else if (!isValidEmail(email)) {
        signInForm.signInEmailError.textContent = 'Invalid email format.';
        valid = false;
      }
      if (!password) {
        signInForm.signInPasswordError.textContent = 'Password is required.';
        valid = false;
      } else if (password.length < 6) {
        signInForm.signInPasswordError.textContent = 'Password must be at least 6 characters.';
        valid = false;
      }
      return valid;
    }
    function validateSignUp() {
      clearErrors(signUpForm);
      let valid = true;
      const name = signUpForm.signUpName.value.trim();
      const email = signUpForm.signUpEmail.value.trim();
      const password = signUpForm.signUpPassword.value;
      if (!name) {
        signUpForm.signUpNameError.textContent = 'Name is required.';
        valid = false;
      } else if (name.length < 2) {
        signUpForm.signUpNameError.textContent = 'Name must be at least 2 characters.';
        valid = false;
      }
      if (!email) {
        signUpForm.signUpEmailError.textContent = 'Email is required.';
        valid = false;
      } else if (!isValidEmail(email)) {
        signUpForm.signUpEmailError.textContent = 'Invalid email format.';
        valid = false;
      }
      if (!password) {
        signUpForm.signUpPasswordError.textContent = 'Password is required.';
        valid = false;
      } else if (password.length < 6) {
        signUpForm.signUpPasswordError.textContent = 'Password must be at least 6 characters.';
        valid = false;
      }
      return valid;
    }

    signInForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (validateSignIn()) {
        const btn = signInForm.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = "Signing in...";
        await new Promise(resolve => setTimeout(resolve, 1500));
        btn.disabled = false;
        btn.textContent = "Sign In";
        signInForm.reset();
      }
    });

    signUpForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (validateSignUp()) {
        const btn = signUpForm.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = "Creating account...";
        await new Promise(resolve => setTimeout(resolve, 1500));
        btn.disabled = false;
        btn.textContent = "Sign Up";
        signUpForm.reset();
        showSignIn();
      }
    });

    function showSignUp() {
      console.log('Switching to sign up form.');
      signInForm.classList.add('hidden');
      signInForm.classList.remove('visible');
      signInForm.setAttribute('aria-hidden', 'true');
      signUpForm.classList.remove('hidden');
      signUpForm.classList.add('visible');
      signUpForm.setAttribute('aria-hidden', 'false');
      signUpForm.querySelector('input').focus();
      showSignUpBtn.setAttribute('aria-expanded', 'true');
      showSignInBtn.setAttribute('aria-expanded', 'false');
    }

    function showSignIn() {
      console.log('Switching to sign in form.');
      signUpForm.classList.add('hidden');
      signUpForm.classList.remove('visible');
      signUpForm.setAttribute('aria-hidden', 'true');
      signInForm.classList.remove('hidden');
      signInForm.classList.add('visible');
      signInForm.setAttribute('aria-hidden', 'false');
      signInForm.querySelector('input').focus();
      showSignUpBtn.setAttribute('aria-expanded', 'false');
      showSignInBtn.setAttribute('aria-expanded', 'true');
    }

    showSignUpBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSignUp();
    });
    showSignInBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showSignIn();
    });

    showSignUpBtn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showSignUp();
      }
    });
    showSignInBtn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showSignIn();
      }
    });

    signInForm.querySelector('input').focus();
  });