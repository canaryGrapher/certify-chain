import certificate from '../ethereum/certificate_instance';
// import web3 from '../ethereum/web3';


const getAdminDetails = async () => {
    const adminAddress = await certificate.methods.getAdminDetails();
    return adminAddress
};



export { getAdminDetails };