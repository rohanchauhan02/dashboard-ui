function Validation(values) {
  let errors = {};
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  if (!values.name) {
    errors.name = "Name is required";
  } else {
    errors.name = "";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Invalid email";
  } else {
    errors.email = "";
  }

  if (values.password.length < 6) {
    errors.password = "Password must be more than 6 characters";
  } else if (!values.password) {
    errors.password = "Password is required";
  } else if (!passwordRegex.test(values.password)) {
    errors.password = "Invalid password";
  } else {
    errors.password = "";
  }
  return errors;
}

export default Validation;
