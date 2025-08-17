import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopup = ({ setShowLogin }) => {

    const { url, setToken } = useContext(StoreContext)

    const [currState, setCurrState] = useState("Login")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    console.log("LoginPopup rendered, setShowLogin:", setShowLogin)
    console.log("Current state:", currState)

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (event) => {
        event.preventDefault()
        console.log("Login attempt with data:", data)
        console.log("Current state:", currState)
        
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login"
        }
        else {
            newUrl += "/api/user/register"
        }

        try {
            const response = await axios.post(newUrl, data);
            console.log("Response:", response.data)

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false)
            }
            else {
                alert(response.data.message)
            }
        } catch (error) {
            console.error("Login error:", error)
            alert("An error occurred. Please try again.")
        }
    }

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            setShowLogin(false)
        }
    }

    const handleStateChange = (newState) => {
        console.log("Changing state from", currState, "to", newState)
        setCurrState(newState)
        setData({ name: "", email: "", password: "" })
    }

    return (
        <div className='login-popup' onClick={handleBackdropClick}>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img 
                        onClick={() => setShowLogin(false)} 
                        src={assets.cross_icon} 
                        alt="Close" 
                        className="close-icon"
                    />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : 
                        <input 
                            name='name' 
                            onChange={onChangeHandler} 
                            value={data.name} 
                            type="text" 
                            placeholder='Your name' 
                            required 
                            autoComplete="name"
                        />
                    }
                    <input 
                        name='email' 
                        onChange={onChangeHandler} 
                        value={data.email} 
                        type="email" 
                        placeholder='Your email' 
                        required 
                        autoComplete="email"
                    />
                    <input 
                        name='password' 
                        onChange={onChangeHandler} 
                        value={data.password} 
                        type="password" 
                        placeholder='Password' 
                        required 
                        autoComplete="current-password"
                    />
                </div>
                <button type='submit' className="submit-btn">
                    {currState === "Sign Up" ? "Create account" : "Login"}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" required id="terms-checkbox" />
                    <label htmlFor="terms-checkbox">
                        By continuing, i agree to the terms of use & privacy policy.
                    </label>
                </div>
                {currState === "Login"
                    ? <p className="switch-text">Create a new account? <span onClick={() => handleStateChange("Sign Up")}>Sign up here</span></p>
                    : <p className="switch-text">Already have an account ? <span onClick={() => handleStateChange("Login")}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup