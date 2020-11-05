import React, { Component } from 'react'
import { connect } from 'react-redux';

export class Numpad extends Component {
    
    render() {
        return (
            <div className="btn-group-vertical col-12" role="group" aria-label="Basic example">
                <button onClick={this.test}>test</button>
                <div className="btn-group">
                    <input className="text-center form-control-lg mb-2 col-12" id="code" name="idpelanggan" value={this.props.code} autoComplete="off" readOnly/>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-outline-secondary py-3" value="1" onClick={this.props.onClickHandle}>1</button>
                    <button type="button" className="btn btn-outline-secondary py-3" value="2" onClick={this.props.onClickHandle}>2</button>
                    <button type="button" className="btn btn-outline-secondary py-3" value="3" onClick={this.props.onClickHandle}>3</button>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-outline-secondary py-3" value="4" onClick={this.props.onClickHandle}>4</button>
                    <button type="button" className="btn btn-outline-secondary py-3" value="5" onClick={this.props.onClickHandle}>5</button>
                    <button type="button" className="btn btn-outline-secondary py-3" value="6" onClick={this.props.onClickHandle}>6</button>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-outline-secondary py-3" value="7" onClick={this.props.onClickHandle}>7</button>
                    <button type="button" className="btn btn-outline-secondary py-3" value="8" onClick={this.props.onClickHandle}>8</button>
                    <button type="button" className="btn btn-outline-secondary py-3" value="9" onClick={this.props.onClickHandle}>9</button>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-outline-secondary py-3" value="backspace" onClick={this.props.onClickHandle}>&lt;</button>
                    <button type="button" className="btn btn-outline-secondary py-3" value="0" onClick={this.props.onClickHandle}>0</button>
                    <button type="submit" className="btn btn-primary py-3" onClick={this.props.goHandleSubmit}>Go</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        code : state.code
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        onClickHandle : (event) => dispatch({type: 'CHANGE_CODE_NUMPAD', value: event.target.value})
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Numpad)