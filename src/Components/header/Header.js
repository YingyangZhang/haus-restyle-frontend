import { React, useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header({setIsForm, user, setUser}) {
    const [isDropDownMenu, setIsDropDownMenu] = useState(false);
    const navigate = useNavigate();

    function hideDropDown() {
        setIsDropDownMenu(false)
    }

    function handleSignIn() {
        setIsForm(true);
        setIsDropDownMenu(false);
    }

    function handleLogOut() {
        localStorage.removeItem('jwt');
        setIsDropDownMenu(false);
        setUser([]);
        navigate('/');
    }

    function capitalizeString(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <div className='header-container'>
            <div className='nav-container flex-box'>
                <NavLink to='/' exact='true' className='header-logo'>HAUS</NavLink>

                <div className={`dropdown-menu-container flex-box grey-background ${isDropDownMenu ? 'show-dropdown' : ''}`}>
                    <ul className='dropdown-menu flex-box'>
                        <li onClick={hideDropDown}><NavLink to='/furnitures' exact='true'>Furnitures</NavLink></li>

                        {user.length === 0 ? 
                            <li onClick={handleSignIn}>
                                <p>Login</p>
                            </li>
                            :
                            <>
                                <li onClick={hideDropDown}>
                                    <NavLink to='/' exact='true'>Cart(1)</NavLink>
                                </li>

                                <li onClick={hideDropDown}>
                                    <NavLink to='/' exact='true'>
                                        {user.username && capitalizeString(user.username)}
                                    </NavLink>
                                </li>
                            </>
                        }
                        
                        <li className='dropdown-menu-logout flex-box' onClick={handleLogOut}> 
                            <p>Logout</p> 
                            <i className='bx bx-log-out' ></i> 
                        </li>
                    </ul>

                    <i className='bx bx-x' onClick={hideDropDown}></i>
                </div>

                <i className='bx bx-menu-alt-right' onClick={() => setIsDropDownMenu(true)}></i>
            </div>
        </div>
    )
}