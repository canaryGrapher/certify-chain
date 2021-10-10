import certificate from '../ethereum/certificate_instance';


const getAdminDetails = async () => {
    const adminAddress = await certificate.methods.getAdminDetails().call();
    return adminAddress;
};


export { getAdminDetails };