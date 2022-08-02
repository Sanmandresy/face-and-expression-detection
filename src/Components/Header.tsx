import React from 'react';
import '../Styles/Header.css'

const Header :React.FC<{title:string}>  = (props) => {
    const { title } = props;
    return(<>
        <nav className="navbar navbar-light headnav">
            <div className="container-fluid d-flex justify-content-center">
                <span className="navbar-brand mb-0 h1 title">{title}</span>
            </div>
        </nav>
    </>);
}

export default Header;