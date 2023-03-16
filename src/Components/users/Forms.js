import React, { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

export default function Forms({setIsForm, setUser}) {
    const [isSignUpForm, setIsSignUpForm] = useState(false);
    return (
        <div className='forms-container'>
            {isSignUpForm ? 
                <SignUp setIsForm={setIsForm} setIsSignUpForm={setIsSignUpForm} setUser={setUser} />
                : <SignIn setIsForm={setIsForm} setIsSignUpForm={setIsSignUpForm} setUser={setUser} />
            }           
        </div>
    )
}