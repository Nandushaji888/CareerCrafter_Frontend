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
