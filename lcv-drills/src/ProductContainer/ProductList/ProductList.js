import React, { Component } from 'react';
import ProductTables from './ProductTables/ProductTables';
import styled from 'styled-components';

const RadioLabel = styled.label`
    display: inline-block;
    backgroud-color:#ddd;
    padding: 10px 20px;
    font-family: Arial;
    font-size: 16px;
    border: 2px solid #444;
    border-radius: 4px;
    &:hover {
        background-color:#dfd;
    }
    
   
`

const Radio = styled.input`
    display: none;
    &:checked + ${RadioLabel} {
        background-color:#bfb;
        border-color:#4c4;
    }
`



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
            companies: null,
            types: null,
            showTypes: false,
            showParts: false,
            isLoading: false,
        }
    }

    componentDidMount(){
        this.setCompanies();
    }

    handleChangeCompany = async (e) => {
        console.log("CLICKed", e.target.value);
        const company = e.target.value;
        const string = this.props.companyNames[company];

        await this.setState({
            data:{
                ...this.state.data,
                company: string,
                companyKey: company
            },
        });
        this.setCompanies();
        this.props.toggleShowParts();
        // this.setPartTypes(company);
    }

    handleChangeType = async (e) => {
        await this.setState({
            data:{
                ...this.state.data,
                type: e.target.value
            }
        });
        this.props.toggleShowParts();
        this.props.getTheParts(this.state.data);
        this.props.handleLoading();
    }

    setPartTypes = (company) => {
        const typeNames = Object.keys(this.state.companyList[company].partTypes);
        const types = typeNames.map((type, i)=>{
            return(
                <option key={i} value={type}>{type}</option>
            )
        });

        this.setState({
            typeHTML: types,
            showTypes: true,
            typeNames: typeNames
        });
    }

    setCompanies = () => {
        
        const companies = Object.keys(this.props.companyNames).map((company, i)=>{
            return(
                <div key={i}>
                        <Radio type="radio" value={company} name="companies" id={company} onChange={this.handleChangeCompany} checked={this.state.data.companyKey === company}/>
                        <RadioLabel htmlFor={company}>{this.props.companyNames[company]}</RadioLabel>
                </div>
                    
            )
        });
        this.setState({
            companies,
            showTypes: true
        })
    }

    handleClick = (e) => {
        console.log('in the handlClick')
        e.preventDefault();
        console.log(e.target.value);
    }

    render(){
        return(
            <div>
                {/* <form>
                    <label>
                        Company:
                        <select disabled={this.state.isDisabled} name="company" onChange={this.handleChangeCompany} value={this.state.data.companyKey} >
                            <option value="none">Select Company</option>
                            {this.props.companyHTML}
                        </select>
                    </label>
                    {this.props.showTypes ? <label>
                                                Type:
                                                <select name="type" onChange={this.handleChangeType} value={this.state.data.type} >
                                                    <option value="none">Select Category</option>
                                                    {this.props.typeHTML}
                                                </select>
                                            </label> 
                                            : null}
                    <button name="showProducts" onClick={this.props.closeForm.bind(this)}>Close Product List Form</button>
                </form> */}

                <form>
                    {this.state.companies}
                </form>

                <ul>
                    {/* {parts} */}
                </ul>
                { this.props.showParts ? <ProductTables partsList={this.props.partsList} selectedInfo={this.props.selectedInfo}/> : null }
            </div>
        )
    }
}




export default ProductList;