
import { smsOriginalInstance } from "../../utils/AxiosIntance";
type sectionType = {
    token : string
}

export const GetSectionAPI = async (token:sectionType) => {
        return await smsOriginalInstance.get('api/teacher/classes', {
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        })
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.log("section error" , error)
        })

}
