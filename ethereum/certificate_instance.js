//Retrieveing the deployed contract using the address to obtain a local copy that can interact with the frontend

import web3 from './web3';
import certificate from './build/Certificate.json';

const instance = new web3.eth.Contract(
    JSON.parse(certificate.interface),
    '0x612F8Dc2fDCfC3c8f4AcB684436ae7B5D0EeeADB'      //Paste the address of the deployed contract here
);

export default instance;