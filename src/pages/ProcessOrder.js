import React, { Component } from 'react'
import ControlStep from "./ControlStep.js"
import {Row} from 'reactstrap'

import '../css/ProcessLoading.css';

export class ProcessOrder extends Component {
    fadein = (element)=>{
        var op = 0.1;  // initial opacity
        element.style.display = 'block';
        var timer = setInterval(function () {
            if (op >= 1){
                clearInterval(timer);
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }, 30);
    }

    render() {
        if(this.props.dataOrder.processOrder){
            document.getElementById('ring-loading').style.display = "none"
            document.getElementById('wait-loading').style.display = "none"

            var thx = document.getElementById("thx");
            this.fadein(thx)
            
            setInterval(function(){
                window.location.reload()
            }, 3000)
        }

        return (
            <Row>
                <div className="loader">
                    <div className="ring" id="ring-loading" style={{position: "absolute", left: "450px"}}></div>
                    <h2 id="wait-loading" style={{position: "absolute"}}>Mohon Menunggu. . .</h2>
                    <h2 id="thx" style={{opacity: "0"}}>Pesanan Anda sudah diproses, Terima Kasih</h2>
                </div>
                <ControlStep controlStep={this.props} />
            </Row>
        )
    }
}

export default ProcessOrder
