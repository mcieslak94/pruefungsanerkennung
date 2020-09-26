import React, {Component} from 'react' 
import { ModalHeader, Modal, ModalBody, ModalFooter, Button, FormGroup, Label, Row, Col, CustomInput } from 'reactstrap'

const electron = window.require('electron')

export default class AddCaseModuleModal extends Component {
    constructor(props) {
        super(props)
        const DataBaseConnector = electron.remote.require('./database.connector.js')
        this.module = DataBaseConnector('module')
    }


    state = {
        detail: null,
        modules: null,
        selected: []
    }

    componentDidMount() {
        this.getModules()
    }

    getModules = () => {
        this.module.getAll(modules => this.setState({ modules }))
    }

    render = () => {
        return  (
            <>
            <Modal isOpen={this.props.open} toggle={this.props.toggle} >
                <ModalHeader toggle={this.props.toggle}>Modulauswahl</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="selectModule"></Label>
                        {console.log('### state', this.state.selected)}
                        {this.state.modules && this.state.modules.length > 0 && this.state.modules.map(c => 
                            <Row key={'module-select-list-'+c.moduleID}>
                                <Col>
                                <CustomInput
                                    type="checkbox"
                                    id={"c.moduleID" + c.moduleID}
                                    checked={this.props.selected && this.props.selected.length > 0 && (this.props.selected.findIndex(m => m === c.moduleID) !== -1)} 
                                    label={c.moduleName} 
                                    onChange={(value) => this.props.onChange(c.moduleID, value)}/>
                                </Col>
                            </Row> 
                        )}
                        {/* <option key={'modules-option-' + c.moduleID} value={c.moduleID}>{c.moduleName}</option>)} */}
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.onSubmit}>Speichern</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Abbrechen</Button>
                </ModalFooter>
            </Modal>
            </>
      )
    }
}