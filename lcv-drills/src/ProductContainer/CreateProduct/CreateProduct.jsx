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
    render(){
        return(
            <div>
                FORM GOES HERE
                <button onClick={this.props.closeForm.bind(null)}>Close Create Form</button>
            </div>
        )
    }
}

export default CreateProduct;