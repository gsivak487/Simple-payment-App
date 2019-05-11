import React from 'react';
import {
    Badge,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler,
    NavbarBrand,
    DropdownToggle
} from 'reactstrap';
import { Link,withRouter } from "react-router-dom";
import '../css/main.css'

 class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        };
        this.Logout = this.Logout.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    Logout() {
        window.sessionStorage.removeItem('loginuser');
    }

    render() {
        const user = JSON.parse(window.sessionStorage.getItem('loginuser'));
        if(!user){
            console.log('****NO LOGIN USER****')
            this.props.history.push("/login");
        }
        var userName = user.loginuserdata[0].UserName;
        var userID = user.loginuserdata[0].UserID
        if (userName === 'Admin') {
            var view = 'true';
        } else {
            var view = "none";
        }
        var imgsrc = 'imgs/' + userID + '.jpg';
        return (
            <div>
                <header>
                    <div>

                        <ul className="main-nav" style={{ float: 'left' }}>
                            <Link to="/home"><img style={{ marginLeft: '40px', height: '70px', width: '200px', marginTop: '-10px' }} src="/src/img/logo.png" alt="logo" /></Link>
                            <Link to="/home"><li> HOME </li></Link>
                            <Link to="/tansactions"><li> TRANSACTIONS </li></Link>
                            <Link to="/sendmoney"><li style={{ display: view }}> SEND MONEY </li></Link>
                            <Link to="/loadmoney"> <li> LOAD MONEY </li></Link>
                        </ul>
                        <ul className="main-nav">
                            <li>
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle caret>
                                        <img src={imgsrc} className="user-photo" />
                                        <span className="d-md-down-none">{userName}</span>
                                    </DropdownToggle>
                                    <DropdownMenu >
                                        <Link to="/profile"> <DropdownItem className="dropdownitem"> Profile</DropdownItem></Link>
                                        <DropdownItem divider />
                                        <Link to="/"> <DropdownItem onClick={this.Logout} className="dropdownitem" > Logout</DropdownItem></Link>
                                    </DropdownMenu>
                                </Dropdown>
                            </li>
                        </ul>

                    </div>
                </header>
                {this.props.children}
                <Footer />
            </div>
        );
    }
}


class Footer extends React.Component {
    render() {
        return (
            <div>
                <div className="footer">
                    <h5> Appiness © 2019 </h5>
                </div>
            </div>
        );
    }
}

export default withRouter(Layout);


// class Header extends React.Component {
//     render() {
//         const { userName } = this.props

//         return (
//             <div>
//                 <header>
//                     <div>
//                         <ul className="main-nav">
//                             <Link to="/layout"><li> HOME </li></Link>
//                             <Link to="/layout/vendors"><li> VENDORS </li></Link>
//                             <Link to="/layout/products"> <li>PRODUCTS </li></Link>
//                             <Link to="/login"> <li> LOGOUT </li></Link>
//                         </ul>
//                         <Link to="/layout"><img style={{ marginLeft: '40px', height: '70px', width: '200px' }} src="/src/img/iqss-logo.png" alt="logo" /></Link>
//                     </div>
//                 </header>
//             </div>
//         );
//     }
// }

