import React, { Component } from 'react'
import StepWizard from 'react-step-wizard';
// import Step1 from './Step1';
// import Step2 from './Step2';
import { connect, useSelector } from 'react-redux'
import axios from 'axios';

import Step1 from './Step1'
import Step2 from './Step2'

export class Form extends Component {
    
    stepChange = (step) => {
        console.log("step change");
        console.log(this.state.code);
        console.log("================");
        // console.log(step);
        // let stepAction = '';
        // if(step.previousStep === 1 && step.activeStep === 2){ // simpan data idproduct, idcategory, method ke global state (redux store)
        //     stepAction = 'NEXT1TO2';
        //     console.log(this.state.dataProduct)
        // }
        // this.props.handleStepChange(stepAction, this.state.dataProduct)
    }

    onSelectProduct = (data) => {
        this.setState({
            ...this.state,
            selectedProduct : data
        })
    }
    
    render(){
        return(
            <StepWizard onStepChange={(step) => this.stepChange(step)}>
                <Step1 selectProduct={(data)=>this.onSelectProduct(data)}></Step1>
                <Step2></Step2>
                {/* <Step1 productClick={(data)=>this.onProductClick(data)}>

                </Step1>
                <Step2>

                </Step2> */}
            </StepWizard>
        )
    }
}

export default Form;