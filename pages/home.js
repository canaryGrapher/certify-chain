import React from "react";

//importing components
import User from "../components/user/User"

//importing stylesheets
import homeDesigns from "../styles/home.module.css"

const Home = () => {
    return (
        <div className={`${homeDesigns.body} flex flex-col justify-center w-screen min-h-screen py-32`}>
            <div className={`flex flex-col justify-center pb-10 w-full md:w-2/3 mx-auto ${homeDesigns.card} p-1`}>
                <div className="p-5 mt-5">
                    <User />
                </div>
            </div>
        </div>
    )
}

export default Home;