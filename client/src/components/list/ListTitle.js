import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function ListTitle({ lists }) {
    console.log(lists)
    const cardBackround = {
        background: 'radial-gradient(black, transparent 60%)',
        transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)',
        opacity: '0.2'
    }

    const cardStyle = {
        background: 'radial-gradient(black, transparent 60%)',
        transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)',
        opacity: '0.2'
    }

    return (
        <Fragment>


            {lists.map((list, i) => {
                return (
                    <div class="p-1 flex flex-wrap items-center">
                        {i % 2 ? (<div class="flex-shrink-0 m-6 relative overflow-hidden bg-gray-500 rounded-lg max-w-xs shadow-xl">
                            <svg class="absolute bottom-0 left-0 mb-1" viewBox="0 0 375 283" fill="none" style={cardBackround}>
                                <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
                                <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
                            </svg>
                            <div class="relative pt-10 px-10 flex items-center justify-center">
                                <div class="block absolute w-48 h-48 bottom-0 left-0 -mb-2" style={cardStyle}></div>
                                <img class="relative w-40" src="/img/cart.png" alt="" />
                            </div>
                            <div class="relative text-white px-6 pb-6 mt-1">
                                <span class="block opacity-75 -mb-1">{list.createdAt}</span>
                                <div class="flex justify-between">
                                    <span class="block font-semibold text-xl mt-2">{list.title}</span>
                                    <span class="block bg-white rounded-full text-gray-500 text-xs font-bold px-3 py-2 mt-2 leading-none flex items-center"><Link to={`/list/${list.listId}`}>View List</Link></span>
                                </div>
                            </div>
                        </div>) :
                            (<div class="flex-shrink-0 m-6 relative overflow-hidden bg-blue-300 rounded-lg max-w-xs shadow-xl">
                                <svg class="absolute bottom-0 left-0 mb-1" viewBox="0 0 375 283" fill="none" style={cardBackround}>
                                    <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
                                    <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
                                </svg>
                                <div class="relative pt-10 px-10 flex items-center">
                                    <div class="block absolute w-48 h-48 bottom-0 left-0 -mb-2" style={cardStyle}></div>
                                    <img class="relative w-40" src="/img/eggs.png" alt="" />
                                </div>
                                <div class="relative text-white px-6 pb-6 mt-1">
                                    <span class="block opacity-75 -mb-1">{list.createdAt}</span>
                                    <div class="flex justify-between">
                                        <span class="block font-semibold text-xl">{list.title}</span>
                                        <span class="block bg-white rounded-full text-blue-300 text-xs font-bold px-3 py-2 mt-2 leading-none flex items-center"><Link to={`/list/${list.listId}`}>View List</Link></span>
                                    </div>
                                </div>
                            </div>)}
                    </div>


                )
            })}

        </Fragment>
    )
}
