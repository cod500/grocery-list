import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../store/actions/list-actions';
import { v1 as uuid } from 'uuid';

export default function ListInput() {
    let listInfo = useSelector(state => state.list.listInfo);
    const dispatch = useDispatch();
    let [item = "", setItem] = useState();

    return (
        <div>
            <div className="mb-4">
                <div className="flex mt-4">
                    <input
                        onChange={(e) => setItem(e.target.value)}
                        value={item}
                        className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" />
                    <button onClick={() => {
                        setItem('')
                        dispatch(addItem(
                            {
                                id: uuid(),
                                item: item,
                            },
                            listInfo

                        ))

                    }} className="flex-no-shrink p-2 border-2 rounded text-white border-teal hover:text-white bg-blue-500 hover:bg-blue-700 font-bold  focus:outline-none">Add</button>
                </div>
            </div>
        </div>
    )
}
