import React, { Component } from 'react';

class ProductList extends Component {
    constructor(){
        super();
        this.state = {
            data: {
                key: "none",
                company: "none",
                type: "none"
            },
            companyPicked: false,
            canGetParts: true,
            companyList: {
                gardnerDenver: {
                    stringName: "Gardner Denver",
                    partTypes: [
                        "Portable Compressor Parts and More",
                        "Drill Parts",
                        "Pump Parts"
                    ]
                },
                atlasCopCo: {
                    stringName: "Atlas Copco",
                    partTypes:[
                        "Parts List"
                    ]
                },
                joy: {
                    stringName: "Joy",
                    partTypes: [
                        "Drill Parts",
                        "Compressor Parts"
                    ]
                },
                chicagoPneumatic: {
                    stringName: "Chicago Pneumatic",
                    partTypes: [
                        "Drill Parts",
                        "Compressor Parts"
                    ]
                },
                ingersollRand: {
                    stringName: "Ingersoll Rand",
                    partTypes: [
                        "Drill Parts",
                        "Compressor Parts"
                    ],
                }
            },
            companies: null,
            types: null
        }
    }
    componentDidMount(){
        this.setCompanies();
    }

    setCompanies = () => {
        const companies = Object.keys(this.state.companyList).map((company, i)=>{
            console.log(company);
            return(
                <option key={i} value={company}>{this.state.companyList[company].stringName}</option>
            )
        });
        this.setState({
            companies: companies
        })
    }

    setPartTypes = (company) => {
        const types = this.state.companyList[company].partTypes.map((type, i)=>{
            return(
                <option key={i} value={type}>{type}</option>
            )
        });

        this.setState({
            types: types
        });
    }

    handleChangeCompany = (e) => {
        const company = e.target.value;

        this.setState({
            data:{
                ...this.state.data,
                company: this.state.companyList[company].stringName,
                key: company
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
        console.log(this.state.data);
        this.props.getTheParts(this.state.data);
    }

    checkFormCompletion = (e) => {
            
            this.setState({
                canGetParts: false
            })
    }

    render(){
        const parts = this.props.partsList.map((part, i)=>{
            return(
                <li key={i}>
                    <h1>{part.part_number}</h1>
                </li>
            )
        })

        return(
            <div>
                <form>
                <label>
                    Company:
                    <select disabled={this.state.isDisabled} name="company" onChange={this.handleChangeCompany} value={this.state.data.key} >
                        <option value="none">Select Company</option>
                        {this.state.companies}
                    </select>
                </label>
                <label>
                    Type:
                    
                    <select name="type" onChange={this.handleChangeType} value={this.state.data.type} >
                        <option value="none">Select Category</option>
                        {this.state.types}
                    </select>
                </label>
                </form>
                <ul>
                    {parts}
                </ul>
            </div>
        )
    }
}

export default ProductList;