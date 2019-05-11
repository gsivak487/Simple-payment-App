import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch} from "react-router-dom";
import {history} from './src/js/history'
import { Provider } from "react-redux"
// import 'bootstrap/dist/css/bootstrap.css';

import {PrivateRoute} from './src/js/components/privateroute' 
import Login from './src/js/components/login';
import RegisterUSer from './src/js/components/RegisterUser'
import Register from './src/js/components/Register';
import Users from './src/js/components/users';

import Layout from './src/js/Layout';

import Profile from './src/js/components/profile'
import InvoicesForUser from './src/js/components/invoicesForUser'
import Vendors from './src/js/components/vendors'
import Products from './src/js/components/products'


import store from'./src/js/store/store'




const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>           
           <Switch>
               <PrivateRoute exact path='/'component={Layout}/>
               <Route  path="/login" exact component={Login}></Route>
               <Route  path="/RegisterUSer" exact component={RegisterUSer}></Route>
           <Layout>
           <div>        
                <Route exact  path="/home" component={InvoicesForUser}></Route> 
                <Route  path="/tansactions"  component={Vendors}></Route> 
                <Route  path="/loadmoney" component={Products}></Route>
                <Route  path="/sendmoney" component={Register}></Route>
                <Route  path="/users" component={Users}></Route>
                <Route  path="/profile" component={Profile}></Route>
            </div>
               </Layout>
           </Switch>
        </Router>
    </Provider>,
app);
    