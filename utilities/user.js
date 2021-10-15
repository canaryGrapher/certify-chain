import certificate from '../ethereum/certificate_instance';

//Returns true if the certificate is verified, false if it does not exist or if its revoked
const getCertificateStatus = async (certificateId) => {
    const status = await certificate.methods.certificateStatus(certificate).call();
    return status;
}

//Returns true if the certificate exists on the blockchain
const verify = async (certificateId, regNo, studentName, adminName, dateOfIssue, description) => {
    const status = await certificate.methods.verify(certificateId, regNo, studentName, adminName, dateOfIssue, description)
                    .send({from: accounts[0]});
    return status;
}

export default { getCertificateStatus, verify};