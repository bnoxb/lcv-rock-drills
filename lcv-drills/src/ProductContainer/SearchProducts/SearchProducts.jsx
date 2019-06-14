import React, { Component } from 'react';
import { ShowProduct } from './ShowProduct/ShowProduct';

class SearchProducts extends Component {
    constructor(){
        super();
        this.state = {
            reqNum: "",
            part: {},
            showPart: false,
        }
    }

    handleChange =(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmitSearch = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:9000/parts/search/' + this.state.reqNum);
            if(!response.ok){
                throw Error(response.statusText);
            }

            const parsedResponse = await response.json();

            this.setState({
                part: parsedResponse.data,
                showPart: true
            });

        }catch(err){
            console.log(err);
        }

    }

    closeShowProduct = () => {
        this.setState({
            ShowProduct: false,
        })
    }

    render(){
        return(
            <div>
                <h1> SEARCHINGGGG</h1>
                <form onSubmit={this.handleSubmitSearch}>
                    <input type="text" onChange={this.handleChange} name="reqNum" value={this.state.reqNum}/>
                    <input type="Submit"/>
                </form>
                <button name="showSearch" onClick={this.props.closeForm.bind(this)}>Close Search</button>
                { this.state.showPart ? <ShowProduct part={this.state.part} /> : null }
            </div>
        )
    }
};

export default SearchProducts;