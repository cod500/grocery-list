import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/user-actions';
import jwtdecode from 'jwt-decode';

const Navbar = ({ signout }) => {
    const { open, setopen } = useState(false);

    const openMenu = () => {
        setopen(!open)
    };

    const token = localStorage.getItem("token");
    let user;
    if (token) {
        user = jwtdecode(token);
        console.log(user.user.uid)
    }
    return (
        <nav class="nav flex flex-wrap items-center justify-between px-4">
            <div class="flex flex-no-shrink items-center mr-6 py-3 text-grey-darkest">
                <img className="fill-current h-16 w-16 mr-2" src="/img/tally.png" />
                {user ? (<Link to="/lists"><span className="font-semibold text-xl tracking-tight">SMS-Grocery</span></Link>) : (
                    <Link to="/"><span className="font-semibold text-xl tracking-tight">SMS-Grocery</span></Link>
                )}
            </div>

            <input class="menu-btn hidden" type="checkbox" id="menu-btn" />
            <label class="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none" for="menu-btn">
                <span class="navicon bg-grey-darkest flex items-center relative"></span>
            </label>
            {token ? (
                <ul class="menu border-b md:border-none flex justify-end list-reset m-0 w-full md:w-auto">
                    <li class="border-t md:border-none">
                        <Link to="/lists" className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker">All Lists</Link>
                    </li>

                    <li class="border-t md:border-none">
                        <Link to="/add" class="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker">Create List</Link>
                    </li>

                    <li class="border-t md:border-none">
                        <Link to={`/profile/${user.user.uid}`} class="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker">Profile</Link>
                    </li>

                    <li class="border-t md:border-none">
                        <Link onClick={signout} to='/signout' class="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker">Sign Out</Link>
                    </li>

                </ul>
            ) : (
                    <ul class="menu border-b md:border-none flex justify-end list-reset m-0 w-full md:w-auto">

                        <li class="border-t md:border-none">
                            <Link to="/add" class="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker">Create List</Link>
                        </li>

                        <li class="border-t md:border-none">
                            <Link to='/login' class="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker">Sign in</Link>
                        </li>
                        <li class="border-t md:border-none">
                            <Link to='/signup' class="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker">Sign up</Link>
                        </li>

                    </ul>
                )}
        </nav>

    )
};
const mapDispatchToProps = (dispatch) => {
    return {
        signout: () => {
            dispatch(signOut())
        }
    };
};


export default connect(null, mapDispatchToProps)(Navbar);
