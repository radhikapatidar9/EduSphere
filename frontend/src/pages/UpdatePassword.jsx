import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI.js";
import { Link } from "react-router-dom";

import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";

function UpdatePassword() {

    const {loading} = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const dispatch = useDispatch();
    const location = useLocation();

    const [formData, setFormData] = useState({
        password:"",
        confirmPassword:""
    })

    const handlerOnChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]: e.target.value
            }
        ))
    }

    const {password, confirmPassword} = formData

    const handlerOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token));
    }

    return ( 
        <div className="text-white">
            {
                loading ? (
                <div>Loading...</div>) : 
                (
                <div>
                    <h1>Choose new Password</h1>
                    <p>Almost done. Enter your new password and you are all set.</p>
                    <form onSubmit={handlerOnSubmit}>
                        <label>
                            <p>New Password*</p>
                            <input
                            type={showPassword ? "text" : "password"}
                            required
                            name="password"
                            value={password}
                            onChange={handlerOnChange}
                            placeholder="Password"
                            />
                            <span onClick={() => setShowPassword((prev) => !prev)}>
                                {
                                    showPassword ? (
                                        <AiFillEyeInvisible/>
                                    ) : (
                                        <AiFillEye/>
                                    )
                                }
                            </span>
                        </label>

                        <label>
                            <p>Confirm New Password*</p>
                            <input
                            type={showConfirmPass ? "text" : "password"}
                            required
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handlerOnChange}
                            placeholder="Confirm Password"
                            />
                            <span onClick={() => setShowConfirmPass((prev) => !prev)}>
                                {
                                    showConfirmPass ? (
                                        <AiFillEyeInvisible/>
                                    ) : (
                                        <AiFillEye/>
                                    )
                                }
                            </span>
                        </label>

                        <button type="submit">Reset Password</button>
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
export default UpdatePassword;