import React, { Component } from 'react';
import styled from 'styled-components'

const Title = styled.h1`
        font-size: 1.5em;
        text-align: center;
        color: #B83200;
    `;

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
                <Title>This is the Title</Title>
                <p>{this.state.message}</p>
            </div>
        )
    }
}

export default HomePage;