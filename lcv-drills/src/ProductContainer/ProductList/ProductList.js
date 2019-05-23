import React, { Component } from 'react';

class ProductList extends Component {
    constructor(){
        super();
        this.state = {
            data: {
                company: "none",
                type: "none"
            },
            isDisabled: false,
            canGetParts: true
        }
    }

    handleChange = async (e) => {
        await this.setState({
            data:{
                ...this.state.data,
                [e.target.name]: e.target.value
            },
            canGetParts: true
        });

        this.checkFormCompletion();

    }

    checkFormCompletion = (e) => {
        if(this.state.data.company != "none" && this.state.data.type != "none"){
            console.log('gonna get the parts');
            console.log(this.state.data);
            this.props.getTheParts(this.state.data);

            this.setState({
                canGetParts: false
            })
        }
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
                    <select disabled={this.state.isDisabled} name="company" onChange={this.handleChange} value={this.state.data.company} >
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
                </form>
                <ul>
                    {parts}
                </ul>
            </div>
        )
    }
}

export default ProductList;