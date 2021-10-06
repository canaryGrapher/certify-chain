//Retrieveing the deployed contract using the address to obtain a local copy that can interact with the frontend

import web3 from './web3';
import certificate from './build/Certificate.json';

const instance = new web3.eth.Contract(
    JSON.parse(certificate.interface),
    '0xe95e99FfbF4d14E9Dd9E43183Adc59748BF68cb2'      //Paste the address of the deployed contract here
);

export default instance;