import React, {Component} from 'react' 
import { ModalHeader, Modal, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap'

const electron = window.require('electron')

export default class AddCaseModuleModal extends Component {
    constructor(props) {
        super(props)
        const DataBaseConnector = electron.remote.require('./database.connector.js')
        this.module = DataBaseConnector('module')
    }


    state = {
        detail: null,
        modules: null
    }

    componentDidMount() {
        this.getModules()
    }

    getModules = () => {
        this.module.getAll(modules => this.setState({ modules }))
    }

    handleChange = (prop, value) => {
        let tempForm = this.state.form
        tempForm[prop] = value
        this.setState({ form: tempForm })
    }

    handleSubmit = () => {
        this.props.onSubmit(this.state.form)
        this.props.toggle()
        this.setState({ form: {} })
    }

    render = () => {
        return  (
            <>
            <Modal isOpen={this.props.open} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Modulauswahl</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="selectModule"></Label>
                        <Input type="select" name="selectMulti" id="selectModule" multiple>
                        {this.state.modules && this.state.modules.length > 0 && this.state.modules.map(c => 
                        <option key={'modules-option-' + c.moduleID} value={c.moduleID}>{c.moduleName}</option>)}
                        </Input>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleSubmit}>Speichern</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Abbrechen</Button>
                </ModalFooter>
            </Modal>
            </>
      )
    }
}