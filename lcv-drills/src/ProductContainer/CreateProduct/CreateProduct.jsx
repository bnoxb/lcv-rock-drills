import React, { Component } from 'react';

class CreateProduct extends Component {
    constructor(){
        super();
        this.state = {
            company: "",
            type: "",
            part_number: ""
        }
    }

    handleChange = () => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render(){
        return(
            <div>
                FORM GOES HERe
                <form>
                    <input type="text" name="company" value={this.state.company} onChange={this.handleChange}></input>
                </form>
                <button onClick={this.props.closeForm.bind(null)}>Close Create Form</button>
            </div>
        )
    }
}

export default CreateProduct;