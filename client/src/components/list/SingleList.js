import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { toast } from "react-toastify";
import ListInput from './ListInput';
import ListItem from './ListItem';
import LoadingSpinner from '../spinner/LoadingSpinner';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { updateList, fetchSingleList, deleteList } from '../../store/actions/list-actions';

function SingleList({ list = [], listInfo = [], isLoading, getList, match }) {
    const { id } = match.params;

    useEffect(() => {
        getList(id);
    }, [getList, id])

    const shoppingList = list.map(function (item, i) {
        return i + 1 + " " + item.item + '\n';
    }).join('');

    let [title, getTitle] = useState();
    let [number, getNumber] = useState();


    const dispatch = useDispatch();

    const { register, handleSubmit, errors } = useForm({ mode: "onBlur" });
    console.log(errors)
    //Submit text to be sent
    const onSubmit = () => {
        axios.post('/api', {
            firstName: 'Finn',
            list: shoppingList,
            number: number
        })
            .then((response) => {
                console.log(response)
            });

        errors.phone = null;
        toast.info(`Grocery list sent to ${number}`);
    }

    //Delete list
    const onClick = () => {
        if (window.confirm("Delete List?")) {
            dispatch(deleteList(id));
        }
        return;
    }

    return (
        <div className="h-screen">
            {isLoading ? <LoadingSpinner /> : (
                <div class="h-screen w-full flex justify-center font-sans">
                    <div class="rounded p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                        <div className="text-center mb-4">
                            <h1 className="mt-2 text-gray-700">{listInfo.title}</h1>
                            <p className="text-gray-800 text-lg">Edit, delete, or text list!</p>
                        </div>
                        <input
                            value={title}
                            onChange={(e) => getTitle(e.target.value)}
                            className="mt-4 placeholder-gray-900 shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker " placeholder={listInfo.title} />
                        <ListInput />

                        {list.map((item, i) => {
                            return (
                                <Fragment key={i}>
                                    <ListItem key={i} list={item} index={i} />
                                </Fragment>
                            )
                        })}

                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="text-center">
                                <button onClick={() => dispatch(updateList(list, title || listInfo.title, listInfo.id))} class="mx-2 mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
                                    Update
                  </button>
                                <button onClick={onClick} className="mx-2 mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
                                    Delete
                  </button>

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
                                            message: "Number is required to send."
                                        },
                                    })}
                                    onChange={(e) => getNumber(e.target.value)}
                                    value={number || ""}
                                    className="md:w-1/3 shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Enter 10 Digit Number" />
                                {errors.phone && (
                                    <p className="m-12 text-red-500 text-xs italic mt-2 ml-2">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>
                        </form>

                    </div>

                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        list: state.list.list,
        listInfo: state.list.listInfo,
        isLoading: state.list.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getList: (listId) => {
            dispatch(fetchSingleList(listId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleList)