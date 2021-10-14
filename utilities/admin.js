import certificate from '../ethereum/certificate_instance';
import web3 from '../ethereum/web3';

const getAdminDetails = async () => {
    const adminAddress = await certificate.methods.getAdminDetails().call();
    return adminAddress;
};

const revokeCertificate = async (certificateId) => {
    const accounts = await web3.eth.getAccounts();

    //Revoke certificate with id as certificateID
    await certificate.methods.revoke(certificateId).send({from: accounts[0]});

    //Check the status for confirmation
    const status = await certificate.methods.certificateStatus(certificate).call();

    //Update the value of status on mongoDb, and update the ui to show certificate revoked
    return status;
}


//Returns true if the certificate is created successfully
const createCertificate = async (certificateId, regNo, studentName, adminName, dateOfIssue, description) => {
    const accounts = await web3.eth.getAccounts();
    
    await certificate.methods.createCertificate(certificateId, regNo, studentName, adminName, dateOfIssue, description)
            .send({from: accounts[0]});

    const status = await certificate.methods.certificateStatus(certificateId).call();

    return status;
}

export { getAdminDetails, revokeCertificate, createCertificate};