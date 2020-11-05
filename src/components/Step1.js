import React, { Component } from 'react'
import axios from 'axios';
import {Container, Row, Button, Modal, ModalHeader, ModalBody} from 'reactstrap'
import { connect } from 'react-redux'

import Numpad from './Numpad'
import ConfirmDialog from './Dialog'

export class Step1 extends Component{
    constructor(props){
        super(props)
        this.state = {
            dataProduct : [],
            selectedProduct: {},
            showmodal : false,
            opendialog: false
        }
    }

    //GET DATA PRODUCT
    componentDidMount(){
        axios.get('http://localhost/api/product.php')
        .then(res => {
            this.setState({
                ...this.state,
                dataProduct :res.data
            });
            // console.log(this.state.dataProduct);
        })
        .catch(function (error) {

        });
    }

    onSelectProduct = (data) => {
        if(data.id_category === '1'){//jika PPOB
            this.setState({
                ...this.state,
                showmodal: false,
                selectedProduct: data
            }, () => {
                this.props.selectProduct(this.state.selectedProduct);
                // this.props.nextStep();
            })
        }else{//jika MIE
            this.setState({
                ...this.state,
                showmodal: true,
                selectedProduct: data
            });  
        }
    }

    hideModal = () => {
        this.setState({
            ...this.state,
            showmodal: false
        }, () =>{
            this.props.setcode();
        });
    }

    submitMieQty = () => {
        if(this.props.code !== '' && this.props.code !== 0){
            this.setConfirmOpen(true);
        }else{
            alert('Anda belum memasukan jumlah pembelian')
        }
    }

    setConfirmOpen = (bool) =>{
        console.log(this.props.code);
        if(bool){
            this.setState({
                ...this.state,
                opendialog: true
            })
        }else{
            this.setState({
                ...this.state,
                opendialog: false
            })
        }
    }

    handleConfirmDialog = (bool) => {
        if(bool){
            // console.log(this.state);
            // console.log("===============");
            this.setState({
                ...this.state,
                showmodal: false,
                opendialog: false,
            }, ()=>{
                this.props.selectProduct(this.state.selectedProduct);
                // this.props.nextStep();
                
            });
        }
    }

    render(){
        return(
            <Container className="mt-5">
                <Row>
                    {this.state.dataProduct.map(dt => (
                        <div className="col-md-4 mb-3 text-center" key={dt.id} >
                            <button className="btn p-10" onClick={() => this.onSelectProduct(dt)} style={{border: "2px solid #b9bbff", borderRadius: "15px"}}>
                                <img className="img-fluid" src={"/images/products/"+dt.image} style={{maxWidth: "250px",marginLeft: "auto",marginRight: "auto"}} alt={dt.name} />
                            </button>
                        </div>
                    ))}
                </Row> 
                <Modalmie show={this.state.showmodal} modalClose={() => this.hideModal()} goHandleSubmit={() => this.submitMieQty()}></Modalmie>
                <ConfirmDialog title={"Jumlah yang anda masukan adalah "+ this.props.code + " ?"} open={this.state.opendialog} setOpen={() => this.setConfirmOpen()} onConfirm={(bool) => this.handleConfirmDialog(bool)}></ConfirmDialog>
            </Container>
        )
    }
}

const Modalmie = props =>{
    return (
        <div>
          <Modal isOpen={props.show} toggle={props.modalClose} className="modal-dialog-centered">
            <ModalHeader toggle={props.modalClose}>Modal title</ModalHeader>
            <ModalBody>
              <Numpad goHandleSubmit={props.goHandleSubmit} ></Numpad>
            </ModalBody>
          </Modal>
        </div>
      );
}

const mapStateToProps = (state) => {
    return{
        code : state.code
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setcode : () => dispatch({type: 'CHANGE_CODE_NUMPAD', value: ''})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Step1)