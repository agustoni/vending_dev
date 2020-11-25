import React, { Component } from 'react'
import {Container, Row, Button, Col, Input} from 'reactstrap'

export class ControlPage extends Component {
    static propTypes = {

    }

    curStepChange = ()=>{

    }

    render() {
        return (
            <Container>
                <Row className="mt-5">
                    <Col md="1">
                        <Button className="btn" onClick={this.props.controlStep.previousStep}>Prev</Button>
                    </Col>
                    <Col md="2">
                        <Input value={this.props.controlStep.currentStep} onChange={()=> this.curStepChange()}></Input>
                    </Col>
                    <Col md="1">
                        <Button className="btn" onClick={this.props.controlStep.nextStep}>Next</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ControlPage
