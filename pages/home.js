import React from "react";
import { useRouter } from "next/router"
import web3 from "../ethereum/web3"

//importing components
import User from "../components/user/User"

//importing stylesheets
import homeDesigns from "../styles/home.module.css"

const Home = () => {
    const router = useRouter()
    const [loaded, setLoaded] = React.useState(false)
    React.useEffect(() => {
        const getAccounts = async () => {
            if (window.ethereum) {
                // get wallet address
                const accounts = await web3.eth.getAccounts();
                // get user details from backend
                const userDetails = await fetch(`/api/user?walletAddress=${accounts[0]}`)
                const response = await userDetails.json();
                // check if user is admni or not
                if (response.data.admin) {
                    router.push("/admin")
                } else {
                    setLoaded(true)
                }
            } else {
                console.log("No Metamask detected");
                router.push("/connect");
            }
        }
        getAccounts();
    }, [])

    return (
        <div className={`${homeDesigns.body} flex flex-col justify-center w-screen min-h-screen py-32`}>
            {loaded ?
                <div className={`flex flex-col justify-center pb-10 w-full md:w-2/3 mx-auto ${homeDesigns.card} p-1`}>
                    <div className="p-5 mt-5">
                        <User />
                    </div>
                </div> : null
            }
        </div>
    )
}

export default Home;