import React from 'react';
import web3 from '../ethereum/web3';
import { getAdminDetails } from "../utilities/admin"

const Main = () => {
    const [metamskDetected, setMetamskDetected] = React.useState(false);
    React.useEffect(() => {
        const metaskAvailable = window.ethereum ? true : false;
        setMetamskDetected(metaskAvailable);
    }, [])

    return (
        <React.Fragment>
            <div className={`text-center w-screen min-h-screen text-gray-800 flex flex-col justify-center p-5`}>
                <div>
                    <img src={"./metamask.png"} alt="Metamask logo" className="h-22 w-22 m-auto" />
                    <p className="text-2xl font-medium">Please log in to Metamask</p>
                    <p>If you have already logged in, refresh the page</p>
                    <p className={metamskDetected ? "text-green-600 font-bold mt-5" : "text-red-600 font-bold mt-5"}>{metamskDetected ? "Metamask integration detected" : "Metamask not detected on this browser"}</p>
                    {metamskDetected ? <p>If you have already done so, refresh the page</p> : <p>You cannot login unless you install a metamask extension. This usually isn't possible on default mobile browsers</p>}
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

