import React, { Component } from 'react';

class SearchProducts extends Component {
    constructor(){
        super();
        this.state = {
            reqNum: "",
            
        }
    }

    handleChange =(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // this.props.handleLoading();
        this.props.handleSearch(this.state.reqNum);
    }



    render(){
        return(
            <div>
                <h1></h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleChange} name="reqNum" value={this.state.reqNum}/>
                    <input type="Submit"/>
                </form>
                <button name="showSearch" onClick={this.props.closeForm.bind(this)}>Close Search</button>
            </div>
        )
    }
};

export default SearchProducts;