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
    it('1. Deploys a certificate contract', () => {
        assert.ok(certificate.options.address);
    });

    it('2. Only allows the admin to create certificate', async () => {

        try{
            await certificate.methods.createCertificate("1", "180905576", "Jatin", "MAHE", "18-05-2000", "grade sheet")
                .send({from: accounts[1], gas: '1000000'});

        } catch (err){
            assert(true);
            return;
        }

        assert(false);
    });


    it('3. Successfully approve certificate creation', async () => {
        await certificate.methods.createCertificate("1", "180905576", "Jatin", "MAHE", "18-05-2000", "grade sheet")
            .send({from: accounts[0], gas: '1000000'});

        const status = await certificate.methods.certificateStatus("1").call();

        assert(status);
    });


    it('4. Admin issues certificate and a third-party verifies it', async () => {
        await certificate.methods.createCertificate("1", "180905576", "Jatin", "MAHE", "18-05-2000", "grade sheet")
            .send({from: accounts[0], gas: '1000000'});

        const status = await certificate.methods.verify("1", "180905576", "Jatin", "MAHE", "18-05-2000", "grade sheet")
            .call();

        assert(status);
    });


    it('5. Revoke the validity of a certificate', async () => {
        await certificate.methods.createCertificate("1", "180905576", "Jatin", "MAHE", "18-05-2000", "grade sheet")
            .send({from: accounts[0], gas: '1000000'});

        await certificate.methods.revoke("1").send({from: accounts[0], gas: '1000000'});

        const status = await certificate.methods.certificateStatus("1").call();

        assert(!status);
    });


    it('6. Creation of multiple certificates', async () => {
        await certificate.methods.createCertificate("1", "180905576", "Jatin", "MAHE", "18-05-2000", "grade sheet")
            .send({from: accounts[0], gas: '1000000'});

        await certificate.methods.createCertificate("2", "180903276", "Yash", "MAHE", "20-05-2000", "grade sheet")
            .send({from: accounts[0], gas: '1000000'});   

 
        const status1 = await certificate.methods.certificateStatus("1").call();
        const status2 = await certificate.methods.certificateStatus("2").call();

        assert(status1 && status2);
    });

    it('7. Manipulated certificate should not get validated', async () => {
        await certificate.methods.createCertificate("1", "180905576", "Jatin", "MAHE", "18-05-2000", "grade sheet")
            .send({from: accounts[0], gas: '1000000'});

        //Chnaging certificateId from 1 to 2
        const status = await certificate.methods.verify("2", "180905576", "Jatin", "MAHE", "18-05-2000", "grade sheet")
                        .call();

        assert.equal(status, false);
    });


});



// "1", 180905576, "Jatin", "MAHE", "18-05-2000", "grade sheet"