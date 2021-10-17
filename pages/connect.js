import React from 'react';
import web3 from '../ethereum/web3';
import { getAdminDetails } from "../utilities/admin"
import { useRouter } from 'next/router'


const Main = () => {
    const router = useRouter()
    const [metamaskDetected, setMetamaskDetected] = React.useState(false);
    React.useEffect(() => {
        const metaskAvailable = window.ethereum ? true : false;
        setMetamaskDetected(metaskAvailable);
    }, [])

    React.useEffect(() => {
        const getAccounts = async () => {
            if (window.ethereum) {
                // get wallet address
                const accounts = await web3.eth.getAccounts();
                // get user details from backend
                const userDetails = await fetch(`/api/user?walletAddress=${accounts[0]}`)
                const response = await userDetails.json();

                //check if the address is associated with any account on database
                if (response.data && response.data.walletAddress === accounts[0]) {
                    // redirect to admin dashboard if user is admin
                    if (response.data.admin) {
                        router.push("/admin");
                    }
                    // else redirect user to homepage
                    else {
                        router.push("/home");
                    }
                }

                //if address is not associated with any account on database
                else {
                    alert("This wallet address is not associated with any account. Contact Admin!")
                }
            } else {
                console.log("No Metamask detected");
            }
        }
        getAccounts();
    }, [])

    return (
        <React.Fragment>
            <div className={`text-center w-screen min-h-screen text-gray-800 flex flex-col justify-center p-5`}>
                <div>
                    <img src={"./metamask.png"} alt="Metamask logo" className="h-22 w-22 m-auto" />
                    {metamaskDetected ? <p className="text-2xl font-medium">Please log in to Metamask</p> : <p className="text-2xl font-medium">Please install MetaMask</p>}
                    {metamaskDetected ? <p>If you have already logged in, refresh the page</p> : null}
                    <p className={metamaskDetected ? "text-green-600 font-bold mt-5" : "text-red-600 font-bold"}>{metamaskDetected ? "Metamask integration detected" : "Metamask not detected on this browser"}</p>
                    {metamaskDetected ? <p>If you have already done so, refresh the page</p> : <p>You cannot login unless you install a metamask extension. This usually isn't possible on default mobile browsers</p>}
                </div>
            </div>
        </React.Fragment>
    );
}


export default Main;

export async function getStaticProps() {
    const adminDetails = await getAdminDetails();
    const adminAddress = await adminDetails[0];
    const adminName = await adminDetails[1];
    return {
        props: { adminName, adminAddress }, // will be passed to the page component as props
    }
}

