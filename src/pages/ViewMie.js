import React, { Component } from 'react'
import {Container, Row, Button, Col, Input} from 'reactstrap'

import ControlStep from "./ControlStep.js"

export class ViewMie extends Component {
    numberFormat = (number)=>{
        return new Intl.NumberFormat('id-ID', { maximumSignificantDigits: 3 }).format(number)
    }

    onGetMie = (dt, props)=>{
        this.props.getProductDetail(dt, props);
    }

    render() {
        return (
            <Row>
                {this.props.productDetail.map(dt => (
                    <div className="col-md-2 mb-2 text-center" key={dt.id} >
                        <button className="btn p-10" onClick={() => this.onGetMie(dt, this.props)} style={{border: "2px solid #b9bbff", borderRadius: "15px"}}>
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
            </Row>
        )
    }
}

export default ViewMie
