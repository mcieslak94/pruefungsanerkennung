import React, {Component} from 'react' 
import { ModalHeader, Modal, ModalBody, ModalFooter, Button, Form, FormGroup, Row, Col, Label, Input } from 'reactstrap'

export default class AddProfModal extends Component {
    state = {
        form: {
            titel: '',
            profName: '',
            profEmailadress: ''
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
                            <Row xs={2} style={{ padding: 16 }}>
                                <Col>
                                    <Label for="titel">Titel</Label>
                                    <Input value={this.props.data && this.props.data.titel} 
                                    onChange={e => this.handleChange('titel', e.target.value)} 
                                    type="text" name="titel" id="titel" 
                                    placeholder="Titel eintragen" />
                                </Col>
                                <Col>
                                    <Label for="profName">Nachname</Label>
                                    <Input value={this.props.data && this.props.data.profName} 
                                    onChange={e => this.handleChange('profName', e.target.value)} 
                                    type="text" name="profName" id="profName" 
                                    placeholder="Name eintragen" />
                                </Col>
                                <Col>
                                    <Label for="profEmailadress">E-Mail-Adresse</Label>
                                    <Input value={this.props.data && this.props.data.profEmailadress} 
                                    onChange={e => this.handleChange('profEmailadress', e.target.value)} 
                                    type="text" name="profEmailadress" id="profEmailadress" 
                                    placeholder="E-Mail-Adresse eintragen" />
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