import React, {Component} from 'react' 
import { ModalHeader, Modal, ModalBody, ModalFooter, Button, FormGroup, Label, Row, Col, CustomInput, Input } from 'reactstrap'
import _ from 'lodash'
const electron = window.require('electron')

export default class AddCaseModuleModal extends Component {
    constructor(props) {
        super(props)
        const DataBaseConnector = electron.remote.require('./database.connector.js')
        const ModulesDBConnector = electron.remote.require('./modules.db.js')
        this.module = DataBaseConnector('module')
        this.modulesDB = ModulesDBConnector()
    }


    state = {
        detail: null,
        modules: null,
        selected: [],
        extModuleName: null
    }

    componentDidMount() {
        this.getModules()
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(this.props.course, prevProps.course) && this.props.course) { this.getModules() }
        if (!_.isEqual(this.props.modules, prevProps.modules) && this.state.modules) { this.setInitSelected() }
    }
    
    onChange = (id) => {
        let tempModules = this.state.selected || []
        let modIdx = tempModules.findIndex(m => m === id)
        if (modIdx === -1)  tempModules.push({id: id, extModuleName: null}) 
        else delete tempModules[modIdx] 
        
        tempModules = tempModules.filter(x => x.id != null)
        this.setState({ selected: tempModules })

    }

    handleSave = () => {
        this.props.onSubmit(this.state.selected)
        this.setState({  selected: [], modules: null })
    }
    
    getModules = () => {
        this.modulesDB.getModulesByCourse((this.props.course), modules => {
            this.setState({ modules }, () => this.setInitSelected())
        })
        
    }
    
    setInitSelected = () => {
        if (this.props.modules && this.props.modules.length > 0) {
            let selected = []
            selected = this.state.modules.filter(m => this.props.modules.findIndex(pm => pm.moduleID === m.moduleID) !== -1)
            selected = selected.map(x => x.moduleID)
            this.setState({ selected })
        } else this.setState({ selected: [] })

    }
    getExtName = (moduleID) => {
        let idx = this.props.modules && this.props.modules.length > 0 && (this.props.modules.findIndex(m => m.moduleID === moduleID))
            if(idx === 0 || idx >= 1){
                let tempModule = this.props.modules[idx]
                return tempModule.extModuleName
            }
        }

    changeExtModule = (prop, e) => {
        let tempExtName = e.target.value
        this.setState({ tempExtName })
    }
            

    render = () => {
        return  (
            <>
            <Modal isOpen={this.props.open} toggle={this.props.toggle} >
                <ModalHeader toggle={this.props.toggle}>Modulauswahl</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="selectModule"></Label>
                        {this.state.modules && this.state.modules.length > 0 && this.state.modules.map((c, idx) => 
                            <Row xs={2} key={'module-select-list-'+ idx}>
                                <Col>
                                <CustomInput
                                    type="checkbox"
                                    id={"c.moduleID" + c.moduleID}
                                    checked={this.state.selected && this.state.selected.length > 0 && (this.state.selected.findIndex(m => m === c.moduleID) !== -1)} 
                                    label={c.moduleName} 
                                    onChange={(value) => this.onChange(c.moduleID, c)}/>
                                </Col>
                                <Col>

                                <Input disabled={!(this.state.selected && this.state.selected.length > 0 && (this.state.selected.findIndex(m => m === c.moduleID) !== -1))} type='text' 
                                        placeholder={'Name des externen Moduls'} 
                                        value={this.getExtName(c.moduleID)} 
                                        onChange= {value => this.changeExtModule('extModuleName', value)} />
                                </Col>
{/*                                    <div style={{borderLeft: '1px solid lightgrey', maxHeight: '85vh'}}></div>
*/}                            </Row> 
                        )}
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