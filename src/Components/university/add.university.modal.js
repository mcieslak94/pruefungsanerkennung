import React, {Component} from 'react' 
import { ModalHeader, Modal, ModalBody, ModalFooter, Button, Form, FormGroup, Row, Col, Label, Input } from 'reactstrap'

export default class AddUniversityModal extends Component {
    state = {
        form: {
            universityName: ''
        } 
    }
    handleChange = (prop, value) => {
        let tempForm = this.state.form
        tempForm[prop] = value
        this.setState({ form: tempForm })
    }

    handleSubmit = () => {
        let data = this.state.form
        this.props.onSubmit(data)
        this.props.toggle()
        this.setState({ form: {} })
    }
    
    render = () => {
        return  (
            <Modal isOpen={this.props.open} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Institution hinzufügen</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Row style={{ padding: 16 }}>
                                <Col>
                                    <Label for="universityName">Name der Institution</Label>
                                    <Input value={this.props.data && this.props.data.universityName} 
                                    onChange={e => this.handleChange('universityName', e.target.value)} 
                                    type="text" name="universityName" id="universityName" 
                                    placeholder="Name der Institution eintragen" />
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleSubmit}>Speichern</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Abbrechen</Button>
                </ModalFooter>
            </Modal>
      )
    }
}