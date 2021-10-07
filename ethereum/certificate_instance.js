//Retrieveing the deployed contract using the address to obtain a local copy that can interact with the frontend

import web3 from './web3';
import certificate from './build/Certificate.json';

const instance = new web3.eth.Contract(
    JSON.parse(certificate.interface),
    '0xF25B194F3176D67bf5Ce809b86c84Ffde39FE738'      //Paste the address of the deployed contract here
);

export default instance;