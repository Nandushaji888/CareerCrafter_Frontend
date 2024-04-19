import { ObjectId } from 'mongoose';
import { ApplicationType, AuthType, WorkArrangementType, employmentType } from './enums';


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
    resume: File | null;
    qualification?:string;
    skills?:string;
    secondarySkills?:string;
    profilePic?:string;
    createdOn?:Date;
    editedOn?:Date;
    experience?:string
    location?: {
        locationName:string;
        type: 'Point';
        coordinates: [number, number]; // [longitude, latitude]
      };
      
    
    
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
    closingDate :string,
    workArrangementType?:WorkArrangementType,
    employmentType:employmentType,  
    createdAt:string;
    isListed?:boolean;
    isPremium?:boolean;
    recruiterId?:string;
    rejectedReason?:string;
    isRejected?:boolean;
    recruitingPlace:RecruitingPlace ;
    location?:string
}





export interface RecruitingPlace{
    locationName:string;
    type:string;
    coordinates: string[]
}
interface Question {
    question: string;
    answer: string;
  }


  export interface IRecruiter {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    status?: boolean;
    worksAt: string;
    profilePic?: string;
    createdOn?: Date;
    isPremium?:boolean;
  }
  export interface IAdmin {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    phone?:string;
    status?:boolean;
    type: AuthType;
}



  export interface IApplication{
      _id?:string,
      name:string,
      email:string,
      phone:string,
      resume?:File,
      jobPostId?:string,
      createdOn:string,
      userId?:string,
      postName?:string,
      company?:string,
      status:ApplicationType,
      questionAnswer?:IQuestion
  
  }
  
 
  
  export interface IQuestion {
      question: string;
      requiredAnswer: string;
      givenAnswer:string;
  }

 export interface RootState {
    persisted: {
       recruiter: {
         recruiterData: IRecruiter;
       };
       user: {
        userData: IUser;
      };
      admin:{
        adminData:IAdmin
      }
    };
   }
  



/********************************************** */






export interface IConversation {
    _id: string;
    participants: string[];
    messages: IMessage[];
    createdAt: Date;
    updatedAt: Date;
}

export interface IMessage {
    _id: string;
    senderId: string; 
    receiverId: string; 
    message:string;
    createdAt: Date;
    updatedAt: Date;
    readStatus:boolean;
}

export interface INotification {
    _id?:string
    userId?: string;
    readStatus?:boolean;
    message?: string;
    jobPostId:string;
    applicationId?:string;
    applicationStatus?:string;
    postStatus?:string;
    createdAt?:string
    updatedAt?:string
    rejectedReason?:string;
  }
