import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, updateItem } from '../../store/actions/list-actions';
import { useForm } from "react-hook-form";

export default function ListItem({ list, index }) {
    let listInfo = useSelector(state => state.list.listInfo);
    let [editable, setEditable] = useState(false);
    let [itemEdit = list.item, setItem] = useState(list.item);
    const dispatch = useDispatch();


    const toggleEdit = () => {
        if (editable) {
            setItem(list.itemEdit);
            dispatch(updateItem({
                id: list.id,
                item: itemEdit
            }, list.id, listInfo))
        }
        setEditable(!editable);
    }

    console.log(itemEdit)

    return (
        <Fragment>
            <div class="flex mb-4 items-start todo-row border-b border-gray-400">
                {editable ? <input
                    onChange={(e) => setItem(e.target.value)}
                    value={itemEdit}
                    class="shadow appearance-none border py-2 px-3 mr-4 text-grey-darker" placeholder={list.item} /> : <p class="w-full text-gray-700 mr-32 font-bold">{`${index + 1}.`} {list.item}</p>}

                <button onClick={toggleEdit} class="mx-2 bg-transparent px-4 border border-gray-400 text-gray-700 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded focus:outline-none" >{editable ? "Save" : "Edit"}</button>

                <button onClick={() => dispatch(deleteItem(list.id, listInfo))} class="mx-2 bg-transparent px-4 border border-gray-400 text-gray-700 hover:bg-red-600 hover:text-white font-bold py-2 px-4 rounded focus:outline-none">Remove</button>
            </div>
        </Fragment>
    )
}


