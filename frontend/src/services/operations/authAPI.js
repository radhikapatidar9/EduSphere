
import { useDispatch } from "react-redux";
import { setLoading } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";
import {toast} from 'react-hot-toast';
import { endpoints } from "../apis";

// const dispatch = useDispatch();

export function getPasswordResetToken(email, setEmailSent) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try {

            const response = await apiConnector("POST", endpoints.RESETPASSTOKEN_API, {email});

            console.log("reset pass token response..", response);

            if(!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Reset Email Sent");
            setEmailSent(true);

        } catch(err) {
            console.log("reset password token error",err);
            toast.error("Failed to send email for resetting password")
        }
        dispatch(setLoading(false));
    }
}

export function resetPassword(password, confirmPassword, token) {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try {

            const response = await apiConnector("POST", endpoints.RESETPASSWORD_API, {password, confirmPassword, token});
            console.log("RESET PASSWORD RESPONSE :", response);
            if(!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Password has been reset Successfully!");

        } catch(err) {
            console.log("error in reset password", err);
            toast.error("Failed to  reset password")
        }
        dispatch(setLoading(false));
    }
}