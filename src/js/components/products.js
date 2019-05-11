import React from 'react';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


export default class products extends React.Component {
  constructor(props){
      super(props);
      this.state={
        products:[],
               }
  }

  
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
}
  componentDidMount(){
    $.ajax({
        url: "http://localhost:3000/getproducts",
        type: "GET",
        dataType: 'json',
        ContentType: 'application/json',
        success: function(data) {  
            this.setState({products: data});
        }.bind(this),
        error: function(jqXHR) {
            console.log(jqXHR);
        }.bind(this)
    });
  }

  saveProducts(row) {
     var newProduct = {
         'name': row.ItemName,
         'desp':row.ItemDescription,
         'price':row.Price
          }
     $.ajax({
       url: "http://localhost:3000/saveproducts",
       dataType: 'json',
       type: 'POST',
       data: newProduct,
       success: function(data) {       
           alert(data.data);       
        //    this.setState(this.getInitialState());
           this.componentDidMount
          
       }.bind(this),
       error: function(xhr, status, err) {
          alert(err);     
       }.bind(this)
     });
   }


deleteProducts(rowKeys){
  debugger;
    var productid = {
        'id': rowKeys
           }; 
    $.ajax({
        url: "http://localhost:3000/deleteproducts",
        type: "POST",
        dataType: 'json',
        data: productid,
        ContentType: 'application/json',
        success: function(data) {         
         alert(data.data); 
         this.setState(this.getInitialState());
         this.componentDidMount();
        }.bind(this),
        error: function(jqXHR) {
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
      const options ={
         afterInsertRow: this.saveProducts,   
         afterDeleteRow: this.deleteProducts,  
      }
     return (  
       <div className="container">
         <h1> Load Money </h1>
         <hr />
         <div class="panel panel-success col-md-8 col-md-offset-2" style={{ padding: 0 }}>
         <form type="submit" class="form-horizontal">
           <div className="panel-body">
             <div class="form-group">
               <label class="col-md-2 control-label">Card Numner</label>
               <div class="col-md-10">
                 <input type="text" class="form-control" id="user" name="name" onChange={this.handleChange.bind(this)} />
               </div>
             </div>
             <div class="form-group">
               <label class="col-md-2 control-label">Expair On</label>
               <div class="col-md-4">
                 <input type="text" class="form-control datepicker" id="user" name="name" onChange={this.handleChange.bind(this)} />
               </div>
               <label class="col-md-1 control-label">CCV</label>
               <div class="col-md-3">
                 <input type="number" class="form-control" id="user" name="name" onChange={this.handleChange.bind(this)} />
               </div>
             </div>
             <div class="form-group">
               <label class="col-md-2 control-label">NameOnTheCard</label>
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
              <button className="btn btn-primary pull-right">Add</button>
          </div>
           </form>
         </div>
       </div>
      );
   }

nameValidator(value) {
    if (!value) {
      return 'Name is required!';
    } else if (value.length < 4) {
      return 'Name length must great 4 char';
    }
    return true;
}
descValidator(value){
    
    if (!value) {
        return 'Description is required!';
      } else if (value.length < 10) {
        return 'Description  length must great 10 char';
      }
      return true;
}
priceValidator(value){
    if (!value) {
        return 'Price is required!';
      } 
      return true;
  }
priceFormatter(cell, row){
    return 'Rs: ' + cell;
  }

}


      // return (  
      //       <div className="container">
      //       <BootstrapTable data={products} options = {options}
      //           selectRow={ selectRow }
      //           insertRow = {true} 
      //           deleteRow ={true} 
      //           exportCSV
      //           search
      //           pagination >
      //            <TableHeaderColumn dataField="ProductId" hidden isKey autoValue>ID</TableHeaderColumn>
      //            <TableHeaderColumn dataField="ItemName"  className='good' editable={ { type: 'textarea', validator: this.nameValidator } }>Item NAME</TableHeaderColumn>
      //            <TableHeaderColumn dataField="ItemDescription"  editable={ { type: 'textarea', validator: this.emailValidator } }>Item Desc</TableHeaderColumn>
      //            <TableHeaderColumn dataField="Price"  editable={ { type: 'textarea', validator: this.phoneValidator } } dataFormat={this.PhoneFormatter}>Item Price</TableHeaderColumn>
      //        </BootstrapTable>
      //       </div>
      // );
 