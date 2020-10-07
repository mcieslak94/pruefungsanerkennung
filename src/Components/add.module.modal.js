import React, {Component} from 'react' 
import { ModalHeader, Modal, ModalBody, ModalFooter, Button } from 'reactstrap'
import AddModuleWindow from '../Container/addModuleWindow'

export default class AddModuleModal extends Component {
    state = {
        form: {
            moduleName: '',
            creditPoints: '',
            professorID: '', 
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
                <ModalHeader toggle={this.props.toggle}>Modul hinzufügen</ModalHeader>
                <ModalBody>
                    <AddModuleWindow onChange={this.handleChange} data={this.state.form} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleSubmit}>Speichern</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Abbrechen</Button>
                </ModalFooter>
            </Modal>
      )
    }
}