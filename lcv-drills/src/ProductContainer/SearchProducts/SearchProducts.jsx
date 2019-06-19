import React, { Component } from 'react';
import styled from 'styled-components';

const Input = styled.input`
    height: 1rem;
    background-color: #F99058;
    width: 15rem;
    margin-left: 5rem;
    margin-right: 2rem;
    font-size:1rem;
    padding: .5rem;
`
const Item = styled.div`
    padding: 1rem;
`

const Form = styled.form`
    display: flex;
    justify-content: center;
    margin-right: 5rem;
    align-content: center;
    position: sticky;
    top: 10rem;
    left: 20rem;
`

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
        this.props.refresh();
        this.props.handleSearch(this.state.reqNum);
    }



    render(){
        return(
                <Form onSubmit={this.handleSubmit}>
                    <Item>
                        <Input type="text" onChange={this.handleChange} name="reqNum" value={this.state.reqNum}/>
                        <input type="Submit"/>
                    </Item>
                </Form>

        )
    }
};

export default SearchProducts;