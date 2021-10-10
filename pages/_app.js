import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';

import 'tailwindcss/tailwind.css'
import React from 'react';

function MyApp({ Component, pageProps }) {
    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <Component {...pageProps} />
            <Footer />
        </div>
    )
}

export default MyApp