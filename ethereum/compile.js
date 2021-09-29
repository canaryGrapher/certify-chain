const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

//1. Locate and delete the build folder
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);   

//2. Read the contracts file
const certificatePath = path.resolve(__dirname, 'contracts', 'Certificate.sol');
const source = fs.readFileSync(certificatePath, 'utf8');

//3. Compile the contracts
// console.log(solc.compile(source, 1));
const output = solc.compile(source, 1).contracts;

//Create a folder according to buildPath
fs.ensureDirSync(buildPath);


//Output contains a list of contract objects, which in this case would be certificate 
//So we essentially extract a contract object and store in the form of a json file at the path pointed by buildPath
//To get the content of a contract object we use `output[contract]`, to extract the name we can use the contract variable
//of the for loop
for(let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}