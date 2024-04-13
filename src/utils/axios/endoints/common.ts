const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL

const USER_BASE_URL = import.meta.env.VITE_USER_BASE_URL
const POST_BASE_URL = import.meta.env.VITE_POST_BASE_URL

const APPLICATION_BASE_URL = import.meta.env.VITE_APPLICATION_BASE_URL
// const CHAT_BASE_URL = import.meta.env.



/*********AUTH-SERVICE ENDPOINTS */

//  user-actions

export const USER_SIGNUP_API = `${AUTH_BASE_URL}/user/signup`
export const USER_LOGIN_API = `${AUTH_BASE_URL}/user/login`
export const USER_SIGNUP_VERIFY_OTP_API = `${AUTH_BASE_URL}/user/verify-otp`
export const USER_RESEND_OTP_API = `${AUTH_BASE_URL}/user/resend-otp`
export const USER_FORGOT_PASS_API = `${AUTH_BASE_URL}/user/forgot-password`
export const USER_FORGOT_PASS_VERIFY_OTP_API = `${AUTH_BASE_URL}/user/otp-verify`
export const USER_NEW_PASS_API = `${AUTH_BASE_URL}/user/new-password`
export const USER_GOOGLE_AUTH_API = `${AUTH_BASE_URL}/user/google-auth`
export const USER_LOGOUT_API = `${AUTH_BASE_URL}/user/logout`
export const REFRESH_TOKEN_API = `${AUTH_BASE_URL}/user/refresh-token`


//recruiter-actions
export const RECRUITER_LOGIN_API = `${AUTH_BASE_URL}/recruiter/login`
export const RECRUITER_SIGNUP_API = `${AUTH_BASE_URL}/recruiter/signup`
export const RECRUITER_SIGNUP_VERIFY_OTP_API = `${AUTH_BASE_URL}/recruiter/verify-otp`
export const RECRUITER_LOGOUT_API = `${AUTH_BASE_URL}/recruiter/logout`

//admin-actions
export const ADMIN_LOGIN_API = `${AUTH_BASE_URL}/admin/login`
export const ADMIN_LOGOUT_API = `${AUTH_BASE_URL}/admin/logout`


/**************USER-SERVICE ENDPOINTS */


//user-actions

export const GET_USERDATA_API =`${USER_BASE_URL}`
export const UPDATE_USERDATA_API =`${USER_BASE_URL}/update-user`

//admin-actions

export const GET_ALL_USERS_API =`${USER_BASE_URL}/admin/get-all-users`
export const ADMIN_GET_USERDATA_API =`${USER_BASE_URL}/admin/user/:id`
export const CHANGE_USER_STATUS_API =`${USER_BASE_URL}/admin/user/change-user-status`



/************POST-SERVICE ENDPOINTS */

//user-actions

export const GET_JOB_DETAILS_API = `${POST_BASE_URL}/job-details`
export const LIST_JOBS_API = `${POST_BASE_URL}/list-jobs`

//recruiter-actions
export const RECRUITER_LIST_JOBS_API = `${POST_BASE_URL}/recruiter/list-jobs/:id`
export const CREATE_JOB_API = `${POST_BASE_URL}/recruiter/create-job-post`
export const RECRUITER_GET_JOB_DETAILS_API = `${POST_BASE_URL}/recruiter/job-details/:id`

//admin-actions
export const ADMIN_GET_JOB_DETAILS_API = `${POST_BASE_URL}/admin/job-details/:id`
export const PENDING_POST_COUNT_API = `${POST_BASE_URL}/admin/pending-post-count`
export const POST_STATUS_CHANGE_API = `${POST_BASE_URL}/admin/job-post-status-change`

/*********APPLICATION SERVICE ENDPOINTS */


//user-actions
export const CREATE_APPLICATION_API = `${APPLICATION_BASE_URL}/create-application`
export const CHECK_APPLICATION_STATUS= `${APPLICATION_BASE_URL}/get-application-status`

//recruiter-actions

export const GET_ALL_APPLICATIONS_API = `${APPLICATION_BASE_URL}/recruiter/get-all-applications/:id`
export const APPLICATION_DETAILS_API = `${APPLICATION_BASE_URL}/recruiter/application-details/:id`
export const CHANGE_APPLICATION_STATUS_API = `${APPLICATION_BASE_URL}/recruiter/change-application-status`





/**************CHAT SERVICE */




