import React, { Component } from 'react';

class CreateProduct extends Component {
    constructor(){
        super();
        this.state = {
            data:{
                company: "none",
                type: "none",
                part_number: "",
                file: null
            },
            message: ""
            
        }
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            data:{
                ...this.state.data,
                [e.target.name]: e.target.value,
            }
        })
    }

    handleChangeFile = (e) => {
        this.setState({
            message: "",
            data:{
                ...this.state.data,
                file: e.target.files[0]
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        if(this.state.data.company === "none" || this.state.data.type ==="none" || !this.state.data.file){
            console.log(this.state);
            this.setState({
                message: "REQUIRED FIELDS MUST BE FILLED"
            })
        }else{
            this.props.upload(this.state.data);
        }
    }

    render(){
        return(
            <div>
                {this.state.message}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Company:
                        <select name="company" onChange={this.handleChange} value={this.state.data.company} >
                            <option value="none">Select Company</option>
                            <option value="Gardner Denver">Gardner Denver</option>
                        </select>
                    </label>
                    <label>
                        Type:
                        <select name="type" onChange={this.handleChange} value={this.state.data.type} >
                            <option value="none">Select Category</option>
                            <option value="Compressor Parts and More">Compressor Parts and More</option>
                        </select>
                    </label>
                    <label>
                        CSV File:
                        <input type="file" name="file" accept="*.csv" onChange={this.handleChangeFile} />
                    </label>
                    <input type="submit" value="UPLOAD" />
                </form>
                <button onClick={this.props.closeForm.bind(null)}>Close Create Form</button>
            </div>
        )
    }
}

export default CreateProduct;