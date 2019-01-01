import React from 'react'
const axios = require("axios");

class allTakenCoursesUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('csvFile',this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:5000/uploadAll",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });
        alert("The file is successfully uploaded");
    }
    
    onChange(e) {
        this.setState({file:e.target.files[0]});
    }

    render() {
        return (
            <div className="containerFluid">
            <div className="row" style={{margin:0,padding:0}}>
            <div className="col-sm-4"></div>
            <div className="col-sm-4" style={{marginTop:'10%'}}>
            <form onSubmit={this.onFormSubmit}>
                <h4 style={{padding:'2%',color:'green'}}>File Upload</h4>
                <input type="file" name="csvFile" onChange= {this.onChange} />
                <button type="submit">Upload</button>
            </form>
            
            
            </div>
            <div className="col-sm-4"></div>

            </div>

            </div>
           
        )
    }
}

export default allTakenCoursesUpload;