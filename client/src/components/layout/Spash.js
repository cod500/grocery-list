import React from 'react';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';

export default function Splash() {

    const token = localStorage.getItem('token');

    let user;
    if (token) {
        user = jwt_decode(token);
    }
    return (
        <div className="text-white mt-0 py-0 w-full h-full" >
            <section class="px-2 lg:px-0 mt-16 sm:mt-32 flex w-full container mx-auto pb-16">
                <div class="w-full text-blue flex justify-center md:justify-start text-center md:text-left">
                    <div class="md:w-1/2 w-full">
                        <h2 class="text-gray-700 leading-none font-bold text-2xl xs:text-2x1 md:text-5xl lg:6x1 uppercase">Create and Text <br></br><span class="text-blue-600">Grocery Lists</span></h2>
                        <p class="mt-12 mb-12 text-gray-800 text-xl">Create, save, and text customizable grrocery lists. Sign up to save grocery lists for future use or create a list and send instantly for free.</p>
                        {user ? (<Link to="/add"><button class="px-16 rounded-full bg-blue-400 text-white font-bold p-4 uppercase border-blue-500 border">Create a list now!</button></Link>) : (
                            <Link to="/signup"><button class="px-16 rounded-full bg-blue-400 text-white font-bold p-4 uppercase border-blue-500 border">Sign up now!</button></Link>
                        )}
                    </div>
                    <div class="md:w-1/2 md:justify-center md:flex hidden">
                        <img src="img/phone.png" alt="Mobile Phone" />
                    </div>
                </div>
            </section>
        </div>
    )
}
