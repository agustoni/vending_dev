import React, { Component } from 'react'
import {Container, Row, Button, Col, Input, Modal, ModalHeader, ModalBody} from 'reactstrap'

import ControlStep from "./ControlStep.js"
import Numpad from "../components/Numpad.js"
import ConfirmDialog from '../components/Dialog'

export class ViewPpob extends Component {

    constructor(props){
        super(props);
        this.state = {
            'showmodal' : false,
            'opendialog' : false,
            'code':'',
            'selectedPrdDetail' : {},
            // 'product' : []
        }
    }

    numberFormat = (number)=>{
        return new Intl.NumberFormat('id-ID', { maximumSignificantDigits: 3 }).format(number)
    }

//MODAL PPOB
    showModal = (data, props) => {
        this.setState({
            ...this.state,
            'showmodal': true,
            'selectedPrdDetail': data,
            'props': props
        })
    }

    hideModal = () => {
        this.setState({
            ...this.state.dataAssesment,
            'showmodal': false
        });
    }

    goHandleCode = (code)=>{
        this.setState({
            ...this.state.dataAssesment,
            'code': code
        }, ()=>{
            this.setConfirmOpen(true)
        });
    }

    setConfirmOpen = (bool) => {
        this.setState({
            ...this.state,
            'opendialog': bool
        });
    }

    handleConfirmDialog = (bool, props) => {
        if(bool){
            this.setState({
                ...this.state,
                'showmodal': false,
                'opendialog': false
            }, ()=>{
                props.getCode(this.state.code, this.state.selectedPrdDetail, props);
            });
        }
    }
//MODAL PPOB

    render() {
        return (
            <Row>
                {this.props.productDetail.map(dt => (
                    <div className="col-md-2 mb-2 text-center" key={dt.id} >
                        <button className="btn p-10" onClick={() => this.showModal(dt, this.props)} style={{border: "2px solid #b9bbff", borderRadius: "15px"}}>
                            <div>
                                <img className="img-fluid" src={`${process.env.PUBLIC_URL}/images/products/${dt.image}`} style={{marginLeft: "auto",marginRight: "auto"}} alt={dt.name} />
                            </div>
                            <div>
                                {dt.name}
                                <br/>
                                Rp {this.numberFormat(dt.selling_price)}
                            </div>
                        </button>
                    </div>
                ))}
                <ControlStep controlStep={this.props} />
                <ModalPpob getCode={(code)=>this.goHandleCode(code)} show={this.state.showmodal} modalClose={() => this.hideModal()}/>
                <ConfirmDialog title={"Jumlah yang anda masukan adalah "+ this.state.code + " ?"} open={this.state.opendialog} setOpen={(bool) => this.setConfirmOpen(bool)} onConfirm={(bool) => this.handleConfirmDialog(bool, this.props)}/>
            </Row>
        )
    }
}

const ModalPpob = (props) => {

    return ( 
      <div>
        <Modal isOpen={props.show} toggle={props.modalClose} className="modal-dialog-centered">
          <ModalHeader toggle={props.modalClose}>Modal title</ModalHeader>
          <ModalBody>
            <Numpad handleCode={(code)=>props.getCode(code)}></Numpad>
          </ModalBody>
        </Modal>
      </div>
    );
}

export default ViewPpob
