import React, {Component} from 'react';
import certificate from '../ethereum/certificate_instance';

class Demo extends Component {
    static async getInitialProps() {
        const adminName = await certificate.methods.adminName().call();

        return {adminName: adminName};
    }

    render() {
        const name = this.props.adminName;
        return (
            <h1>{name}</h1>
        );
    }
}

export default Demo;