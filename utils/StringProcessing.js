exports.validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.validateCCCD = (str) => {
  const cccdRegex = /^[0-9]{12}$/;
  return cccdRegex.test(str);
};

exports.validatePassword = (password) => {
  const minLength = 6;
  const upperCase = /[A-Z]/;
  const lowerCase = /[a-z]/;
  const number = /[0-9]/;
  const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

  if (password.length < minLength) {
    return false;
  }

  if (!upperCase.test(password)) {
    return false;
  }

  if (!lowerCase.test(password)) {
    return false;
  }

  if (!number.test(password)) {
    return false;
  }

  if (!specialChar.test(password)) {
    return false;
  }

  return true;
};
