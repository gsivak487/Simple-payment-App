import React from "react"
import { connect } from "react-redux"
import { IndexLink, Link } from "react-router";
import axios from "axios";
import Moment from 'react-moment';

import { fetchInvoicesForUser } from "../actions/invoiceAction"
import { fetchInvoiceDetailes, fetchInvoiceDetailesList } from "../actions/invoiceDetailesAction"

@connect((store) => {
  return {
    invoices: store.invoices.invoices,
    loginUser: store.loginUser.loginUser
  };
})

export default class invoicesForUser extends React.Component {

  componentDidMount() {
    const currentuser = JSON.parse(window.sessionStorage.getItem('loginuser'));
    var token = currentuser.token;
    var ID = currentuser.loginuserdata[0].UserID;
    var user = {
      userID: ID,
      token: token
    }
    this.props.dispatch(fetchInvoicesForUser(user));
  }

  showDetailes(invoiceID) {
    const currentuser = JSON.parse(window.sessionStorage.getItem('loginuser'));
    var token = currentuser.token;
    var invoiceID = invoiceID
    this.props.dispatch(fetchInvoiceDetailesList(invoiceID, token));
    var fechIDS = this.props.dispatch(fetchInvoiceDetailes(invoiceID, token));

    fechIDS.then((response) => {
      if (response > 0) {
        alert("invalid InvoiceID");
      } else {
        this.props.history.push("/invoicedetailes");
      }
    })

  }

  render() {

    return (
      <div className="container" >
        <div className="row">

          <div className="col-md-3 col-md-offset-2" style={{ padding: 0 }}>

            <div class="widget widget-default widget-item-icon" onclick="location.href='pages-messages.html';">
              <div class="widget-item-left">
                <span class="glyphicon glyphicon-log-in"></span>
              </div>
              <div class="widget-data">
                <div class="widget-int num-count">50,480</div>
                <div class="widget-title">Total money Received</div>
              </div>
              <div class="widget-controls">
                <a href="#" class="widget-control-right widget-remove" data-toggle="tooltip" data-placement="top" title="Remove Widget"><span class="glyphicon glyphicon-remove"></span></a>
              </div>
            </div>


          </div>
          <div className="col-md-3">

            <div class="widget widget-default widget-item-icon" onclick="location.href='pages-messages.html';">
              <div class="widget-item-left">
                <span class="glyphicon glyphicon-log-out"></span>
              </div>
              <div class="widget-data">
                <div class="widget-int num-count">48,520</div>
                <div class="widget-title">Total money Sent</div>
              </div>
              <div class="widget-controls">
                <a href="#" class="widget-control-right widget-remove" data-toggle="tooltip" data-placement="top" title="Remove Widget"><span class="glyphicon glyphicon-remove"></span></a>
              </div>
            </div>
          </div>
          <div className="col-md-3">

            <div class="widget widget-default widget-item-icon" onclick="location.href='pages-messages.html';">
              <div class="widget-item-left">
                <span class="glyphicon glyphicon-retweet"></span>
              </div>
              <div class="widget-data">
                <div class="widget-int num-count">48</div>
                <div class="widget-title">Total Number of Transactions</div>
              </div>
              <div class="widget-controls">
                <a href="#" class="widget-control-right widget-remove" data-toggle="tooltip" data-placement="top" title="Remove Widget"><span class="glyphicon glyphicon-remove"></span></a>
              </div>
            </div>
          </div>


        </div>

        <div className="row">
          <div className="col-md-11 col-md-offset-1" style={{ padding: 0 }}>
            <div className="panel panel-success red-top-border">
              <div className="panel-heading">
                <div className="panel-title-box">
                  <h3 className="panel-title">Recent transactions</h3>
                </div>
              </div>
              <div className="panel-body padding-0">
                <table className="table table-striped">
                  <thead>
                    <tr><th>Date</th><th>Reference Number</th><th>Transactions Details</th><th>Transactions Amount</th></tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>10-05-2019</td>
                      <td>29AAFFH0903A423</td>
                      <td>Paid to Suresh S</td>
                      <td>Rs: 200.00</td>
                    </tr>
                    <tr>
                      <td>03-05-2019</td>
                      <td>29AAFFH090SDF23</td>
                      <td>Reseved from Siva</td>
                      <td>Rs: 320.00</td>
                    </tr>
                    <tr>
                      <td>31-04-2019</td>
                      <td>29AAFFH0923DFSA3</td>
                      <td>Paid to Ramesh</td>
                      <td>Rs: 244.00</td>
                    </tr>
                    <tr>
                      <td>23-04-2019</td>
                      <td>SDSD32QADADQW3</td>
                      <td>Paid to Pradeep</td>
                      <td>Rs: 254.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
