import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import validator from 'validator'
import { history } from '../history'

import { checklogin } from "../actions/loginAction";

class RegisterUser extends React.Component {
    constructor(props) {
        super(props);
        window.sessionStorage.removeItem('loginuser');
        this.state = {
            uName: '',
            uEmail: '',
            uMobile: '',
            uPassword: '',
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    RegisterUSer(e) {
        e.preventDefault();
        this.setState({ submitted: true });

        var submit = true;

        if($('#user').val() == ''){
            submit  = false;
        }

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
            <div className="register">
                <div style={{ paddingTop: '12%' }}>
                    <form type="submit" class="form-horizontal" onSubmit={this.RegisterUSer.bind(this)} >
                        <div class="panel panel-success col-md-4 col-md-offset-4" style={{padding:0}}>
                            <div className="panel-heading">
                                <h3 className="panel-title">Register User</h3>
                            </div>
                            <div className="panel-body">
                                <div class="form-group">
                                    <label class="col-md-2 control-label">UserName</label>
                                    <div class="col-md-10">
                                        <input type="text" class="form-control" id="user" name="name" onChange={this.handleChange.bind(this)}/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">FirstName</label>
                                    <div class="col-md-10">
                                        <input type="text" class="form-control" id="user" name="name" onChange={this.handleChange.bind(this)}/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">LastName</label>
                                    <div class="col-md-10">
                                        <input type="text" class="form-control" id="user" name="name" onChange={this.handleChange.bind(this)}/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">Email</label>
                                    <div class="col-md-10">
                                        <input type="Email" class="form-control" id="user" name="name" onChange={this.handleChange.bind(this)} />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">Mobile</label>
                                    <div class="col-md-10">
                                        <input type="number" class="form-control"  id="user" name="name" onChange={this.handleChange.bind(this)}/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">Password</label>
                                    <div class="col-md-10">
                                        <input type="password" class="form-control" id="user" name="name" onChange={this.handleChange.bind(this)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-footer">
                                <label>Back to <Link to="/login"><a style={{color:'#d43c41'}}>Login</a></Link></label>
                                <button className="btn btn-primary pull-right">Register</button>
                            </div>
                        </div> 
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

export default connect(mapStateToProps)(RegisterUser)
