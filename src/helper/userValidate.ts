import { IUser } from "../utils/interface/interface";

export const validate = (formData: IUser) => {
  if (!formData?.aboutYou) {
    return { isValid: false, errorMessage: "About You required...!!!" };
  } else if (!formData?.dateOfBirth) {
    return { isValid: false, errorMessage: "Date of Birth is required...!!!" };
  } else if (!formData?.qualification) {
    return { isValid: false, errorMessage: "Qualification required...!!!" };
  } else if (!formData?.skills) {
    return { isValid: false, errorMessage: "Skills required...!!!" };
  } 
  return { isValid: true, errorMessage: "" };
};
