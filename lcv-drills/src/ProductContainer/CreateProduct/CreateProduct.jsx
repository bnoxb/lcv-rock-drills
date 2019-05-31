import React, { Component } from 'react';

class CreateProduct extends Component {
    constructor(){
        super();
        this.state = {
            data:{
                company: "none",
                companyKey: "none",
                type: "none",
                part_number: "",
                file: null
            },
            showTypes: false,
            message: "",
            types: null,
            companies: null
            
        }
    }

    componentDidMount(){
        this.setCompanies();
    }

    handleChangeCompany = (e) => {
        const company = e.target.value;
        this.setState({
            data:{
                ...this.state.data,
                company: this.props.companyList[company].stringName,
                companyKey: company
            },
        });

        this.setPartTypes(company);
    }

    handleChangeType = async (e) => {
        await this.setState({
            data:{
                ...this.state.data,
                type: e.target.value
            },
            canGetParts: true
        });
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

    setCompanies = () => {
        const companies = Object.keys(this.props.companyList).map((company, i)=>{
            return(
                <option key={i} value={company}>{this.props.companyList[company].stringName}</option>
            )
        });
        this.setState({
            companies: companies
        })
    }

    setPartTypes = (company) => {
        const types = this.props.companyList[company].partTypes.map((type, i)=>{
            return(
                <option key={i} value={type}>{type}</option>
            )
        });

        this.setState({
            showTypes: true,
            types: types
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.data.company === "none" || this.state.data.type ==="none" || !this.state.data.file){
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
                        <select name="company" onChange={this.handleChangeCompany} value={this.state.data.companyKey} >
                            <option value="none">Select Company</option>
                            {this.state.companies}
                        </select>
                    </label>
                    {this.state.showTypes ? 
                                        <label>
                                            Type:
                                            <select name="type" onChange={this.handleChangeType} value={this.state.data.type} >
                                                <option value="none">Select Category</option>
                                                {this.state.types}
                                            </select>
                                        </label> 
                                    : null}
                    
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