import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { signupUser } from '../../store/actions/user-actions';
import { useForm } from "react-hook-form";

function Signup({ isLoading, signup, signupError }) {
    const [value, setValue] = useState();
    const { register, handleSubmit, errors } = useForm({ mode: "onBlur" });
    const handleChange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = e => {
            setValue(e.target.result);
        };
        reader.readAsDataURL(file);

    }

    const onSubmit = (data) => {
        signup(data);
    };

    return (
        <Fragment>

            {isLoading ? (
                <span className="text-green-500 opacity-75 my-32 mx-auto flex items-center justify-center">
                    <i className="fas fa-circle-notch fa-spin fa-5x"></i>
                </span>
            ) : (
                    <div>
                        <div className="flex justify-center items-center mt-12 mb-12">
                            <form onSubmit={handleSubmit(onSubmit)} className=" p-8 w-full max-w-md bg-white-300 shadow-xl rounded overflow-hidden">
                                <p class="text-xl text-gray-600 text-center mb-8">Signing up allows you to save grocery lists to text at a later date!</p>
                                <div>
                                    <div className="mx-auto w-32 h-32 mb-2 border rounded-full relative bg-gray-100 mb-4 shadow-inset">
                                        <img
                                            id="image"
                                            className="w-full h-32 rounded-full"
                                            src={value || "/img/user.png"}
                                            alt="user"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
                                    <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold w-full p-8 lg:w-1/2">Sign up</h1>
                                </div>
                                <div className="p-6">
                                    <div className="w-full mb-6 px-2">
                                        <label className="block tracking-wider text-gray-700 text-xs font-bold mb-2" htmlFor="username">Username</label>
                                        <input name="username" className="appearance-none block w-full bg-gray-400 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="username" type="text" placeholder="Username"
                                            ref={register({
                                                required: { value: true, message: "Field is required" },
                                            })} />
                                        <p className="text-red-500 text-xs italic">Username is required</p>
                                    </div>
                                    <div className="mb-5">
                                        <label
                                            htmlFor="email"
                                            className="font-bold mb-1 text-gray-700 block"
                                        >
                                            Email
                    </label>
                                        <input
                                            name="email"
                                            type="email"
                                            className={
                                                errors.email
                                                    ? "w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium border border-red-500"
                                                    : "w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                                            }
                                            placeholder="Enter your email address..."
                                            ref={register({
                                                required: { value: true, message: "Field is required" },
                                                pattern: {
                                                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                    message: "Email is not valid"
                                                }
                                            })}
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-xs italic mt-2 ml-2">
                                                {errors.email.message}
                                            </p>
                                        )}
                                        {signupError && (
                                            <p className="text-red-500 text-xs italic mt-2 ml-2">
                                                {signupError}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-5">
                                        <label
                                            htmlFor="password"
                                            className="font-bold mb-1 text-gray-700 block"
                                        >
                                            Password
                    </label>
                                        <input
                                            name="password"
                                            type="password"
                                            className={
                                                errors.password
                                                    ? "w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium border border-red-500"
                                                    : "w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                                            }
                                            placeholder="**********"
                                            ref={register({
                                                required: { value: true, message: "Field is required" },
                                                minLength: {
                                                    value: 8,
                                                    message: "Must be 8 characters long"
                                                }
                                            })}
                                        />
                                        {errors.password && (
                                            <p className="text-red-500 text-xs italic mt-2 ml-2">
                                                {errors.password.message}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <input ref={register({
                                            required: { value: true, message: "Field is required" }
                                        })} onChange={handleChange} type="file" name="photo" />
                                    </div>
                                    <div className="flex justify-center">
                                        <button className="shadow bg-gray-700 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white py-2 px-4 mt-4 rounded w-full" type="submit">
                                            <i className="py-2 pr-2 text-white fas fa-sign-in-alt fa-lg"></i>
                                            Sign Up
        </button>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="border-b w-1/5 md:w-1/4"></span>
                                        <Link to="/login" className="text-xs text-gray-500 uppercase">or sign in</Link>
                                        <span className="border-b w-1/5 md:w-1/4"></span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

        </Fragment>
    )
}
const mapStateToProps = (state) => {
    return {
        isLoading: state.user.loading,
        signupError: state.user.signupError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (data) => dispatch(signupUser(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup)
