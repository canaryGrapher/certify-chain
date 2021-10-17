import certificate from '../ethereum/certificate_instance';
import web3 from '../ethereum/web3';

//Returns true if the certificate is verified, false if it does not exist or if its revoked
const getCertificateStatus = async (certificateId) => {
    const status = await certificate.methods.certificateStatus(certificate).call();
    return status;
}

//Returns true if the certificate exists on the blockchain
const verifyCert = async (certificateId, regNo, studentName, adminName, dateOfIssue, description) => {
    const accounts = await web3.eth.getAccounts();
    
    const status = await certificate.methods.verify(certificateId, regNo, studentName, adminName, dateOfIssue, description)
                    .send({from: accounts[0]});
    return status;
}

export  { getCertificateStatus, verifyCert};