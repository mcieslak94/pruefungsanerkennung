import React, {Component} from 'react' 
import { Modal, ModalBody, ModalFooter, Button, Label, Input, FormGroup, Row, Col, ModalHeader } from 'reactstrap'

export default class CloseCaseModal extends Component {
    state = {
        abgeschlossen: 0
    }

    setFinished = (state) => {
        if(state===1)
            this.setState({ abgeschlossen: 1 })
        else
            this.setState({ abgeschlossen: 0 })
    }

    handleSave = () => {
        this.props.onSubmit(this.state.abgeschlossen)
    }

    render = () => {
        return  (
            <Modal isOpen={this.props.open} toggle={this.props.toggle}>
                <ModalHeader><span>Fall archivieren</span></ModalHeader>
                <ModalBody>
                        <FormGroup>
                            <Row xs={2} style={{ padding: 16 }}>
                                <Col xs={12}>
                                    <FormGroup tag="fieldset">
                                        <legend>Ist der Fall vollständig abgeschlossen?</legend>
                                        <Label check>
                                            <Input type="radio" name="yesNoOption" onChange={() => this.setFinished(1)}/>{' '}
                                            Ja
                                        </Label>
                                        <Label check>
                                            <Input type="radio" name="yesNoOption" onChange={() => this.setFinished(0)}/>{' '}
                                            Nein, der Antrag wurde zurückgezogen oder aufgrund von anderen Umständen abgebrochen
                                        </Label>
                                    </FormGroup>
                                    <hr />
                                    <span>
                                        {'Wollen sie den Fall wirklich archivieren? Er kann danach nicht mehr bearbeitet werden.'}
                                    </span>
                                </Col>
                            </Row>
                        </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleSave}>Ja</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Nein</Button>
                </ModalFooter>
            </Modal>
      )
    }
}