import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../store/actions/user-actions';
import { connect } from 'react-redux';
import LoadingSpinner from '../spinner/LoadingSpinner';

const Login = ({ isLoadong, login, loginError }) => {
    const { register, handleSubmit, errors } = useForm({ node: "onBlur" });
    const onSubmit = (data) => {
        login(data)
    }
    return (
        <Fragment>
            {isLoadong ? <LoadingSpinner /> :
                <div className="py-6 mt-12 h-screen">
                    <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                        <div className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg" style={{ background: "url('https://images.unsplash.com/photo-1569360457068-0e24f0d88117?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=440&q=80')" }}></div>
                        <div className="w-full p-8 lg:w-1/2">
                            <p className="text-xl text-gray-600 text-center">Welcome back!</p>
                            <div className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
                                <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">Sign in</h1>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="border-b w-1/5 lg:w-1/4"></span>
                                    <p className="text-xs text-center text-gray-500 uppercase">login with email</p>
                                    <span className="border-b w-1/5 lg:w-1/4"></span>
                                </div>
                                <div className="mt-4">
                                    <div className="flex justify-between">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                                    </div>
                                    <input htmlFor="email" name="email" className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email"
                                        ref={register({
                                            required: { value: true, message: "Field is required" },
                                            pattern: {
                                                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: "Email is not valid"
                                            }
                                        })} />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-xs italic mt-2 ml-2">
                                        {errors.email.message}
                                    </p>
                                )}
                                {loginError && (
                                    <p className="text-red-500 text-xs italic mt-2 ml-2">
                                        {loginError}
                                    </p>
                                )}
                                <div className="mt-4">
                                    <input htmlFor="password" name="password" className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password"
                                        ref={register({
                                            required: { value: true, message: "Field is required" },
                                            minLength: {
                                                value: 8,
                                                message: "Must be 8 characters long"
                                            }
                                        })} />
                                </div>
                                <div className="mt-8">
                                    <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Login</button>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="border-b w-1/5 md:w-1/4"></span>
                                    <Link to="/login" className="text-xs text-gray-500 uppercase">or sign up</Link>
                                    <span className="border-b w-1/5 md:w-1/4"></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }

        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoading: state.user.loading,
        loginError: state.user.loginError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => {
            dispatch(loginUser(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
