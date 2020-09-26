import React, { Component } from 'react'
import { Row, Col, Table, Button} from 'reactstrap'
import AddCaseModuleModal from './add.casemodule.modal';

const electron = window.require('electron')

export default class CaseModulePanel extends Component {
    constructor(props) {
        super(props)
        const DataBaseConnector = electron.remote.require('./database.connector.js')
        this.caseXmoduleDB = DataBaseConnector('caseXmodule')
    }
    state = { 
        modules: null,
        moduleModalOpen: false,
        selected: []
    } 

    addModulesToTable = () => {
        this.state.selected.map(s => {
            let newEntry = { caseID: this.props.caseID, moduleID: s }
            this.caseXmoduleDB.data(newEntry).create(() => {
                this.getCases()
                console.log(' caseXmodule added')
                return null
            })        
            return null
        })
    }

    handleModuleChange = (id, value) => {
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
                <Col xs={9}>
                <Table size="sm" hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Modulname</th>
                        <th>Name des Fachkollegen</th>
                        <th>Rückmeldung erhalten</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {this.state.modules && this.state.modules.length > 0 && this.state.modules.map(m => {
                            <tr>
                                <th scope="row">1</th>
                                <td>{m.name}</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                        })} */}
                        <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
                </Col>
                
                <Col xs={3}>
                    <Button disabled={this.props.disabled} color="primary" onClick={() => this.setState({ moduleModalOpen: !this.state.moduleModalOpen })}>Module auswählen</Button>
                </Col> 
            </Row>

            <AddCaseModuleModal className="app-case-module"
                selected={this.state.selected}
                onChange={this.handleModuleChange}
                open={this.state.moduleModalOpen}
                size={300}
                toggle={() => this.setState({ moduleModalOpen: !this.state.moduleModalOpen })}
                onSubmit={() => this.addModulesToTable}
            />
        </div>
    );
    }
}


