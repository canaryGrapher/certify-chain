import React from "react";

//importing components
import Generate from '../components/admin/Generate'
import Generated from '../components/admin/Generated'

//importing stylesheets
import styles from "../styles/admin.module.css"
import homeDesigns from "../styles/home.module.css"

const Admin = () => {
    const [selectedTab, setSelectedTab] = React.useState("generated");

    const tabOptionGenerated = selectedTab === 'generated' ? styles.active_tab : styles.inactive_tab;
    const taOptionGenerate = selectedTab === 'generate' ? styles.active_tab : styles.inactive_tab;

    return (
        <div className={`${homeDesigns.body} flex flex-col justify-center w-screen min-h-screen py-32`}>
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
        </div>
    )
}

export default Admin;