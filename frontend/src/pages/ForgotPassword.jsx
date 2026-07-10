import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import { getPasswordResetToken } from '../services/operations/authAPI.js';

// call inside login

function ForgotPassword() {

    const {loading} = useSelector((state) => state.auth);

    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const handlerOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    }

    return (
        <div className='text-white'>
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        <h1>
                            {
                                !emailSent ? "Reset your Password" : "Check Email"
                            }
                        </h1>

                        <p>
                            {
                                !emailSent
                                 ? `Have no fear. We will email you instructions to reset your password.
                                If you dont have access to your email we can try email recovery` :
                                 `We have sent the reset email to ${email}`
                            }
                        </p>

                        <form onSubmit={handlerOnSubmit}>
                            {
                                !emailSent && (
                                    <label>
                                        <p>Email Address*</p>
                                        <input
                                            required
                                            name='email'
                                            type='email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder='Set your Email Address'
                                        />
                                    </label>
                                )
                            }

                            <button type='submit'>
                                {
                                    !emailSent ? "Reset Password" : "Reset Email"
                                }
                            </button>
                        </form>

                        <div>
                            <Link to="/login">
                            <p>Back to Login</p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default ForgotPassword;