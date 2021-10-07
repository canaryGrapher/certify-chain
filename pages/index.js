import React, {Component} from 'react';
import certificate from '../ethereum/certificate_instance';
import web3 from '../ethereum/web3';

class Demo extends Component {
    static async getInitialProps() {
        const adminName = await certificate.methods.adminName().call();
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        return {adminName: adminName, accounts: accounts};
    }

    render() {
        const name = this.props.adminName;
        const accounts = this.props.accounts;
        return (
            <h1>{name}</h1>
        );
    }
}

export default Demo;