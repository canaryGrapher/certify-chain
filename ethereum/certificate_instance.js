//Retrieveing the deployed contract using the address to obtain a local copy that can interact with the frontend

import web3 from './web3';
import certificate from './build/Certificate.json';

const instance = new web3.eth.Contract(
    JSON.parse(certificate.interface),
    '0xd8c6b3C5eec446E7a7E2C4390fD52E00d1099c9F'      //Paste the address of the deployed contract here
);

export default instance;