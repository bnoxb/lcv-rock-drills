import React, { Component } from 'react';

class HomePage extends Component {
    constructor(){
        super();
        this.state = {
            message: "Heeeeyyyy"
        }
    }
    render(){
        return(
            <div>
                <p>{this.state.message}</p>
            </div>
        )
    }
}

export default HomePage;