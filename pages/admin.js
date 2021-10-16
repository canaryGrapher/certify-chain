import React from "react";
import { useRouter } from 'next/router'
import web3 from "../ethereum/web3"

//importing components
import Generate from '../components/admin/Generate'
import Generated from '../components/admin/Generated'

//importing stylesheets
import styles from "../styles/admin.module.css"
import homeDesigns from "../styles/home.module.css"

const Admin = () => {
    const router = useRouter()
    const [selectedTab, setSelectedTab] = React.useState("generated");
    const [admin, setAdmin] = React.useState(false);
    const tabOptionGenerated = selectedTab === 'generated' ? styles.active_tab : styles.inactive_tab;
    const taOptionGenerate = selectedTab === 'generate' ? styles.active_tab : styles.inactive_tab;

    React.useEffect(() => {
        const getAccounts = async () => {
            if (window.ethereum) {
                // get wallet address
                const accounts = await web3.eth.getAccounts();
                // get user details from backend
                const userDetails = await fetch(`/api/user?walletAddress=${accounts[0]}`)
                const response = await userDetails.json();
                // check if user is admni or not
                if (!response.data.admin) {
                    router.push("/home")
                } else {
                    setAdmin(true)
                }
            } else {
                console.log("No Metamask detected");
                router.push("/");
            }
        }
        getAccounts();
    }, [])

    return (
        <div className={`${homeDesigns.body} flex flex-col justify-center w-screen min-h-screen py-32`}>
            {admin ?
                <div className={`flex flex-col justify-center pb-10 w-full md:w-2/3 mx-auto ${homeDesigns.card} p-1`}>
                    <div className="grid grid-cols-2 gap-1 h-10">
                        <div className={`text-center my-auto bg-red-200 p-2 ${styles.tab} text-white ${tabOptionGenerated}`} onClick={() => setSelectedTab('generated')}>
                            <h1 className="text-lg font-medium">Issued Certificates</h1>
                        </div>
                        <div className={`text-center my-auto bg-red-200 p-2 ${styles.tab} text-white ${taOptionGenerate}`} onClick={() => setSelectedTab('generate')}>
                            <h1 className="text-lg font-medium">New Certificate</h1>
                        </div>
                    </div>

                    <div className="p-5 mt-5">
                        {selectedTab === 'generated' ? <Generated /> : <Generate />}
                    </div>

                </div>
                : null}
        </div>
    )
}

export default Admin;