import React, { useEffect } from 'react';
import web3 from '../ethereum/web3';
import { getAdminDetails } from "../utilities/admin"
import { useRouter } from 'next/router'

//importing stylesheets
import styles from '../styles/home.module.css';

const Verify = () => {
    const router = useRouter();
    const [loaded, setLoaded] = React.useState(false);
    useEffect(() => {
        const getAccounts = async () => {
            if (window.ethereum) {
                // get wallet address
                const accounts = await web3.eth.getAccounts();
                if (accounts.length < 1) {
                    router.push("/connect")
                } else {
                    setLoaded(true);
                }
            } else {
                router.push("/connect")
            }
        }
        getAccounts();
    }, [])
    return (
        <React.Fragment>
            {loaded ?
                <React.Fragment>
                    <div className={`text-center w-screen min-h-screen text-gray-800 flex flex-col justify-center ${styles.body}`}>
                        <div className={`flex flex-col justify-center px-10 py-20 h-1/2 w-full md:w-2/3 mx-auto ${styles.card}`}>
                            <h2 className="mb-6 text-3xl font-medium">Verify your certificate</h2>
                            <input type="text" placeholder="Certificate ID" className={`w-full md:w-1/2 mx-auto h-12 p-5 border-2 ${styles.input}`} />
                            <button type="button" className={`mt-6 bg-blue-400 text-white w-full md:w-1/2 mx-auto h-12 ${styles.button}`}>Validate</button>
                        </div>
                    </div>
                    <div className={`w-full ${styles.body}`}>
                        <div className="mx-auto w-2/3">
                            <h2>About this project</h2>
                            <p>Some stupid Description goes here</p>
                        </div>
                    </div>
                </React.Fragment>
                : null}
        </React.Fragment>
    );
}


export default Verify;

export async function getStaticProps() {
    const adminDetails = await getAdminDetails();
    const adminAddress = await adminDetails[0];
    const adminName = await adminDetails[1];
    return {
        props: { adminName, adminAddress }, // will be passed to the page component as props
    }
}

