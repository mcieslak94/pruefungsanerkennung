import React, {Component} from 'react' 
import { Modal, ModalBody } from 'reactstrap'
import Alert from 'reactstrap/lib/Alert'
import ModalHeader from 'reactstrap/lib/ModalHeader'

export default class OnChangeAlert extends Component {
    
    render = () => {
        return  (
            <Modal isOpen={this.props.open} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}></ModalHeader>
                <ModalBody>
                    <Alert color="danger">
                        Bitte erst alle Änderungen speichern bzw. den Bearbeiten-Modus verlassen, bevor der Fall gewechselt werden kann.
                    </Alert>
                </ModalBody>
            </Modal>
      )
    }
}