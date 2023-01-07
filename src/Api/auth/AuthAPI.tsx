import axios from "axios";
import { smsAxiosInstanceCreator, smsOriginalInstance } from "../../utils/AxiosIntance"

type APISchools = {
    domains : {domain : string}[];
    name : string;
}

type LoginResponse = {
    code : number,
    content : BaseUser | null;
}

export const login = async (username: string , password : string) => {

    const identifiers = username.split('.')

    const school = identifiers[0]
    const name =  identifiers[1]

    const schoolAPI =  await smsOriginalInstance.get(`api/schools/${school}`)
    .then((response) => {
        return response.data as APISchools
    })
    .catch((error) => {
        console.log("login error", error)
        return null
    })
    
    if(!schoolAPI) {
        return {code : 300 , content : null}
    }
    if(schoolAPI.domains.length <= 0) {
        return {code : 300 , content : null}
    }
    const schoolBaseUrl = `https://${schoolAPI.domains[0].domain}`
    const smsAxiosInstance =  smsAxiosInstanceCreator(schoolBaseUrl)

    type LogKeys = {
        username: string;
        password : string;
        grant_type: string;
        client_id: string;
        client_secret: string;
    }

    const logData : LogKeys = {
        username : name,
        password,
        grant_type: 'password',
        client_id: process.env.REACT_APP_SMS_CLIENT_ID ?? "",
        client_secret: process.env.REACT_APP_SMS_CLIENT_SECRET ?? "",
    }
    const logDataNew = Object.keys(logData)
    .map((key) => {
        const newKey = key as "username" | "password" | "grant_type" | "client_id" | "client_secret"
        return `${key}=${encodeURIComponent(logData[newKey])}`;
    })
    .join('&');


    const smsLogin = await smsAxiosInstance.post("o/token/",logDataNew,{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*'
        }
    })
    .then((res) => {
       return res.data as BaseUser
    })
    .catch((err) => {
        return null
    })

    if(smsLogin === null) {
        return {code : 300 , content : null}
    };

    const userRoles = await smsAxiosInstance.get('api/me/roles', {
        headers: {
            'Authorization': `Bearer ${smsLogin.access_token}`,
            'Content-Type': 'applicaton/json'
        }
    })
    .then((res) => {
        return res.data as "Teacher" | "Student"
    })
    .catch((err) => {
        return null
    })
    if(userRoles === null) {
        return {code : 300 , content : null}
    }
    if(userRoles.length <= 0) {
        return {code : 300 , content : null}
    }
    const userRole = userRoles[0];

    const userInfo = await smsAxiosInstance.get(`api/${userRole.toLowerCase()}/me`, {
        headers: {
            'Authorization': `Bearer ${smsLogin.access_token}`,
            'Content-Type': 'applicaton/json'
        }
    })
    .then((res) => {
        if(userRole === "Teacher")
            return res.data as TeacherUser
        if(userRole === "Student")
            return res.data as StudentUser
        return null
    })
    .catch((err) => {
        return null
    })

    if(userInfo === null) return {code : 300 , content : null}
    const processLogData = {
        ...smsLogin,
        ...(userRole === "Teacher" ? {
            type : "Teacher" as "Teacher" | "Student",
            userInfo : userInfo as TeacherUser,
        } : {
            type :  "Student" as "Teacher" | "Student",
            userInfo : userInfo as StudentUser,
        }),
    };


    return {code : 200, content : processLogData}
}

// export const BASE_URL = 'http://localhost:1337/';
export const BASE_URL = "https://lms-backend.sandboxprosolutions.com";

export const getTeacherSubjects = async () => {
    
    await axios.get(`${BASE_URL}/section-subject-assessments`)
        .then((res) => {
            console.log("SSA",res)
        })
        .catch((err) => {
            console.log("ERR",err)
        })

    // console.log(schoolBaseUrl)
    
}
export interface BaseUser {
    access_token : string,
    expires_in : number,
    first_name : string,
    id : number,
    initial : string,
    is_cashier : boolean,
    is_head : boolean,
    last_name : string,
    // password : string,
    refresh_token : string,
    school : string,
    scope : string,
    token_type : "Bearer",
    username : string,
    type :"Teacher" | "Student",
    userInfo : TeacherUser | StudentUser,
  }

  interface TeacherUser {
    designation : {name : string}
    employee_no : string,
    first_name : string,
    id : string,
    last_name : string,
    middle_name : string,
    picture : string | null,
    tenant : string,
    user_id : number,
  }

  interface StudentUser {
    id : string,
    student : {
      first_name : string,
      gender : string,
      id : string,
      last_name : string,
      middle_name :string,
      picture : string | null,
      student_no : string,
      user_id : string,
    }
  }