import React, { Component } from 'react'

export class Step2 extends Component {
    render() {
        return (
            <div id="step2">
                 
                <button onClick={() => this.props.previousStep()}>Prev</button>
            </div>
        )
    }
}

export default Step2
