import React, { Component } from 'react'
import { Row, Col, Table, Button} from 'reactstrap'
import AddCaseModuleModal from './add.casemodule.modal';
import _ from 'lodash'
const electron = window.require('electron')

export default class CaseModulePanel extends Component {
    constructor(props) {
        super(props)
        const DataBaseConnector = electron.remote.require('./database.connector.js')
        const CaseXMConnector = electron.remote.require('./modules.db.js')
        this.caseXmDB = CaseXMConnector()
        this.caseXmoduleDB = DataBaseConnector('caseXmodule')
    }
    state = { 
        modules: null,
        moduleModalOpen: false,
        selected: []
    } 

    componentDidMount () {
        if(this.props.data && this.props.data.caseID) this.getCasesXModules()
    }

    componentDidUpdate (prevProps) {
        if(!_.isEqual(this.props.data, prevProps.data)) this.getCasesXModules()
    }

    addModulesToTable = (selected) => {
        
        let removed = []
        selected = selected.filter(s => {
            let mIdx = this.state.modules.findIndex(sm => sm.moduleID === s) 
            if ( mIdx !== -1) removed.push(this.state.modules[mIdx])
            return mIdx === -1
        })
        removed.map(r => {
            let data = {
                prop: 'case_module_ID',
                value: r.case_module_ID
            }
            this.caseXmoduleDB.data(data).delete(() => {
                this.getCasesXModules()
                return null
            })    
            return null
        })
        selected.map(s => {
            let newEntry = { caseID: this.props.data.caseID, module_ID: s }
            this.caseXmoduleDB.data(newEntry).create(() => {
                this.getCasesXModules()
                return null
            })        
            return null
        })
        this.setState({ moduleModalOpen: false })
    }

    getCasesXModules = () => {
        this.caseXmDB.getCasesXModules(this.props.data.caseID, modules => {
            this.setState({ modules })
        })    
    }

    handleModuleChange = (id, object) => {
        let tempModules = this.state.selected || []
        let modIdx = tempModules.findIndex(m => m === id)
        if (modIdx === -1) tempModules.push(id)
        else delete tempModules[modIdx]
        tempModules = tempModules.filter(x => x != null)
        this.setState({ selected: tempModules, moduleModalOpen: !this.state.moduleModalOpen })
    }
    
    

    render = () => {
    return ( 
        <div>
            <Row xs={2}>
                <Col xs={10}>
                <Table size="sm" hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Modulname</th>
                            <th>Name des Fachkollegen</th>
                            <th>Rückmeldung erhalten</th>
                            <th>Begründung</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.modules && this.state.modules.length > 0 && this.state.modules.map((m, idx) => 
                            <tr key={'module-tr-key-' + idx}>
                                <td>{idx+1}</td>
                                <td>{m.moduleName}</td>
                                <td>{m.profName}</td>
                                <td>{m.requestActive}</td>
                                <td>{m.begruendung}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                
                </Col>
                {!this.props.archiv ?
                <Col xs={2}>
                    <Button disabled={this.props.disabled} color="primary" onClick={() => this.setState({ moduleModalOpen: !this.state.moduleModalOpen })}>Module auswählen</Button>
                </Col> : <></>} 
            </Row>

            <AddCaseModuleModal className="app-case-module"
                modules={this.state.modules}
                onChange={this.handleModuleChange}
                open={this.state.moduleModalOpen}
                size={300}
                toggle={() => this.setState({ moduleModalOpen: !this.state.moduleModalOpen })}
                onSubmit={this.addModulesToTable}
            />
        </div>
    );
    }
}


