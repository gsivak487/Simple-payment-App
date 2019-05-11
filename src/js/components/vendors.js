import React from 'react';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
var rowData = [];
export default class Vendors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vendors: [],
            VID: "",
            VName: "",
            VEmail: "",
            VPhone: ""
        }
    }

    handleChang(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    componentDidMount() {
       
        $.ajax({
            url: "http://localhost:3000/getTransactions",
            type: "GET",
            dataType: 'json',
            ContentType: 'application/json',
            success: function (data) {
                this.setState({ vendors: data });
                console.log(data);
            }.bind(this),
            error: function (jqXHR) {
                console.log(jqXHR);
            }.bind(this)
        });
    }

    saveVendor(row) {
        var newVendor = {
            'name': row.VendorName,
            'desp': "",
            'email': row.VendorEmail,
            'phone': row.Phone
        }
        $.ajax({
            url: "http://localhost:3000/savevendor",
            dataType: 'json',
            type: 'POST',
            data: newVendor,
            success: function (data) {
                alert(data.data);
                this.componentDidMount
            }.bind(this),
            error: function (xhr, status, err) {
                alert(err);
            }.bind(this)
        });
    }

    deleteVendor(rowKeys) {
        var vendorid = {
            'id': rowKeys
        };
        $.ajax({
            url: "http://localhost:3000/deletevendor",
            type: "POST",
            dataType: 'json',
            data: vendorid,
            ContentType: 'application/json',
            success: function (data) {
                alert(data.data);
                this.setState(this.getInitialState());
                this.componentDidMount();
            }.bind(this),
            error: function (jqXHR) {
                console.log(jqXHR);
            }.bind(this)
        });
    }

    render() {
        const selectRow = {
            mode: 'checkbox',
            onSelect: this.onRowSelect,
            bgColor: 'rgb(238, 193, 213)'
        };
        const options = {
            afterInsertRow: this.saveVendor,
            afterDeleteRow: this.deleteVendor,
        }
        return (
            <div>
                <div className="container">
                    <h1> All Transactions </h1>
                    <BootstrapTable data={this.state.vendors} options={options} ref='table'
                        trClassName={this.trClassNameFormat}
                        >
                        <TableHeaderColumn dataField="TransID" hidden isKey autoValue>Vendor ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="TransDate" editable={{ type: 'textarea' }} dataFormat={(val)=>{if(val == "" || val == null){return '29ABDPJ1385P1Z4';}else{return val;} }}>Date</TableHeaderColumn>
                        <TableHeaderColumn dataField="TransRefNumber" className='good' editable={{ type: 'textarea', validator: this.nameValidator }}>Reference Number</TableHeaderColumn>
                        <TableHeaderColumn dataField="TransDetails" editable={{ type: 'textarea', validator: this.emailValidator }}>Transactions Details</TableHeaderColumn>
                        <TableHeaderColumn dataField="TransAmount" editable={{ type: 'textarea', validator: this.phoneValidator }} dataFormat={this.PhoneFormatter}>Transactions Amount</TableHeaderColumn>
                    </BootstrapTable>
                </div>

            </div>

        );
    }

    nameValidator(value) {
        if (!value) {
            return 'Vendor Name is required!';
        } else if (value.length < 8) {
            return 'Vendor Name length must great 8 char';
        }
        return true;
    }
    emailValidator(value) {

        if (!value) {
            return 'Vendor email is required!';
        } else if (value) {
            var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            if (reg.test(value)) {
                return true;
            }
            else {
                return 'please give in proper format';
            }

        }
    }
    phoneValidator(value) {
        if (!value) {
            return 'Vendor phone is required!';
        } else if (value.length < 10) {
            return 'Vendor phone number should have 10 digits';
        }
        return true;
    }
    PhoneFormatter(cell, row) {
        if(cell != null){
            return 'Rs:- ' + cell+'.00';
        }
        return 'Rs:- ' +0+'.00';
    }

}