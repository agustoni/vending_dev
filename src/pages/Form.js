import React, {Component} from 'react'
import axios from 'axios';

import StepWizard from 'react-step-wizard';
import {Container, Row, Button, Col, Input} from 'reactstrap'
// import {Container, Row, Button, Col, Input} from 'reactstrap'

//COMPONENT
import ProductPage from "./ProductPage.js"
import ViewMie from "./ViewMie.js"
import Topping from "./Topping.js"
import ViewPpob from "./ViewPpob.js"
import Payment from "./Payment.js"
import ProcessOrder from "./ProcessOrder.js"

export class Form extends Component {

    constructor(props){
        super(props)
        this.state = {
            'dataProductDetail': [],
            'topping': [],
            'spice': [],
            'selectedProduct': {},
            'selectedPrdDetail': [],
            'qris': {},
            'dataOrder': {},
            'totalPriceMie': 0,
            'paymenyStat': false,
            'timerCountDown': false,
            'processOrder': false,
        }
    }

    stepChange = (step) => {

    }

    onSelectProduct = (dataProduct, controlStep, topping, spice)=>{
        this.setState({
            ...this.state,
            'selectedProduct' : dataProduct,
            'topping': topping,
            'spice': spice
        }, ()=>{
            if(dataProduct.id_category === '1'){//PPOB
                controlStep.goToStep(4);
                this.orderPpob(this.state.selectedProduct.id);
            }else{//MIE
                controlStep.goToStep(2);
                this.orderMie(this.state.selectedProduct.id);
            }
        })
    }

//ORDER MIE
    orderMie = (idProduct)=>{
        axios.get('http://localhost/api/vending_machine/productdetail.php',{
            params:{
                idproduct : idProduct
            }
        })
        .then(res => {
            this.setState({
                ...this.state,
                'dataProductDetail': res.data
            }, ()=>{
               
            })
        })
        .catch(function (error) {
            
        });
    }

    onGetMie = (selectedPrdDetail, controlStep) =>{
        this.setState({
            ...this.state,
            'selectedPrdDetail': selectedPrdDetail
        },()=>{
            controlStep.goToStep(3);
        })
    }
    
    onSelectTopping = (dataOrderMie, controlStep) =>{
        this.setState({
            ...this.state,
            'dataOrder': dataOrderMie.dataOrder,
            'ttlamount': dataOrderMie.dataOrder.totalPrice
        },()=>{
            // console.log("onseltop")
            // console.log(this.state)
            this.getQris(controlStep)
            controlStep.goToStep(5);
        })
    }
//ORDER MIE

//ORDER PPOB
    orderPpob = (idProduct)=>{
        axios.get('http://localhost/api/vending_machine/productdetail.php',{
            params:{
                idproduct : idProduct
            }
        })
        .then(res => {
            this.setState({
                ...this.state,
                'dataProductDetail': res.data
            })
        })
        .catch(function (error) {
            
        });
    }

    onGetCode = (code, selectedPrdDetail, controlStep)=>{
        this.setState({
            ...this.state,
            'code': code,
            'selectedPrdDetail': selectedPrdDetail,
            'ttlamount': selectedPrdDetail.selling_price
        }, ()=>{
            controlStep.nextStep()
            this.getQris(controlStep)
        })
    }
//ORDER PPOB
//PAYMENT
    getQris = (controlStep)=>{
        axios.get('http://localhost/api/vending_machine/qris.php',{
            params:{
                'ttlamount': this.state.ttlamount
            }
        })
        .then(res => {
            this.setState({
                ...this.state,
                'qris': res.data,
                'timerCountDown': true,
            }, ()=>{
                let duration = 60 * 1
                let display = document.querySelector('#time')

                this.startTimer(duration, display)
                this.cekPayment(controlStep)
            })
        })
        .catch(function (error) {
            
        });
    }

    cekPayment = (controlStep) => {
        let postParam

        if(this.state.selectedProduct.id_category === "1"){
            postParam = {
                'trxNo' : this.state.qris.data.transactionNo,
                'reffNo': this.state.qris.data.referenceNo,
                'method': this.state.selectedProduct.method,
                'code': this.state.selectedPrdDetail.code,
                'customerId': this.state.code,
                'type': this.state.selectedProduct.id_category,
                'ttlamount': this.state.ttlamount,
                'idDetail': this.state.selectedPrdDetail.id
            }
        }else{
            postParam = {
                'dataOrder': this.state.dataOrder,
                'trxNo' : this.state.qris.data.transactionNo,
                'reffNo': this.state.qris.data.referenceNo,
                'type': this.state.selectedProduct.id_category,
                'ttlamount': this.state.ttlamount,
                'idDetail': this.state.selectedPrdDetail.id
            }
        }

        let interval = setInterval(() => {
            axios.get('http://localhost/api/vending_machine/cekpayment.php',{
                params: postParam
            })
            .then(res => {
                if(res.data.success === true){
                    this.setState({
                        ...this.state,
                        'paymenyStat': true,
                        'timerCountDown': false,
                        'dataOrder': {
                            'trxNo' : this.state.qris.data.transactionNo,
                            'reffNo': this.state.qris.data.referenceNo,
                            'method': this.state.selectedProduct.method,
                            'code': this.state.selectedPrdDetail.code,
                            'customerId': this.state.code,
                            'type': this.state.selectedProduct.id_category,
                            'ttlamount': this.state.ttlamount,
                            'idDetail': this.state.selectedPrdDetail.id,
                            'noTrxPpob': res.data.no_trx_ppob
                        }
                    }, ()=>{
                        clearInterval(interval)
                        controlStep.nextStep()
                        this.processingOrder(controlStep)
                    })
                }
            })
            .catch(function (error) {
                
            });
        }, 5000);
    }

    startTimer = (duration, display, counting) => {//timer qris
        let timer = duration, minutes, seconds;
        let countStart = setInterval(() => {
            if(this.state.timerCountDown === false){
                clearInterval(countStart)
            }else{
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);
        
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
        
                display.textContent = minutes + ":" + seconds;
        
                if (--timer < 0) {
                    timer = duration;
                    window.location.reload()
                }
            }
        }, 1000);
    }

    onStopTimer = ()=>{
        this.setState({
            ...this.state,
            'timerCountDown': false
        },()=>{
            window.location.reload()
        })
    }
//PAYMENT
//PROCESS ORDER
    processingOrder = (controlStep)=>{
        if(this.state.dataOrder.type === '1'){//cek ppob
            let cekPpob = setInterval(() => {
                axios.get('http://localhost/api/vending_machine/cekppob.php',{
                    params:{
                        'noTrxPpob' : this.state.dataOrder.noTrxPpob,
                    }
                })
                .then(res => {
                    if(res.data.success === true){
                        this.setState({
                            ...this.state,
                            'processOrder': true
                        }, ()=>{
                            clearInterval(cekPpob)
                        })
                    }
                })
                .catch(function (error) {
                    
                });
            }, 3000);
        }else{
            let cekMie = setInterval(() => {
                this.setState({
                    ...this.state,
                    'processOrder': true
                }, ()=>{
                    clearInterval(cekMie)
                })
            }, 3000);
        }
    }
//PROCESS ORDER
    goToStep5 = (controlStep)=>{
        this.setState({
            ...this.state,
            'dataOrder':{
                'code': "OVO20H",
                'customerId': "123456",
                'idDetail': "1",
                'method': "rajabiller.game",
                'reffNo': "AA0012011069091",
                'trxNo': "AA0012011069091",
                'ttlamount': "22000",
                'type': "1"
            },
        }, ()=>{
            controlStep.goToStep(6);

            if(this.state.dataOrder.type === '1'){
                let cekPpob = setInterval(() => {
                    axios.get('http://localhost/api/vending_machine/cekppob.php',{
                        params:{
                            'noTrxPpob' : "563",
                        }
                    })
                    .then(res => {
                        if(res.data.success === true){
    
                            this.setState({
                                ...this.state,
                                'processOrder': true
                            }, ()=>{
                                clearInterval(cekPpob)
                            })
                            // controlStep.nextStep()
                            // this.processingOrder()
                        }
                    })
                    .catch(function (error) {
                        
                    });
                }, 3000);
            }else{

            }
        })
    }
    
    render() {
        return (
            <div>
                {/* <interval/> */}
                <StepWizard className="content-wrapper mt-5 pl-5 pr-5" onStepChange={(step) => this.stepChange(step)}>
                    <ProductPage byPass={(controlStep)=>this.goToStep6(controlStep)} 
                                selectProduct={(dataProduct, controlStep, topping, spice) => this.onSelectProduct(dataProduct, controlStep, topping, spice)}/>
                    <ViewMie productDetail={this.state.dataProductDetail} 
                            getProductDetail={(selectedPrdDetail, controlStep)=>this.onGetMie(selectedPrdDetail, controlStep)} />
                    <Topping dataOrderMie={(dataOrderMie, controlStep)=>this.onSelectTopping(dataOrderMie, controlStep)} 
                            selectedPrdDetail={this.state.selectedPrdDetail} 
                            selectedPrd={this.state.selectedProduct} 
                            dataTopping={this.state.topping} 
                            dataSpice={this.state.spice}
                            curStep={(step)=>this.stepChange(step)}/>
                    <ViewPpob productDetail={this.state.dataProductDetail} 
                            getCode={(code, selectedPrdDetail, controlStep)=>this.onGetCode(code, selectedPrdDetail, controlStep)}/>
                    <Payment postDataOrder={this.state.selectedPrdDetail} 
                            qris={this.state.qris} stopTimer={()=>this.onStopTimer()}/>
                    <ProcessOrder dataOrder={this.state}/>
                </StepWizard>    
            </div>
        )
    }
}


export default Form
