import React from "react"
import { withRouter, Link } from "react-router-dom";
import axios from 'axios';

//import validator from 'validator';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: [],

        };

    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {

        axios.get('http://localhost:3000/getallusers')
            .then((response) => {
                console.log(response.data);
                this.setState({ allUsers: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
    }
    addUser(e) {
        $(".validation").empty();
        this.refs.firstname.value = ''
        this.refs.lastname.value = ''
        this.refs.username.value = ''
        this.refs.email.value = ''
    }
    saveUser(e) {

        var UserName = this.refs.username.value
        var FirstName = this.refs.firstname.value
        var LastName = this.refs.lastname.value
        var Email = this.refs.email.value
        if (!UserName || !FirstName || !LastName || !Email) {
            if (!$('#firstname').val()) {
                $('#firstnameerror').text("Please Enter FirstName")
            } else {
                $("#firstnameerror").empty();
            }
            if (!$('#lastname').val()) {
                $('#lastnameerror').text("Please Enter LastName")
            } else {
                $("#lastnameerror").empty();
            }
            if (!$('#username').val()) {
                $('#usernameerror').text("Please Enter UserName")
            } else {
                $("#usernameerror").empty();
            }
            if (!$('#email').val()) {
                $('#emailerror').text("Please Enter Email")
            } else {
                $("#emailerror").empty();
            }
        } else {
            $('#saveModal').modal('hide')
            var data = {
                UserName: this.refs.username.value,
                FirstName: this.refs.firstname.value,
                LastName: this.refs.lastname.value,
                Email: this.refs.email.value
            }
            axios.post('http://localhost:3000/saveuser', data)
                .then((response) => {
                    alert(response.data.data);
                    this.componentDidMount();
                })
                .catch((error) => {
                    alert(error.data);
                })
        }
    }
    editUser(user) {
        $(".validation").empty();
        this.refs.euserid.value = user.UserID
        this.refs.efirstname.value = user.FirstName
        this.refs.elastname.value = user.LastName
        this.refs.eusername.value = user.UserName
        this.refs.eemail.value = user.EmailAddress
    }
    updateUser() {

        var FirstName = this.refs.efirstname.value
        var LastName = this.refs.elastname.value
        var Email = this.refs.eemail.value
        if (!FirstName || !LastName || !Email) {
            if (!$('#elastname').val()) {
                $('#elastnameerror').text("Please Enter LastName")
            } else {
                $("#elastnameerror").empty();
            }
            if (!$('#eusername').val()) {
                $('#eusernameerror').text("Please Enter UserName")
            } else {
                $("#eusernameerror").empty();
            }
            if (!$('#eemail').val()) {
                $('#eemailerror').text("Please Enter Email")
            } else {
                $("#eemailerror").empty();
            }
        } else {
            $('#editModal').modal('hide')
            var data = {
                userID: this.refs.euserid.value,
                FirstName: this.refs.efirstname.value,
                LastName: this.refs.elastname.value,
                Email: this.refs.eemail.value
            }
            axios.post('http://localhost:3000/updateuser', data)
                .then((response) => {
                    alert(response.data.data);
                    this.componentDidMount();
                })
                .catch((error) => {
                    alert(error.data);
                })
        }
    }

    modelDelete(userID) {
        this.refs.deleteUserID.value = userID
    }

    deleteUser() {
        var data = {
            userID: this.refs.deleteUserID.value
        }
        axios.post('http://localhost:3000/deleteusers', data)
            .then((response) => {
                alert(response.data.data);
                this.componentDidMount();
            })
            .catch((error) => {
                alert(error.data);
            })
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <h1> Send Money </h1>
                    <hr />
                    <div class="panel panel-success col-md-8 col-md-offset-2" style={{ padding: 0 }}>
                        <form type="submit" class="form-horizontal">
                            <div className="panel-body">
                                <div class="form-group">
                                    <label class="col-md-2 control-label">Send To</label>
                                    <div class="col-md-10">
                                        <input type="text" class="form-control" id="user" name="name" onChange={this.handleChange.bind(this)} />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">Amount</label>
                                    <div class="col-md-10">
                                        <input type="text" class="form-control" id="user" name="name" onChange={this.handleChange.bind(this)} />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">Remarks</label>
                                    <div class="col-md-10">
                                        <input type="Email" class="form-control" id="user" name="name" onChange={this.handleChange.bind(this)} />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-2 control-label">Email / Mobile</label>
                                    <div class="col-md-10">
                                        <input type="text" class="form-control" id="user" name="name" onChange={this.handleChange.bind(this)} />
                                    </div>
                                </div>
                            </div>
                            <div className="panel-footer">
                                <button className="btn btn-default">Cancel</button>
                                <button className="btn btn-primary pull-right">Send</button>
                            </div>
                        </form>
                    </div>
                    <hr />

                    <div className="panel panel-success red-top-border">
                        <div className="panel-heading">
                            <div className="panel-title-box">
                                <h3 className="panel-title">All Users</h3>
                            </div>
                        </div>
                        <div className="panel-body padding-0">
                            <table className="table table-striped">
                                <thead>
                                    <tr><th>USER NAME</th><th>FIRST NAME</th><th>LAST NAME</th><th>EMAIL ADDRESS</th></tr>
                                </thead>
                                <tbody>
                                    {this.state.allUsers.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.UserName}</td>
                                            <td>{item.FirstName}</td>
                                            <td>{item.LastName}</td>
                                            <td>{item.EmailAddress}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>

            </div>
        );
    }
}
