import { React, useState } from "react";

export default function SignIn({setIsForm, setIsSignUpForm, setUser}) {
    const [signInInput, setSignInInput] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);

    function handleInput(e) {
        const name = e.target.name;
        let value = e.target.value;

        setSignInInput({
            ...signInInput,
            [name]: value,
        })
    }

    function handleLogIn(e) {
        e.preventDefault();

        fetch('https://haus-db.onrender.com/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: signInInput,
            })
        })
        .then(r => {
            if (r.ok) {
                r.json().then(data => {
                    localStorage.setItem("jwt", data.jwt);
                    setUser(data.user);
                    setIsForm(false);
                })
            } else {
                r.json().then((error) => {
                    setError(error.message);
                })
            }
        })
    }

    return (
        <form className='form-container grey-background' onSubmit={handleLogIn}>
            <div className='form-header-container flex-box'>
                <h1>Login</h1>
                <i className='bx bx-x' onClick={() => setIsForm(false)}></i>
            </div>

            <div className='form-item-container'>
                <p>Username</p>
                <input type='text' placeholder='Enter username' name='username' onChange={handleInput} />
            </div>

            <div className='form-item-container'>
                <p>Password</p>
                <input type='password' placeholder='Enter password' name='password' onChange={handleInput} />
            </div>
            
            <div className='errors-container'>
                {error ? <p>* {error}</p> : null}
            </div>

            <div className='form-operations-container flex-box'>
                <button className='button' type='submit' > 
                    <p>Sign In</p>
                    <i className='bx bx-arrow-back' ></i>
                </button>
                
                <p className="back-to-signin" onClick={() => setIsSignUpForm(true)}>Sign Up</p>
            </div>
        </form>
    )
}