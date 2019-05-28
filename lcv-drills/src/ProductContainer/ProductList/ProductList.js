import React, { Component } from 'react';

class ProductList extends Component {
    constructor(){
        super();
        this.state = {
            data: {
                companyKey: "none",
                company: "none",
                type: "none"
            },
            companyPicked: false,
            canGetParts: true,
            companies: null,
            types: null,
            showTypes: false
        }
    }
    componentDidMount(){
        this.setCompanies();
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
                    <select disabled={this.state.isDisabled} name="company" onChange={this.handleChangeCompany} value={this.state.data.companyKey} >
                        <option value="none">Select Company</option>
                        {this.state.companies}
                    </select>
                </label>
                {this.state.showTypes ? <label>
                                            Type:
                                            <select name="type" onChange={this.handleChangeType} value={this.state.data.type} >
                                                <option value="none">Select Category</option>
                                                {this.state.types}
                                            </select>
                                        </label> 
                                        : null}
                
                </form>
                <ul>
                    {parts}
                </ul>
            </div>
        )
    }
}

export default ProductList;