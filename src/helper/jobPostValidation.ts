import { IPost } from "../utils/interface/interface";
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const validate = (formData: IPost) => {
  if (!formData.postName) {
    return { isValid: false, errorMessage: "Post Name required...!!!" };
  } else if (!formData.company) {
    return { isValid: false, errorMessage: "Company Name required...!!!" };
  } else if (!formData.responsibilities) {
    return { isValid: false, errorMessage: "Responsibilities required...!!!" };
  } else if (!formData.jobDescription) {
    return { isValid: false, errorMessage: "Job Description required...!!!" };
  }
  else if (!formData.skills) {
    return { isValid: false, errorMessage: "Skills required...!!!" };
  }
  else if (!formData.qualification) {
    return { isValid: false, errorMessage: "Qualification required...!!!" };
  } else if (!formData.recruiterEmail) {
    return { isValid: false, errorMessage: "Contact email required...!!!" };
  } else if (!emailRegex.test(formData?.recruiterEmail)) {
    return { isValid: false, errorMessage: "Invalid email address...!!!" };
  } else if (!formData.recruitingPlace) {
    return { isValid: false, errorMessage: "Recruiting place required...!!!" };
  } else if (Number(formData?.salary) < 0) {
    return {
      isValid: false,
      errorMessage: "Salary Cannot be a negative value...!!!",
    };
  } else if (!formData.closingDate) {
    return { isValid: false, errorMessage: "Job Closing date required...!!!" };
  } else if (new Date(formData.closingDate) <= new Date()) {
    return {
      isValid: false,
      errorMessage: "Closing date must be in the future...!!!",
    };
  } else if (!formData.workArrangementType) {
    return {
      isValid: false,
      errorMessage: "Work arrangement type required...!!!",
    };
  } else if (!formData.employmentType) {
    return { isValid: false, errorMessage: "Employment type required...!!!" };
  }
  return { isValid: true, errorMessage: "" };
};
