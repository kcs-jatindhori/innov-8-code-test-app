import React from 'react'
//import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import { useSelector } from 'react-redux'
import { Redirect } from "react-router";
import { toast } from 'react-toastify';

const Header = ({ logout }) => {


    const user = useSelector(state => state.user);
    if (!user.token) {
        return <Redirect to="/" />;
    }

    const onLogoutClick = () => {
        const data = logout();
        if (data) toast.success("User Logout successfully!");
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    </ul>
                    {user.token && <ul className="nav navbar-nav ml-auto justify-content-end">
                        <li className="nav-item" style={{
                            cursor: 'pointer'
                        }}>
                            <a className="nav-link" onClick={onLogoutClick}>Logout</a>
                        </li>
                    </ul>}
                </div>
            </div>
        </nav>
    )
}

export default connect('', { logout })(Header);