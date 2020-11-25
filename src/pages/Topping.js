import React, { Component } from 'react'
import {Row, Col} from 'reactstrap'

import ControlStep from "./ControlStep.js"

export class Topping extends Component {
    constructor(props){
        super(props)
        this.state = {
            'spicePrice': 0,
            'toppingPrice':0,
            'totalPrice': 0,
            'productPrice': 0,
            'spiceLevel': 0,
            'toppingSelected': [],
            'spiceSelected': null,
            'qty': 1
        }
    }

    // componentDidUpdate(prevProps, prevState) {
    //     console.log(this.props.currentStep);
    //     if(this.props.currentStep === 3){
    //         this.setState({
    //             ...this.state,
    //             'totalPrice': this.props.selectedPrdDetail.selling_price,
    //             'productPrice': this.props.selectedPrdDetail.selling_price,
    //         })
    //     }
        
    // }

    selectSpice = (ds, idx)=>{
        let spiceLevel = document.getElementsByClassName("spice-level");
        let spicePrice = ds.price

        for (var i = 0; i < spiceLevel.length; i++) {
            if(i <= idx){
                spiceLevel.item(i).src = `${process.env.PUBLIC_URL}/images/icons/chili-colored.png`
            }else{
                spiceLevel.item(i).src = `${process.env.PUBLIC_URL}/images/icons/chili-empty.png`
            }
        }
        
        this.setState({
            ...this.state,
            'spicePrice': spicePrice,
            'totalPrice': (parseInt(this.props.selectedPrdDetail.selling_price) + parseInt(spicePrice) + parseInt(this.state.toppingPrice)) * this.state.qty,
            'spiceSelected': ds.id
        }, ()=>{
            this.changeTotal(this.state.totalPrice)
        })
    }

    selectTopping = (dt)=>{
        let toppingEl = document.getElementById("topping_"+dt.id)
        let checkIcon =  document.getElementById("selectTopping_"+dt.id)
        let toppingPrice = 0
        let toppingSelected = this.state.toppingSelected

        if(toppingEl.classList.contains("selected")){
            toppingEl.style = "width: 100px; cursor: pointer;"
            toppingEl.classList.remove("selected");
            checkIcon.className = "invisible"
            toppingPrice = parseInt(this.state.toppingPrice) - parseInt(dt.price)
            toppingSelected.splice(toppingSelected.indexOf(dt.id),1)
            
        }else{
            toppingEl.style = "width: 100px; cursor: pointer;opacity: 0.5"
            toppingEl.className = "list-topping selected";
            checkIcon.classList.remove("invisible")
            toppingPrice = parseInt(this.state.toppingPrice) + parseInt(dt.price)
            toppingSelected = this.state.toppingSelected.concat([dt.id])
        }

        this.setState({
            ...this.state,
            'toppingPrice': toppingPrice,
            'totalPrice': (parseInt(this.props.selectedPrdDetail.selling_price) + parseInt(this.state.spicePrice) + parseInt(toppingPrice)) * this.state.qty,
            'toppingSelected': toppingSelected
        }, ()=>{
            this.changeTotal(this.state.totalPrice)
        })
    }

    resetSpice = ()=>{
        let spiceLevel = document.getElementsByClassName("spice-level");
        let spicePrice = 0
        for (var i = 0; i < spiceLevel.length; i++) {
            spiceLevel.item(i).src = `${process.env.PUBLIC_URL}/images/icons/chili-empty.png`
        }

        this.setState({
            ...this.state,
            'spicePrice': 0,
            'totalPrice': (parseInt(this.props.selectedPrdDetail.selling_price) + parseInt(spicePrice) + parseInt(this.state.toppingPrice)) * this.state.qty,
            'spiceSelected': null
        }, ()=>{
            this.changeTotal(this.state.totalPrice)
        })
    }

    subQty = ()=>{
        let qty = document.getElementById("qty")
        let changedQty = parseInt(qty.value)
        let currentQty = changedQty

        if(qty.value > 1){
            changedQty--
            currentQty = changedQty
            this.setState({
                ...this.state,
                'totalPrice': (parseInt(this.props.selectedPrdDetail.selling_price) + parseInt(this.state.spicePrice) + parseInt(this.state.toppingPrice)) * currentQty,
                'qty': currentQty
            }, ()=>{
                this.changeTotal(this.state.totalPrice)
            })
        }

        qty.value = changedQty
    }

    addQty = ()=>{
        let qty = document.getElementById("qty")
        let changedQty = parseInt(qty.value)
        let currentQty = changedQty

        if(qty.value < 5){
            changedQty++
            currentQty = changedQty
            this.setState({
                ...this.state,
                'totalPrice': (parseInt(this.props.selectedPrdDetail.selling_price) + parseInt(this.state.spicePrice) + parseInt(this.state.toppingPrice)) * currentQty,
                'qty': currentQty
            }, ()=>{
                this.changeTotal(this.state.totalPrice)
            })
        }

        qty.value = changedQty
    }

    changeTotal = (totalPrice)=>{
        document.getElementById("totalPrice").innerHTML = ""
        document.getElementById("totalPrice").innerHTML = "Rp "+totalPrice
    }

    orderMie = (controlStep)=>{
        // console.log("control step")
        // console.log(controlStep)
        this.setState({
            ...this.state,
            'productPrice': this.props.selectedPrdDetail.selling_price,//kalo ga dibuat begini, harga product undefined
            'totalPrice': (parseInt(this.props.selectedPrdDetail.selling_price) + parseInt(this.state.spicePrice) + parseInt(this.state.toppingPrice)) * this.state.qty,
        }, ()=>{
            this.props.dataOrderMie({
                "dataOrder":this.state
            }, controlStep)
            // console.log("Topping")
            // console.log(this.state)
        })
    }

    render() {
        
        let dataMie = this.props.selectedPrdDetail
        let mieImg = (this.props.selectedPrd.id === "6")? "https://i.gifer.com/87WD.gif" : "https://thumbs.gfycat.com/BitterCleverIberianmidwifetoad-size_restricted.gif"

        return (
            <Row style={{minHeight: "80vh", display: "flex", alignItems: "center"}}>
                <Col md={{ size: 4, offset: 1 }}>
                    <div>
                        <img className="img-fluid" src={mieImg} alt={dataMie.name} />
                        {/* {`${process.env.PUBLIC_URL}/images/products/${dataMie.image}`} */}
                    </div>
                    <div className="mt-5 text-center">
                        <button onClick={()=>this.orderMie(this.props)}className="btn btn-success col-md-12">ORDER</button>
                    </div>
                </Col>
                <Col md="6">
                    <h3>Tambahan:</h3>
                    <ul style={{listStyle: "none"}}>
                        <li className="mt-5">
                            <h4>Level Pedas</h4>
                            <div className="row-fluid">
                            {this.props.dataSpice.map((ds, idx) => (
                                <img className="spice-level" alt={ds.level} 
                                    onClick={()=>this.selectSpice(ds, idx)} 
                                    key={"spice_"+ds.id} 
                                    src={`${process.env.PUBLIC_URL}/images/icons/chili-empty.png`}  
                                    style={{borderStyle: "none", maxWidth: "70px", margin: "0px 10px", cursor: "pointer"}} />
                            ))}
                            <button className="btn btn-danger" style={{marginLeft: "25px"}} onClick={()=>this.resetSpice()}>Level 0</button>
                            </div>
                        </li>
                        <li className="mt-5">
                            <h4>Topping</h4>
                            <div className="row">
                                {this.props.dataTopping.map(dt => (
                                    <div className="col-md-3 text-center" key={dt.id} >
                                        <img onClick={()=>this.selectTopping(dt)} 
                                            id={"topping_"+dt.id} 
                                            className="list-topping" 
                                            src={`${process.env.PUBLIC_URL}/images/icons/${dt.icon}`} 
                                            alt={dt.level} 
                                            style={{width: "100px", cursor: "pointer"}}/>
                                        <img onClick={()=>this.selectTopping(dt)} id={"selectTopping_"+dt.id} className="invisible" src={`${process.env.PUBLIC_URL}/images/icons/check-icon.png`} alt={dt.level} style={{width: "100px", position: "absolute", left: "35px", cursor: "pointer"}}/>
                                    </div>
                                ))}
                            </div>
                        </li>
                        <li className="mt-3">
                            <h4>Qty</h4>
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="btn-group">
                                        <button onClick={()=>this.subQty()} className="btn btn-secondary" style={{width: "50px"}}>-</button>
                                        <input className="form-control" id="qty" defaultValue="1" style={{height:"50px", width: "100px", textAlign: "center"}} />
                                        <button onClick={()=>this.addQty()}  className="btn btn-secondary" style={{width: "50px"}}>+</button>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <h2 id="totalPrice">Rp {this.props.selectedPrdDetail.selling_price}</h2>
                                </div>
                            </div>
                        </li>
                    </ul>
                </Col>
                <ControlStep controlStep={this.props} />
            </Row>
        )
    }
}

export default Topping
