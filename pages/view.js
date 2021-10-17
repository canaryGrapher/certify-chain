import React from "react"

const View = () => {
    return (
        <div className="flex flex-col justify-center min-h-screen text-center">
            <div className="relative bg-gray-50 mx-auto flex flex-col justify-center" style={{ minHeight: "60vh", width: "65vw" }}>
                <div className="absolute top-0 mt-10">
                    <img className="h-24" src="https://1000logos.net/wp-content/uploads/2017/03/McDonalds-logo.png" alt="company logo" />
                </div>
                <h1 className="text-lg">This is to certify that</h1>
                <h1 className="mt-5 text-4xl">
                    <span className="font-bold">Mark Zuckerberg</span>
                </h1>
                <p className="mt-5">has received this certificate for</p>
                <p className="text-lg">for exceptional performance in being a jackass over the years</p>
                <div className="relative max-w-max mx-auto mt-16">
                    <div className="border-b-2 border-black">
                        <img src="https://static.cdn.wisestamp.com/wp-content/uploads/2020/07/Kevin-Systrom-1.png" alt="certificate signature" className="h-16 mx-auto" />
                    </div>
                    <p>Course instructor</p>
                </div>
            </div>
            <div className="mt-5">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded">Print</button>
            </div>
        </div>
    )
}

export default View