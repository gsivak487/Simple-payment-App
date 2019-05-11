import React, { Component } from 'react';
import axios from 'axios';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Button from 'material-ui/Button';
import Table, { TableBody, TableRow, TableHeader } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TableHead from 'material-ui/Table/TableHead';
import TableCell from 'material-ui/Table/TableCell';

const style = {
  margin: 12,
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        data:[]
    };
 }
componentDidMount(){
  
    axios.get('http://localhost:3000/getallusers')
        .then( (response) => {
            this.setState({data: response.data});
        })
        .catch((error) =>{
            console.log(error);
        })
  }
 
  render() {
    return (
          <div className='container'>
          <MuiThemeProvider>
           <div>
           <Paper >
                <Table >
                    <TableHead>
                    <TableRow>
                      <TableCell>UserName</TableCell>
                      <TableCell>FirstName</TableCell>
                      <TableCell>LastName</TableCell>
                      <TableCell>EmailAddress</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.data.map(n => {
                        return (
                        <TableRow key={n.UserID}>
                            <TableCell>{n.UserName}</TableCell>
                            <TableCell>{n.FirstName}</TableCell>
                            <TableCell>{n.LastName}</TableCell>
                            <TableCell>{n.EmailAddress}</TableCell>
                            <TableCell>
                            <Button  color="primary"  >Edit</Button>
                            </TableCell>
                            <TableCell>
                            <Button  color="primary"  >Delete</Button>
                            </TableCell>
                        </TableRow>
                        );
                    })}
                    </TableBody>
                </Table>
                </Paper >        
           </div>
          </MuiThemeProvider>
          </div>
        );
  }
}

export default App;

  

