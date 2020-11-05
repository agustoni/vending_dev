import React, { Component } from 'react'
import {Container, Row, Button, Col, Input} from 'reactstrap'
import axios from 'axios';
// import Numpad from './Numpad'
// import ConfirmDialog from '../component/Dialog'

export class ProductPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataProduct: [],
            // idProduct:'',
        }
    }

    componentDidMount(){
        axios.get('http://localhost/api/product.php')
        .then(res => {
            this.setState({
                ...this.state,
                dataProduct: res.data
            })
        })
        .catch(function (error) {

        });
    }

    selectProduct = (dt) =>{
        console.log("data product")
        console.log(dt)
        console.log("=========================")
        this.props.selectProduct(dt.id);
        // this.setState({
        //     ...this.state,
        //     idProduct: val
        // }, ()=>{
        //     this.props.selectProduct(this.state.idProduct);
        // });

    }

    render() {
        return (
            <div>
                {/* ProductPage */}
                <Container className="mt-5">
                <Row>
                    {this.state.dataProduct.map(dt => (
                        <div className="col-md-4 mb-3 text-center" key={dt.id} >
                            <button className="btn p-10" onClick={() => this.selectProduct(dt)} style={{border: "2px solid #b9bbff", borderRadius: "15px"}}>
                                <img className="img-fluid" src={"/images/products/"+dt.image} style={{maxWidth: "250px",marginLeft: "auto",marginRight: "auto"}} alt={dt.name} />
                            </button>
                        </div>
                    ))}
                </Row> 
                    {/* <Modalmie show={this.state.showmodal} modalClose={() => this.hideModal()} goHandleSubmit={() => this.submitMieQty()}></Modalmie> */}
                    {/* <ConfirmDialog title={"Jumlah yang anda masukan adalah "+ this.props.code + " ?"} open={this.state.opendialog} setOpen={() => this.setConfirmOpen()} onConfirm={(bool) => this.handleConfirmDialog(bool)}></ConfirmDialog> */}
                </Container>
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
//     return{
//         idProduct : state.idProduct
//     }
// }

// export default connect(mapStateToProps)(ProductPage)
export default ProductPage
