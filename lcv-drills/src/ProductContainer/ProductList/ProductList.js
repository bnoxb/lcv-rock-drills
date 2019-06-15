import React, { Component } from 'react';
import ProductTables from './ProductTables/ProductTables';



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

    handleChangeCompany = (e) => {
        const company = e.target.value;
        const string = this.props.getCompanyName(company);

        this.setState({
            data:{
                ...this.state.data,
                company: string,
                companyKey: company
            },
        });

        this.props.toggleShowParts();
        this.props.setPartTypes(company);
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
                    {this.props.companyHTML}
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