const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledCertificate = require('../ethereum/build/Certificate.json');

let accounts;
let certificate;

beforeEach( async () => {
    accounts = await web3.eth.getAccounts();

    certificate = await new web3.eth.Contract(JSON.parse(compiledCertificate.interface))
        .deploy({data: compiledCertificate.bytecode, arguments: ['MAHE']})  //arguments are constructor parameters of the contract
        .send({from: accounts[0], gas: '1000000'});
});

describe('Certificate', () => {
    it('deploys a certificate contract', () => {
        assert.ok(certificate.options.address);
    });

    it('only allows the admin to create certificate', async () => {

        try{
            await certificate.methods.createCertificate("1", 180905576, "Jatin", "MAHE", "18-05-2000", "grade sheet")
                .send({from: accounts[1], gas: '1000000'});

        } catch (err){
            assert(true);
            return;
        }

        assert(false);
    });


    it('successfully approves certificate creation', async () => {
        await certificate.methods.createCertificate("1", 180905576, "Jatin", "MAHE", "18-05-2000", "grade sheet")
            .send({from: accounts[0], gas: '1000000'});

        const status = await certificate.methods.certificateStatus("1").call();

        assert(status);
    });


    it('admin issues certificate and a third-party verifies it', async () => {
        await certificate.methods.createCertificate("1", 180905576, "Jatin", "MAHE", "18-05-2000", "grade sheet")
            .send({from: accounts[0], gas: '1000000'});

        const status = await certificate.methods.verify("1", 180905576, "Jatin", "MAHE", "18-05-2000", "grade sheet")
            .send({from: accounts[1], gas: '1000000'});

        assert(status);
    });


    it('revokes the validity of a certificate', async () => {
        await certificate.methods.createCertificate("1", 180905576, "Jatin", "MAHE", "18-05-2000", "grade sheet")
            .send({from: accounts[0], gas: '1000000'});

        await certificate.methods.revoke("1").send({from: accounts[0], gas: '1000000'});

        const status = await certificate.methods.certificateStatus("1").call();

        assert(!status);
    });

    it('creates multiple certificates', async () => {
        await certificate.methods.createCertificate("1", 180905576, "Jatin", "MAHE", "18-05-2000", "grade sheet")
            .send({from: accounts[0], gas: '1000000'});

        await certificate.methods.createCertificate("2", 180903276, "Yash", "MAHE", "20-05-2000", "grade sheet")
            .send({from: accounts[0], gas: '1000000'});   

 
        const status1 = await certificate.methods.certificateStatus("1").call();
        const status2 = await certificate.methods.certificateStatus("2").call();

        assert(status1 && status2);
    });

    it('gets admin', async () => {
        try{
            const details = await certificate.methods.getAdminDetails().call();
            console.log(details);
        } catch(err){

        }
    });
});



// "1", 180905576, "Jatin", "MAHE", "18-05-2000", "grade sheet"