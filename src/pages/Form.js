import React, {Component, Fragment, useState} from 'react'


import StepWizard from 'react-step-wizard';
import {Row, Button, Col, Input} from 'reactstrap'

//COMPONENT
import ProductPage from "./ProductPage.js"
import ViewMie from "./ViewMie.js"
import ViewPpob from "./ViewPpob.js"
import Payment from "./Payment.js"
// import ControlPage from "./pages/ControlPage.js"

export class Form extends Component {

    // constructor(props){
    //     super(props)
    //     this.state = {
    //         dataProduct : {}
    //     }
    // }
    stepChange = (step) => {
        console.log("step changed");
        console.log(step)
        // let stepAction = '';
        // if(step.previousStep === 1 && step.activeStep === 2){ // simpan data idproduct, idcategory, method ke global state (redux store)
        //     stepAction = 'NEXT1TO2';
        //     console.log(this.state.dataProduct)
        // }
        // this.props.handleStepChange(stepAction, this.state.dataProduct)
    }

    onSelectProduct = (idProduct)=>{
        this.setState({
            ...this.state,
            selectedProduct : idProduct
        }, ()=>{
            console.log("<Form> on select product");
            console.log(this.state);
        })
        
    }

    render() {
        return (
            <div>
                <StepWizard className="content-wrapper mt-5 pl-5 pr-5" onStepChange={(step) => this.stepChange(step)}>
                    {/* <ControlPage/> */}
                    <ProductPage selectProduct={(idProduct) => this.onSelectProduct(idProduct)} />
                
                    {/* <ViewMie/> */}
                    {/* <ViewPpob/> */}
                    {/* <Payment/> */}
                </StepWizard>    
            </div>
        )
    }
}

// const { SW, demo } = this.state;

export default Form
