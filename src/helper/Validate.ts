import toast from "react-hot-toast";

interface Errors {
  password?: string;
  name?: string;
  email?: string;
  phone?: string;
  worksAt?: string;
  confirm_pwd?: string;
  location?: string;
}

interface Values {
  password?: string;
  name?: string;
  email?: string;
  phone?: string;
  worksAt?: string;
  location?: string;
  confirm_pwd?: string;
}

/**validate Register form */
export const registerValidation = async (values: Values) => {
  const error: Errors = {};

  await Promise.all([
    nameVerify(error, values),
    passwordVerify(error, values),
    emailVerify(error, values),
    phoneVerify(error, values),
    locationVerify(error, values),
  ]);

  console.log("hereee");

  console.log("error", error);
  return error;
};
export const recruiterRegisterValidation = async (values: Values) => {
  const error: Errors = {};

  await Promise.all([
    nameVerify(error, values),
    passwordVerify(error, values),
    emailVerify(error, values),
    worksAtVerify(error, values),
    phoneVerify(error, values),
    locationVerify(error, values),
  ]);

  console.log("error111111", error);
  return error;
};

/****validate sign in form */
export const signinValidation = async (values: Values) => {
  const error: Errors = {};
  await Promise.all([
    emailVerify(error, values),
    passwordVerify(error, values),
  ]);
  console.log("error", error);
  return error;
};

export const emailValidation = async (values: Values) => {
  const error: Errors = {};

  emailVerify(error, values), console.log("error", error);
  return error;
};

export const passwordVerification = async (values: Values) => {
  const error: Errors = {};
  console.log(values);
  if (values.password !== values.confirm_pwd) {
    error.password = toast.error(
      "Password and Confirm Password should be same...!"
    );
  }

  passwordVerify(error, values), console.log("error", error);
  return error;
};
/****************************************************** */

const nameVerify = (error: Errors = {}, values: Values) => {
  const nameRegex = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

  if (!values.name) {
    error.name = toast.error("Name Required...!!");
  } else if (values.name?.trim() === "") {
    error.name = toast.error("Name Required...!!");
  } else if (!nameRegex.test(values.name.trim())) {
    error.name = toast.error("Invalid Name...!");
  }
  return error;
};

const locationVerify = (error: Errors = {}, values: Values) => {
  const nameRegex = /^[a-zA-Z0-9\s,''-]*$/;

  if (!values.name) {
    error.name = toast.error("Location Required...!!");
  } else if (values.name?.trim() === "") {
    error.name = toast.error("Location Required...!!");
  } else if (!nameRegex.test(values.name.trim())) {
    error.name = toast.error("Invalid Location...!");
  }
  return error;
};

const passwordVerify = (error: Errors = {}, values: Values) => {
  const specialChars = /[`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/;

  if (!values.password) {
    error.password = toast.error("Password Required...!");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Invalid Password...!");
  } else if (values.password.length < 4) {
    error.password = toast.error("Password must be more than 4 character long");
  } else if (values.password.length > 15) {
    error.password = toast.error(
      "Password cannot be more than 15 character long"
    );
  } else if (!specialChars.test(values.password)) {
    error.password = toast.error("Password must have special character");
  }
  return error;
  //   else if (values.password !== values.confirm_pwd) {
  //     error.password = toast.error(
  //       "Password and Confirm password should be same...!"
  //     );
  //   }
};

const emailVerify = (error: Errors = {}, values: Values) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!values.email) {
    error.email = toast.error("Email Required...!!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Invalid email address");
  } else if (!emailRegex.test(values.email)) {
    error.email = toast.error("Invaild email address...!");
  }
  return error;
};

const phoneVerify = (error: Errors = {}, values: Values) => {
  const phoneRegex = /^(?:\+91|0)?[7-9]\d{9}$/;

  if (!values.phone) {
    error.phone = toast.error("Phone Number Required...!!");
  } else if (values.phone.length !== 10) {
    error.phone = toast.error("Invalid Phone Number..!!");
  } else if (values.phone.includes(" ")) {
    error.phone = toast.error("Invalid Phone Number: Contains spaces");
  } else if (!phoneRegex.test(values.phone)) {
    error.phone = toast.error("Invalid Phone Number: Incorrect format");
  }

  return error;
};

const worksAtVerify = (error: Errors = {}, values: Values) => {
  if (!values.worksAt) {
    error.worksAt = toast.error("WorksAt Required...!!");
  } else if (values.name?.trim() === "") {
    error.worksAt = toast.error("WorksAt Required...!!");
  }
  return error;
};
