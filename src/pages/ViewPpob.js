import React, { Component } from 'react'
import {Container, Row, Button, Col, Input} from 'reactstrap'

export class ViewPpob extends Component {
    render() {
        return (
            <div>
                View PPOB
                <Container>
                    <Row className="mt-5">
                        <Col md="1">
                            <Button className="btn" id="prev" onClick={this.props.previousStep}>Prev</Button>
                        </Col>
                        <Col md="2">
                            <Input id="step_counter" value={this.props.currentStep}></Input>
                        </Col>
                        <Col md="1">
                            <Button className="btn" id="next" onClick={this.props.nextStep}>Next</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ViewPpob
