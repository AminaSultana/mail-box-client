import {createSlice} from "@reduxjs/toolkit"

const userEmail=localStorage.getItem("email")
const initialState = {
    email: [],
    unreadEmail:0,
}

const emailSlice = createSlice({
    name: "email",
    initialState:initialState,
    reducers:{
        getEmails(state,action){
            state.email=action.payload
        },
        unread(state){
            state.unreadEmail = state.unreadEmail+1;
        },
        updateUnread(state){
            state.unreadEmail = state.unreadEmail-1
        }
    }
})

export const fetchEmailFromDB=()=>{
    return async (dispatch)=>{
        const fetchRequest=async()=>{
            const response = await fetch(`https://mail-box-client-e7133-default-rtdb.firebaseio.com/${userEmail}.json`)
            if(!response.ok){
                throw new Error("Could not fetch mail")
            }
            const email = await response.json()
            if(email){
                let emailData=[];
                for(const key in email){
                    emailData.push({
                        emailId:key,
                        email: email[key].email,
                        emailAddress: email[key].emailAddress,
                        read: email[key].read
                    })
                }
                dispatch(emailActions.getEmails(emailData))
            }
        }
        try {
            fetchRequest()
        } catch (error) {
            console.log(error);
        }
    }
}

export const sendEmailToDB=(email)=>{
    return async ()=>{
        const sendRequest=async()=>{
           const response= await fetch(`https://mail-box-client-e7133-default-rtdb.firebaseio.com/${userEmail}.json`, {
                method: "POST",
                body: JSON.stringify(email),
                headers: {
                    "Content-Type": "application/json",
                  },
            })
            if(!response.ok){
                throw new Error("Could not send mail")
            }
        }
        try {
            sendRequest()
        } catch (error) {
            console.log("Error");
        }
    }
}

export const updateReadStatusToTrue=(email)=>{
    return async(dispatch)=>{
        const sendChangeRequest=async()=>{
            const response= await fetch(`https://mail-box-client-e7133-default-rtdb.firebaseio.com/${userEmail}/${email.emailId}.json`, {
                method: "PUT",
                body: JSON.stringify(email),
                headers: {
                    "Content-Type": "application/json",
                  },
            })
            if(!response.ok){
                throw new Error("Could not send mail")
            }
        }
        try {
            sendChangeRequest()
        } catch (error) {
            console.log(error);
        }
    }
}

export const emailActions = emailSlice.actions
export default emailSlice.reducer;