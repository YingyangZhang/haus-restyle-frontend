import { React, useState} from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
    const [isDropDownMenu, setIsDropDownMenu] = useState(false);

    function hideDropDown() {
        setIsDropDownMenu(false)
    }

    return (
        <div className='header-container'>
            <div className='nav-container flex-box'>
                <h1>HAUS</h1>

                <div className={`dropdown-menu-container flex-box grey-background ${isDropDownMenu ? 'show-dropdown' : ''}`}>
                    <ul className='dropdown-menu flex-box'>
                        <li><NavLink to='/' exact='true' onClick={hideDropDown}>Furnitures</NavLink></li>
                        <li><NavLink to='/' exact='true' onClick={hideDropDown}>Cart(1)</NavLink></li>
                        <li><NavLink to='/' exact='true' onClick={hideDropDown}>Profile</NavLink></li>
                        <li className='dropdown-menu-logout flex-box' onClick={hideDropDown}> 
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