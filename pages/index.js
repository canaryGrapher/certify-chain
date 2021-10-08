import React, { Component } from 'react';
import web3 from '../ethereum/web3';
import { getAdminDetails } from "../utilities/admin"

//importing components
import User from '../components/user/User'
import Admin from '../components/admin/Admin'

const Main = (props) => {
    const [userWallet, setUserWallet] = React.useState('');
    web3.eth.getAccounts().then((res) => {
        setUserWallet(res[0]);
    });
    const name = props.adminName;
    return (
        <div className="text-center bg-black w-screen h-screen text-white flex flex-col justify-center">
            <h1 className="text-3xl text-red-300">{name}</h1>
            {
                userWallet === props.adminAddress ? <Admin address={props.adminAddress} name={props.adminName} /> : <User address={userWallet} />
            }
        </div>
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

