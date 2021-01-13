import React, {Component} from 'react' 
import { ModalHeader, Modal, ModalBody, ModalFooter, Button, Form, FormGroup, Row, Col, Label, Input } from 'reactstrap'
import FormFeedback from 'reactstrap/lib/FormFeedback'

export default class AddProfModal extends Component {
    state = {
        form: {
            titel: '',
            profName: '',
            profEmailadress: ''
        },
        errors: { 
            lastNameError: false,
            emailError: false,
            titelError: false
        }
    }
    handleChange = (prop, value) => {
        let tempForm = this.state.form
        tempForm[prop] = value
        this.setState({ form: tempForm })
    }

    handleSubmit = () => {
        let valid = true
        if (!this.state.form.titel || (this.state.form.titel && this.state.form.titel.length < 1)) {
            this.setState({ errors: { ...this.state.form.errors, titelError: true } })
            valid = false
        }
        if (!this.state.form.profName || (this.state.form.profName && this.state.form.profName.length < 1)) {
            this.setState({ errors: { ...this.state.form.errors, lastNameError: true } })
            valid = false
        }
        if (!this.state.form.profEmailadress || (this.state.form.profEmailadress && this.state.form.profEmailadress.length < 1)) {
            this.setState({ errors: { ...this.state.form.errors, emailError: true } })
            valid = false
        }
        if (valid) {
            let data = this.state.form
            this.props.onSubmit(data)
            this.props.toggle()
            this.setState({ form: {
                titel: '',
                profName: '',
                profEmailadress: ''
            }  })
        }
    }
    
    render = () => {
        return  (
            <Modal isOpen={this.props.open} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Lehrenden hinzufügen</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Row xs={2} style={{ padding: 16 }}>
                                <Col>
                                    <Label for="titel">Titel*</Label>
                                    <Input invalid={this.state.errors.titelError}
                                    value={this.props.data && this.props.data.titel} 
                                    onChange={e => this.handleChange('titel', e.target.value)} 
                                    type="text" name="titel" id="titel" 
                                    placeholder="Titel eintragen" />
                                    <FormFeedback invalid={this.state.errors.titelError}>Bitte den Titel des Dozenten angeben</FormFeedback>
                                </Col>
                                <Col>
                                    <Label for="profName">Vorname*</Label>
                                    <Input invalid={this.state.errors.firstNameError}
                                    value={this.props.data && this.props.data.profFirstName} 
                                    onChange={e => this.handleChange('profFirstName', e.target.value)} 
                                    type="text" name="profFirstName" id="profFirstName" 
                                    placeholder="Vorname eintragen" />
                                    <FormFeedback invalid={this.state.errors.firstNameError}>Bitte einen Vornamen angeben</FormFeedback>
                                </Col>
                                <Col>
                                    <Label for="profName">Nachname*</Label>
                                    <Input invalid={this.state.errors.lastNameError}
                                    value={this.props.data && this.props.data.profName} 
                                    onChange={e => this.handleChange('profName', e.target.value)} 
                                    type="text" name="profName" id="profName" 
                                    placeholder="Name eintragen" />
                                    <FormFeedback invalid={this.state.errors.lastNameError}>Bitte einen Nachnamen angeben</FormFeedback>
                                </Col>
                                <Col>
                                    <Label for="profEmailadress">E-Mail-Adresse*</Label>
                                    <Input invalid={this.state.errors.emailError}
                                    value={this.props.data && this.props.data.profEmailadress} 
                                    onChange={e => this.handleChange('profEmailadress', e.target.value)} 
                                    type="text" name="profEmailadress" id="profEmailadress" 
                                    placeholder="E-Mail-Adresse eintragen" />
                                    <FormFeedback invalid={this.state.errors.emailError}>Bitte eine E-Mail-Adresse angeben</FormFeedback>
                                </Col>
                                <Col xs={12}>
                                    <hr />
                                </Col>
                                <Col xs={12}>
                                    * Pflichtfelder
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