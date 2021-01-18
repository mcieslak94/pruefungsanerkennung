import React, {Component} from 'react' 
import { Modal, ModalBody } from 'reactstrap'
import Alert from 'reactstrap/lib/Alert'
import ModalHeader from 'reactstrap/lib/ModalHeader'

export default class DeleteAlert extends Component {
    
    render = () => {
        return  (
            <Modal isOpen={this.props.alertOpen} toggle={this.props.toggleAlert}>
                <ModalHeader toggle={this.props.toggleAlert}></ModalHeader>
                <ModalBody>
                    <Alert color="danger">
                        Der Datensatz wird an einer anderen Stelle der Anwendung verwendet und kann daher nicht gelöscht werden.
                    </Alert>
                </ModalBody>
            </Modal>
      )
    }
}