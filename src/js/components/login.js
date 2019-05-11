import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import validator from 'validator'
import { history } from '../history'

import { checklogin } from "../actions/loginAction";

// @connect((store) => {
//     return {
//       loginUser: store.loginUser.loginUser
//     };
//   })

class Login extends React.Component {
    constructor(props) {
        super(props);
        window.sessionStorage.removeItem('loginuser');
        this.state = {
            name: '',
            pass: '',
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    AdminLogin(e) {
        e.preventDefault();

        this.setState({ submitted: true });

        if (this.state.name == "" || this.state.pass == "") {
            if (!$('#user').val()) {
                $('#usererror').text("Please Enter UserName")
            } else {
                $("#usererror").empty();
            }
            if (!$('#password').val()) {
                $('#passerror').text("Please Enter Password")
            } else {
                $("#passerror").empty();
            }
        }
        else {
            $(".validation").empty();
            var user = {
                name: this.state.name,
                pass: this.state.pass
            }
            this.props.dispatch(checklogin(user))
                .then((response) => {
                    if (response.data.loginuserdata) {
                        history.push("/home");
                    } else {
                        this.refs.passs.value = null
                        ReactDOM.findDOMNode(this.refs.passs).focus();
                        $('.lable-1').text('Username or password is incorrect').delay(2000).show().fadeOut('slow');
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    render() {

        return (
            <div className="login">
                <div>
                    <form type="submit" onSubmit={this.AdminLogin.bind(this)} >
                        <div >
                            <h2 >Login</h2><br />
                            <h3 className='lable-1' ></h3><br />

                            <div >
                                <label><b>USER NAME</b></label><br />
                                <input type="text" placeholder="UserName" id="user" name="name" onChange={this.handleChange.bind(this)} required />
                            </div> <span className='validation' id="usererror"></span> <br />

                            <div>
                                <label><b>PASSWORD</b></label><br />
                                <input type="password" placeholder="Password" id="password" name="pass" ref='passs' onChange={this.handleChange.bind(this)} required />
                            </div> <span className='validation' id="passerror"></span><br />

                            <div class="clearfix">
                                <button id="button" className="btn btn-primary" onClick={this.AdminLogin.bind(this)}>Login</button>
                            </div>

                            <div style={{marginTop:'20px'}}>
                                <label>Don't have an account yet? <Link to="/RegisterUSer"><a style={{color:'#d43c41'}}>Create an account</a></Link></label>
                            </div>
                        </div>
                        <br /><br />
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loginUser } = state.loginUser;
    return { loginUser };
}

export default connect(mapStateToProps)(Login)
