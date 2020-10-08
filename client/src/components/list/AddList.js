import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import ListInput from './ListInput';
import ListItem from './ListItem';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { submitList, newState } from '../../store/actions/list-actions';

function AddList() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(newState())
    }, [dispatch]);

    let list = useSelector(state => state.list.list || []);

    //Retrieves phone number from input value 
    let [number, getNumber] = useState();

    const { register, handleSubmit, errors } = useForm({ mode: "onBlur" });

    const shoppingList = list.map(function (item, i) {
        return i + 1 + " " + item.item + '\n';
    }).join('');

    const onSubmit = () => {
        axios.post('/api', {
            list: shoppingList,
            number: number
        })
            .then((response) => {
                console.log(response)
            });

        errors.phone = null;
        toast.info(`Grocery list sent to ${number}`);
    }

    const token = localStorage.getItem('token');

    let user;
    if (token) {
        user = jwt_decode(token);
    }

    let [title, getTitle] = useState();

    console.log(title)
    console.log(number)


    return (
        <div className="flex flex-col w-full h-screen flex bg-teal-lightest font-sans overflow-hidden bg-opacity-0">
            <div className="text-center mt-12">
                <h1 className="mt-2 text-gray-700">Create Grocery List.</h1>
                {user ? (<p className="text-gray-800 text-lg">Edit, delete, or text a list you have created any time!</p>) : (
                    <p>Sign up or sign in to save grocery list!</p>
                )}
            </div>
            <div className="self-center bg-opacity-0 rounded p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                <input
                    onChange={(e) => getTitle(e.target.value)}
                    value={title || ""}
                    className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Title" />
                <ListInput />

                {list.map((item, i) => {
                    return (
                        <Fragment key={i}>
                            <ListItem key={i} list={item} index={i} />
                        </Fragment>
                    )
                })}
                <div>
                </div>

                <div className="text-center">
                    <form onSubmit={handleSubmit(onSubmit)}  >
                        {user ? (<button onClick={() => dispatch(submitList(list, title, user.user.uid, user.user.displayName))} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Save
                            </button>) : null}
                        <button type="submit" className="mx-2 mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
                            Text
                    </button>

                        <input
                            name="phone"
                            ref={register({
                                pattern: {
                                    value: /^\d{10}(?:\d{2})?$/,
                                    message: "Please enter a valid 10 digit phone number"
                                },
                                required: {
                                    value: true,
                                    message: "Number is required to send"
                                }
                            })}
                            onChange={(e) => getNumber(e.target.value)}
                            value={number || ""}
                            className="mt-2 md:w-3/5 shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Enter 10 Digit Number" />
                        {errors.phone && (
                            <p className="m-12 text-red-500 text-xs italic mt-2 ml-2">
                                {errors.phone.message}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}


export default AddList;
