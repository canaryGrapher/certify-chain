import certificate from '../ethereum/certificate_instance';


const getAdminDetails = async () => {
    const adminAddress = await certificate.methods.getAdminDetails().call();
    // console.log("Returns: ", adminAddress);
    return adminAddress;
};


export { getAdminDetails };