import React, {Component} from 'react' 
import { Modal, ModalBody, ModalFooter, Button, Form, FormGroup, Row, Col } from 'reactstrap'

export default class DeleteModal extends Component {
   
    render = () => {
        return  (
            <Modal isOpen={this.props.open} toggle={this.props.toggle}>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Row xs={2} style={{ padding: 16 }}>
                                <Col xs={12}>
                                    <span>
                                        {'Wollen sie den ausgewählten Datensatz wirklich löschen?'}
                                    </span>
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.onSubmit}>Ja</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Nein</Button>
                </ModalFooter>
            </Modal>
      )
    }
}