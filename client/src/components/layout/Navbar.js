import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/user-actions';
import jwtdecode from 'jwt-decode';

const Navbar = ({ signout }) => {
    const token = localStorage.getItem("token");
    let user;
    if (token) {
        user = jwtdecode(token);
        console.log(user.user.uid)
    }
    return (
        <nav className="nav flex flex-wrap items-center justify-between px-4">
            <div className="flex flex-no-shrink items-center mr-6 py-3 text-grey-darkest">
                <img className="fill-current h-16 w-16 mr-2" src="/img/tally.png" alt="list" />
                {user ? (<Link to="/lists"><span className="font-semibold text-xl tracking-tight">SMS-Grocery</span></Link>) : (
                    <Link to="/"><span className="font-semibold text-xl tracking-tight">SMS-Grocery</span></Link>
                )}
            </div>

            <input className="menu-btn hidden" type="checkbox" id="menu-btn" />
            <label className="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none" htmlFor="menu-btn">
                <span className="navicon bg-grey-darkest flex items-center relative"></span>
            </label>
            {token ? (
                <ul className="menu border-b md:border-none flex justify-end list-reset m-0 w-full md:w-auto">
                    <li className="border-t md:border-none">
                        <Link to="/lists" className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker">All Lists</Link>
                    </li>

                    <li className="border-t md:border-none">
                        <Link to="/add" className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker">Create List</Link>
                    </li>

                    <li className="border-t md:border-none">
                        <Link to={`/profile/${user.user.uid}`} className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker">Profile</Link>
                    </li>

                    <li className="border-t md:border-none">
                        <Link onClick={signout} to='/signout' className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker">Sign Out</Link>
                    </li>

                </ul>
            ) : (
                    <ul className="menu border-b md:border-none flex justify-end list-reset m-0 w-full md:w-auto">

                        <li className="border-t md:border-none">
                            <Link to="/add" className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker">Create List</Link>
                        </li>

                        <li className="border-t md:border-none">
                            <Link to='/login' className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker">Sign in</Link>
                        </li>
                        <li className="border-t md:border-none">
                            <Link to='/signup' className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker">Sign up</Link>
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
