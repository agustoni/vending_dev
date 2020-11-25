import React, { Component } from 'react'
import { connect } from 'react-redux';

export class Numpad extends Component {
    constructor(props){
        super(props);
        this.state = {
            'code' : ''
        }
    }

    handleInput = (e) =>{
        let typed = e.target.value
        let code = this.state.code + typed

        this.setState({
            ...this.state,
            'code': code
        })
    }

    handleDelete = (e) =>{
        let code = this.state.code
        let newCode = ''

        if(code !== ""){
            newCode = code.slice(0, -1)
        }
        
        this.setState({
            ...this.state,
            'code': newCode
        })
    }

    handleSubmit = ()=>{
        let code = this.state.code
        this.props.handleCode(code)
    }

    render() {
        return (
            <div className="btn-group-vertical col-12" role="group" aria-label="Basic example">
                <div className="btn-group">
                    <input className="text-center form-control-lg mb-2 col-12" id="code" name="idpelanggan" value={this.state.code} autoComplete="off" readOnly/>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-outline-secondary py-3" value="1" onClick={this.handleInput}>1</button>
                    <button type="button" className="btn btn-outline-secondary py-3" value="2" onClick={this.handleInput}>2</button>
                    <button type="button" className="btn btn-outline-secondary py-3" value="3" onClick={this.handleInput}>3</button>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-outline-secondary py-3" value="4" onClick={this.handleInput}>4</button>
                    <button type="button" className="btn btn-outline-secondary py-3" value="5" onClick={this.handleInput}>5</button>
                    <button type="button" className="btn btn-outline-secondary py-3" value="6" onClick={this.handleInput}>6</button>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-outline-secondary py-3" value="7" onClick={this.handleInput}>7</button>
                    <button type="button" className="btn btn-outline-secondary py-3" value="8" onClick={this.handleInput}>8</button>
                    <button type="button" className="btn btn-outline-secondary py-3" value="9" onClick={this.handleInput}>9</button>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-outline-secondary py-3" value="backspace" onClick={this.handleDelete}>&lt;</button>
                    <button type="button" className="btn btn-outline-secondary py-3" value="0" onClick={this.handleInput}>0</button>
                    <button type="submit" className="btn btn-primary py-3" onClick={this.handleSubmit}>Go</button>
                </div>
            </div>
        )
    }
}

export default Numpad