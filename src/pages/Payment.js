import React, { Component } from 'react'
import {Container, Row, Button, Col, Input} from 'reactstrap'
import ControlStep from "./ControlStep.js"
// import axios from 'axios';

export class Payment extends Component {    

    stopTimer = ()=>{
        this.props.stopTimer()
    }

    render() {
        let trxNo = (typeof this.props.qris.data !== 'undefined')? this.props.qris.data.transactionNo : ""

        var React = require('react');
        var QRCode = require('qrcode.react');
        let renderQr

        if(this.props.qris.data){
            renderQr = <QRCode size={300} level="H" value={this.props.qris.data ? this.props.qris.data.qrisData : ''} />
        }else{
            renderQr = <img className="img-fluid" src={`${process.env.PUBLIC_URL}/images/icons/loading_noodle.gif`} style={{marginLeft: "auto",marginRight: "auto"}} alt="loading noodle" />
        }
        
        return (
            <Container>
                <Row>
                    <Col md="12 text-center">
                        <h2>Scan QR Code</h2><br/>
                        <h2>{trxNo}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md="12" style={{display: "flex", justifyContent: "center"}}>
                        {/* <img style={{height: "60vh"}} src={this.props.qris.qrisData} alt="qr code" /> */}
                        {/* <QRCode size={300} level="H" value={this.props.qris.data ? this.props.qris.data.qrisData : ''} /> */}
                        {renderQr}
                    </Col>
                </Row>
                <Row>
                    <Col md="12 text-center">
                        <span id="time" style={{fontSize: "40px"}}>01:00</span>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <button type="button" onClick={()=>{this.stopTimer()}} className="btn btn-primary col-12">Back</button>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <ControlStep controlStep={this.props} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Payment
