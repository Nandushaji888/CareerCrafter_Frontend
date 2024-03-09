import { ObjectId } from 'mongoose';


export interface IUser {
    _id?:string;
    name: string;
    email: string;
    phone: string;
    password?: string;
    type?: AuthType;
    status: boolean;
    isGoogle?:boolean;
    dateOfBirth?:string;
    appliedJobs?:ObjectId;
    savedJobs?:ObjectId;
    aboutYou?:string;
    resume?:string;
    qualification?:string;
    skills?:string;
    profilePic?:string;
    createdOn?:Date;
    editedOn?:Date;
}


export interface IPost {
    _id?:string,
    postName: string;
    company: string;
    responsibilities?:string,
    jobDescription?:string,
    skillsRequired?:string,
    qualification?:string,
    salary?:string,
    category?:ObjectId,
    questions?:Question[],
    skills?:string,
    recruiterEmail:string,
    recruitingPlace:string,
    closingDate :string,
    workArrangementType?:WorkArrangementType,
    employmentType?:employmentType,  
    createdAt?:string;
    isListed?:boolean;
    isPremium?:boolean;
    recruiterId?:string;
    isRejected?:boolean;
}

interface Question {
    question: string;
    answer: string;
  }


  export interface IRecruiter {
    _id?: string;
    name?: string;
    email?: string;
    phone?: string;
    status?: boolean;
    worksAt?: string;
    profilePic?: string;
    createdOn?: Date;
    isPremium?:boolean;
  }
  



  export interface IApplication{
      _id?:string,
      name:string,
      email:string,
      phone:string,
      resume?:string,
      jobPostId?:string,
      createdOn:string,
      userId?:string,
      status:ApplicationType,
      questionAnswer?:IQuestion
  
  }
  
  export enum ApplicationType{
      Pending="pending",
      Accepted="accepted",
      Rejected="rejected",
  }
  
  export interface IQuestion {
      question: string;
      requiredAnswer: string;
      givenAnswer:string;
  }
  



/********************************************** */



export enum WorkArrangementType{
    Remote='remote',
    Hybrid='hybrid',
    Office='office'
}

export enum employmentType{
    Fulltime='fulltime',
    PartTime='parttime',
    Internship='internship'
}

export enum AuthType {
    User = 'user',
    Admin = 'admin',
    Recruiter = 'recruiter'
}

