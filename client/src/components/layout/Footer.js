import React from 'react'

export default function Footer() {
    return (
        <div className="w-full text-center mt-12">
            <section className="bg-gray-900 sm:py-32 py-16">
                <div className="container mx-auto sm:flex-row flex-col flex ">
                    <div className="sm:w-1/3 w-full sm:mb-0 mb-16">
                        <i className="fas fa-list-ol text-white rounded-full w-24 h-24 mx-auto mb-2 fa-5x"></i>
                        <p className="italic text-gray-500 text-center my-3">Create and customisze unlimited grocery lists for free when you sign up.</p>
                        <p className="font-bold  text-gray-400 text-center text-xl">Create and Customize</p>
                    </div>
                    <div className="sm:w-1/3 w-full sm:mb-0 mb-16">
                        <i className="fas fa-sms text-white rounded-full w-24 h-24 mx-auto mb-2 fa-5x"></i>
                        <p className="italic text-gray-500 text-center my-3">Free automated texting to send your customized lists.</p>
                        <p className="font-bold  text-gray-400 text-center text-xl">Test Instantly</p>
                    </div>
                    <div className="sm:w-1/3 w-full sm:mb-0 mb-16">
                        <i className="fas fa-cloud-upload-alt text-white rounded-full w-24 h-24 mx-auto mb-2 fa-5x"></i>
                        <p className="italic text-gray-500 text-center my-3">Upload your lists to edit and text them at any time.</p>
                        <p className="font-bold  text-gray-400 text-center text-xl">Save and Retrieve</p>
                    </div>
                </div>
            </section>

            <section className="bg-gray-800 py-32">
                <div className="container mx-auto">
                    <h1 className="text-5xl font-bold uppercase text-center text-gray-300">Support</h1>
                    <div className="flex justify-center mt-4">
                        <a className="mr-12 social-button facebook" href="https://www.facebook.com/" target="_blank"><i className="fab fa-facebook-f fa-3x"></i></a>
                        <a className="mr-12 social-button twitter" href="https://www.twitter.com/" target="_blank"><i className="fab fa-twitter fa-3x"></i></a>
                        <a className="mr-12 social-button linkedin" href="https://www.linkedin.com/" target="_blank"><i className="fab fa-linkedin fa-3x"></i></a>
                        <a className="mr-12 social-button youtube" href="https://www.youtube.com/" target="_blank"><i className="fab fa-youtube fa-3x"></i></a>
                        <a className="social-button instagram" href="https://www.instagram.com/" target="_blank"><i className="fab fa-instagram fa-3x"></i></a>
                    </div>
                </div>
            </section>
        </div>
    )
}
