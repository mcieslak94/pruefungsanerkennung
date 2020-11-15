import React, {Component} from 'react' 
import { ModalHeader, Modal, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Col } from 'reactstrap'

export default class AddActiveModal extends Component {
    state = {
        begruendung: null,
        disableReason: true,
        anerkannt: 0
    }

    handleChange = ( e ) => {
        this.setState({ begruendung: e.target.value }) 
    }

    setDisable = (state) => {
        this.setState({ disableReason: state })
        if(state===1)
            this.setState({ anerkannt: 1 })
        else
            this.setState({ anerkannt: 0 })
    }

    handleSave = () => {
        this.props.onSubmit(this.state.begruendung, this.state.anerkannt)
        this.setState({ disableReason: true })
    }
    
    render = () => {
        return  (
            <>
            <Modal isOpen={this.props.open} toggle={this.props.toggle} >
                <ModalHeader toggle={this.props.toggle}>Modulstatus ändern</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Col xs={5}>
                            <Label check>
                            <Input type="radio" name="moduleAccept" onChange={() => this.setDisable(1)} />{' '}
                                Modul wird anerkannt
                            </Label>
                            <Label check>
                            <Input type="radio" name="moduleAccept" onChange={() => this.setDisable(0)} />{' '}
                                Modul wird nicht anerkannt
                            </Label>
                        </Col>
                        <Col>
                        <hr />
                        <Label for="begruendung">Begründung hinzufügen</Label>
                        <Input disabled={this.state.disableReason} type="textarea" name="begruendung" id="begruendung" 
                        onChange={value => this.handleChange(value)} placeholder="Begründung eintragen"/>
                        </Col>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleSave}>Speichern</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Abbrechen</Button>
                </ModalFooter>
            </Modal>
            </>
      )
    }
}