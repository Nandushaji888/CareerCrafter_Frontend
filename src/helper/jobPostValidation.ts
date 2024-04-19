import { employmentType } from "../utils/interface/enums";
import { IPost} from "../utils/interface/interface";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const validate = (formData: IPost) => {
  switch (true) {
    case !formData.postName:
      return { isValid: false, errorMessage: "Post Name required...!!!" };
    case !formData.company:
      return { isValid: false, errorMessage: "Company Name required...!!!" };
    case !formData.responsibilities:
      return { isValid: false, errorMessage: "Responsibilities required...!!!" };
    case !formData.jobDescription:
      return { isValid: false, errorMessage: "Job Description required...!!!" };
    case !formData.skills:
      return { isValid: false, errorMessage: "Skills required...!!!" };
    case !formData.qualification:
      return { isValid: false, errorMessage: "Qualification required...!!!" };
    case !formData.recruiterEmail:
      return { isValid: false, errorMessage: "Contact email required...!!!" };
    case !emailRegex.test(formData?.recruiterEmail):
      return { isValid: false, errorMessage: "Invalid email address...!!!" };
    case !formData.location:
      return { isValid: false, errorMessage: "Recruiting place required...!!!" };
    case Number(formData?.salary) < 0:
      return {
        isValid: false,
        errorMessage: "Salary Cannot be a negative value...!!!",
      };
    case !formData.closingDate:
      return { isValid: false, errorMessage: "Job Closing date required...!!!" };
    case new Date(formData.closingDate) <= new Date():
      return {
        isValid: false,
        errorMessage: "Closing date must be in the future...!!!",
      };
    case !formData.workArrangementType:
      return {
        isValid: false,
        errorMessage: "Work arrangement type required...!!!",
      };
      case !formData.employmentType || !Object.values(employmentType).includes(formData.employmentType):
        return { isValid: false, errorMessage: "Employment type required...!!!" };
    default:
      return { isValid: true, errorMessage: "" };
  }
};
