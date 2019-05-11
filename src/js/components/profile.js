import React from 'react';
import { connect } from "react-redux";
import{FormGroup,Col,Label,Input} from 'reactstrap';
import axios from 'axios';
import { error } from 'util';

export default  class Profile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        file: '',
        imagePreviewUrl: ''
      };
      const {loginUser} = this.props;

      this._handleImageChange = this._handleImageChange.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(e) {
      e.preventDefault();
      const {loginUser} = this.props;
      let file = this.state.file;
     // var fileName =  { name:loginUser[0].UserName}
      const data = new FormData();
      data.append('file', file);
     // data.append('filename',fileName.name)
      axios.post('http://localhost:3000/saveprofileimg', data)
      .then((response) => {
        console.log(response.data);
        alert(response.data.res);
      }).catch((error)=>{
        console.log(error);
        alert(response.data.err);
      })
    }
  
    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
      reader.readAsDataURL(file)
    }

  
    render() {
     // const {loginUser} = this.props;
      const loginUser = JSON.parse(window.sessionStorage.getItem('loginuser'));
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} className="preview" />);
      }else {
        $imagePreview = (<div className="previewText">Select an Image for Profile</div>);
      }
  
      return (
        <div className="container" >
           <h3> User Details</h3>
            <hr/>
               <div>
                <div style={{float:'left',width:'49%'}}>
                    UserNAME : <h5> {loginUser.loginuserdata[0].UserName}</h5>
                    UserEmail : <h5> {loginUser.loginuserdata[0].EmailAddress}</h5>
                </div>
                <div style={{float:'left',width:'49%'}}>
                    FirstName : <h5> {loginUser.loginuserdata[0].FirstName}</h5>
                    LastName : <h5> {loginUser.loginuserdata[0].LastName}</h5>
                </div>
               </div>
               <br/>
                <form onSubmit={this._handleSubmit}>
                     {$imagePreview}
                    <input type="file" accept="image/*" name="filetoupload" onChange={this._handleImageChange} />
                    <button type="submit" style={{marginTop:'5px'}}>Upload Image</button>
                </form>
        </div>
      )
    }
  
  }






























  
//   imageUpload = (e) => {
//     const file = e.target.files[0];
//     getBase64(file).then(base64 => {
//       localStorage["fileBase64"] = base64;
//       console.log("file stored",base64);
//     });
// };

// <input 
// type="file" 
// id="imageFile" 
// name='imageFile' 
// onChange={this.imageUpload.bind(this)} />

//   const getBase64 = (file) => {
//     return new Promise((resolve,reject) => {
//        const reader = new FileReader();
//        reader.onload = () => resolve(reader.result);
//        reader.onerror = error => reject(error);
//        reader.readAsDataURL(file);
//     });
//   }