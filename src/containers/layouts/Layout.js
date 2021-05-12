import React from 'react'
import Nav from '../../components/Common/Header'
import Footer from '../../components/Common/Footer'


const Layout = ({ children }) => {
    return (
        <div>
            <Nav />
            <div className="container mt-5 mx-auto">
                <div className="outer">
                    <div className="">
                        {children}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Layout;