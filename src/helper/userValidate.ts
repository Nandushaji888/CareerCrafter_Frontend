interface FormData {
  name: string;
  email: string;
  phone: string;
  aboutYou: string;
  dateOfBirth: string;
  resume: File | null;
  qualification: string;
  skills: string;
  profilePic: string;
  location: string;
  secondarySkills: string;
  experience: string;
  status: boolean | undefined
}

export const validate = (formData: FormData) => {
  switch (true) {
    case !formData?.aboutYou:
      return { isValid: false, errorMessage: "About You required...!!!" };
    case !formData?.dateOfBirth:
      return { isValid: false, errorMessage: "Date of Birth is required...!!!" };
    case !formData?.qualification:
      return { isValid: false, errorMessage: "Qualification required...!!!" };
    case !formData?.skills:
      return { isValid: false, errorMessage: "Skills required...!!!" };
    default:
      return { isValid: true, errorMessage: "" };
  }
};

