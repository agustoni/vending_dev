import React, { Component } from 'react'
import {Container, Row, Button, Col, Input} from 'reactstrap'
import axios from 'axios';

import ControlStep from "./ControlStep.js"
// import Numpad from './Numpad'
// import ConfirmDialog from '../component/Dialog'

export class ProductPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            'dataProduct': [],
            'topping': [],
            'spice': []
        }
    }

    componentDidMount(){
        axios.get('http://localhost/api/vending_machine/product.php')
        .then(res => {
            this.setState({
                ...this.state,
                'dataProduct': res.data.product,
                'topping': res.data.topping,
                'spice': res.data.spice,

            }, ()=>{
                console.log(res.data)
            })
        })
        .catch(function (error) {

        });
    }

    selectProduct = (dt, controlStep) =>{
        this.props.selectProduct(dt, controlStep, this.state.topping, this.state.spice);
    }

    render() {
        return (
            <div>
                {/* <button onClick={()=>this.props.byPass(this.props)}>finish PPOB</button> */}
                <Container className="mt-5">
                    <Row>
                        {this.state.dataProduct.map(dt => (
                            <div className="col-md-4 mb-3 text-center" key={dt.id} >
                                <button className="btn p-10" onClick={() => this.selectProduct(dt, this.props)} style={{border: "2px solid #b9bbff", borderRadius: "15px"}}>
                                    <img className="img-fluid" src={`${process.env.PUBLIC_URL}/images/products/${dt.image}`} style={{maxWidth: "250px",marginLeft: "auto",marginRight: "auto"}} alt={dt.name} />
                                </button>
                            </div>
                        ))}
                    </Row> 
                    <ControlStep controlStep={this.props} />
                </Container>
            </div>
        )
    }
}


// export default connect(mapStateToProps)(ProductPage)
export default ProductPage
