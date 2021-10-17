const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require('./build/Certificate.json');

const provider = new HDWalletProvider(
  'denial hour again eternal west speak device supply behave describe agent until', //Paste your metamask neumonic here
  'https://rinkeby.infura.io/v3/29007437e80a4914bfbadfd25ad2eced'   //Paste your infura API here
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode, arguments: ['MAHE'] })
    .send({ gas: '1000000', gasPrice: '5000000000', from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};

deploy();

