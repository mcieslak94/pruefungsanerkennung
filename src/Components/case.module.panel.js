import React, { Component } from 'react'
import { Row, Col, Table, Button} from 'reactstrap'
import AddCaseModuleModal from './add.casemodule.modal';

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

    componentDidUpdate(prevProps) {
        console.log('### prevProps.data', prevProps.data)
        console.log('### this.props.data', this.props.data)
        console.log('### erstes', (prevProps.data == null && this.props.data != null))
        console.log('### this.props.data', this.props.data.caseID)
        console.log('### prevProps.data', prevProps.data.caseID)
        console.log('### zweites', (this.props.data.caseID !== prevProps.data.caseID))
        if((prevProps.data == null && this.props.data != null) || (this.props.data != null && (this.props.data.caseID !== prevProps.data.caseID))){
            this.getCasesXModules()
            console.log('### modules', this.state.modules)
        }
    }

    addModulesToTable = () => {
        this.state.selected.map(s => {
            let newEntry = { caseID: this.props.data.caseID, moduleID: s }
            this.caseXmoduleDB.data(newEntry).create(() => {
                this.getCasesXModules()
                console.log('caseXmodule added')
                return null
            })        
            return null
        })
    }

    getCasesXModules = () => {
        this.caseXmDB.getCasesXModules(this.props.data.caseID, modules => {
            this.setState({ modules })
        })    
    }

    handleModuleChange = (id, object) => {
        console.log('### object', object)
        let tempModules = this.state.selected || []
        let modIdx = tempModules.findIndex(m => m === id)
        if (modIdx === -1) tempModules.push(id)
        else delete tempModules[modIdx]
        tempModules = tempModules.filter(x => x != null)
        this.setState({ selected: tempModules })
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
                        {console.log('### modules', this.state.modules)} 
                        {this.state.modules && this.state.modules.length > 0 && this.state.modules.map((m, idx) => 
                            <tr>
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
                {console.log('### archiv',  this.props.archiv)}
                {!this.props.archiv ?
                <Col xs={2}>
                    <Button disabled={this.props.disabled} color="primary" onClick={() => this.setState({ moduleModalOpen: !this.state.moduleModalOpen })}>Module auswählen</Button>
                </Col> : <></>} 
            </Row>

            <AddCaseModuleModal className="app-case-module"
                selected={this.state.selected}
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


