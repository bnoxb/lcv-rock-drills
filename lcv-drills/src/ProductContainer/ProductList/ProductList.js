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
            companies: null,
            types: null,
            showTypes: false
        }
    }

    setPartTypes = (company) => {

        const typeList = Object.keys(this.props.companyList[company].partTypes);
        console.log(typeList);

        const types = typeList.map((type, i)=>{
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
            }
        });
        this.props.getTheParts(this.state.data);
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
                            {this.props.companyHTML}
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
                    <button name="showProducts" onClick={this.props.closeForm.bind(this)}>Close Create Form</button>
                </form>
                <ul>
                    {parts}
                </ul>
            </div>
        )
    }
}

export default ProductList;