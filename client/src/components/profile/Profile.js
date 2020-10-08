import React, { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { getUser, updateUser, deleteUser } from '../../store/actions/profile-actions';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../spinner/LoadingSpinner';

function Profile({ match, getUser, user = [], updateuser, deleteuser, isLoading }) {
    const { register, handleSubmit } = useForm({ mode: 'onBlur' });

    const onSubmit = (data) => {
        updateuser(data)
        console.log(data)
    };

    const { id } = match.params;
    useEffect(() => {
        getUser(id);
    }, [getUser, id]);

    const removeUser = () => {
        if (window.confirm("Delete Account?")) {
            deleteuser(id);
        }
        return;

    }
    return (
        <div className="h-screen">
            {isLoading ? (<LoadingSpinner />) : (
                <Fragment>
                    {user.map((profile, i) => {
                        return (
                            <Fragment key={i}>

                                <div className="my-12 pb-6 w-full justify-center items-center overflow-hidden md:max-w-sm rounded-lg shadow-lg mx-auto">
                                    <img className="w-full h-56 object-cover object-center" src={profile.profileImage} alt="avatar" />
                                    <div className="flex items-center px-6 py-3 bg-gray-900">
                                        <Link to="/lists"><h1 className="mx-3 text-white font-semibold text-lg">View Lists</h1></Link>
                                    </div>
                                    <div className="py-4 px-6">
                                        <h1 className="text-2xl font-semibold text-gray-800">{profile.name}</h1>
                                        <div className="flex items-center mt-4 text-gray-700">
                                            <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                                                <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z" />
                                            </svg>
                                            <h1 className="px-2 text-sm">{profile.email}</h1>
                                        </div>


                                        <div className="my-8 pb-2 w-full justify-center items-center overflow-hidden md:max-w-sm rounded-lg mx-auto">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="-mx-3 md:flex mb-6">
                                                    <div className="md:w-1/2 px-3">
                                                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="updateEmail">
                                                            Email
    </label>
                                                        <input ref={register({
                                                            required: true,
                                                            message: "Field is required"
                                                        })} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="email" placeholder={`${profile.email}`} name="updateEmail" />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between">
                                                    <button
                                                        className="shadow bg-green-500 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                                        type="submit"
                                                    >
                                                        Update
                  </button>
                                                    <button onClick={removeUser}
                                                        className="shadow bg-red-500 hover:bg-red-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                                        type="button"

                                                    >
                                                        Delete Account
                  </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </Fragment>

                        )
                    })}

                </Fragment>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.profile.user,
        isLoading: state.profile.loading
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (id) => {
            dispatch(getUser(id))
        },
        updateuser: (email) => {
            dispatch(updateUser(email))
        },
        deleteuser: (uid) => {
            dispatch(deleteUser(uid))
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile)
