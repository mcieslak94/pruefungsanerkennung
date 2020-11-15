import React, {Component} from 'react' 
import { ModalHeader, Modal, ModalBody, ModalFooter, Button, Form, FormGroup, Row, Col, Label, Input } from 'reactstrap'

export default class AddCourseModal extends Component {
    state = {
        form: {
            courseName: ''
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
                <ModalHeader toggle={this.props.toggle}>Studiengang hinzufügen</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Row style={{ padding: 16 }}>
                                <Col>
                                    <Label for="courseName">Name des Studiengangs</Label>
                                    <Input value={this.props.data && this.props.data.courseName} 
                                    onChange={e => this.handleChange('courseName', e.target.value)} 
                                    type="text" name="courseName" id="courseName" 
                                    placeholder="Name des Studiengangs eintragen" />
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