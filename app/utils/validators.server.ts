export const validateEmail = (email: string) => {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.length || !validRegex.test(email)) {
    return "Please enter a valid email address";
  }
};

export const validatePassword = (password: string) => {
  if (password.length < 5) {
    return "Please enter a password that is at least 5 characters long";
  }
};

export const validateName = (name: string) => {
  if (!name.length) return "Please enter a value";
};
