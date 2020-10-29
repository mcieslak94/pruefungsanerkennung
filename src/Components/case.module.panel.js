import React, { Component } from 'react'
import { Row, Col, Table, Button} from 'reactstrap'
import AddCaseModuleModal from './add.casemodule.modal';
import { GrMailOption } from "react-icons/gr";
import '../App.css';

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
        selected: [],
        addModuleData: null,

    } 

    componentDidMount () {
        if(this.props.data && this.props.data.caseID){ 
            this.setState({ modules: [] })
            this.getCasesXModules()
            console.log('### modules', this.state.modules)
        }
    }

    componentDidUpdate (prevProps) {
        console.log('### data', this.props.data)
        console.log('### prevProps.data', prevProps.data)
        console.log('### equal', !_.isEqual(this.props.data, prevProps.data))
        if(!_.isEqual(this.props.data, prevProps.data)) this.getCasesXModules()
        console.log('### modules', this.state.modules)
    }

    addModulesToTable = (selected) => {
        let currentSelected = this.state.modules.map(x => x.moduleID)
        let removeArray = currentSelected && currentSelected.length > 0 ? currentSelected.filter(c => !selected.includes(c)) : []  
        removeArray = removeArray.map(r => this.state.modules[this.state.modules.findIndex(m => m.moduleID === r)])
        let addArray = selected.filter(s => !currentSelected.includes(s))
        
        removeArray.map((r, idx) => {
            let data = { prop: 'case_module_ID', value: r.case_module_ID }
            this.caseXmoduleDB.data(data).delete(() => {
                if (idx === removeArray.length - 1) {
                    setTimeout(() => {
                        this.setState({ modules: [] },() => this.getCasesXModules())
                    }, 200)
                } 
                return null
            })    
            return null
        })
        addArray.map((s, idx) => {
            setTimeout(() => {
                this.getDataByModule(s)
            }, 2000)
            console.log('### addModuleData', this.state.addModuleData)
            /* emailadresse, profname, proftitel, modulname
            let newhref = "mailto:" + {moduleProf}  */ 
            let newEntry = { caseID: this.props.data.caseID, module_ID: s, begruendung: 'keine'}
            this.caseXmoduleDB.data(newEntry).create(() => {
                if (idx === addArray.length - 1) {
                    setTimeout(() => {
                        this.setState({ modules: [] },() => this.getCasesXModules())
                    }, 200)
                }
                return null
            })        
            return null
        })
        this.setState({ moduleModalOpen: false })
    }

    getDataByModule = (moduleID) => {
        this.caseXmDB.getDataByModule(moduleID, addModuleData => {
            if(addModuleData && addModuleData.length > 0) addModuleData = addModuleData[0]
            this.setState({ addModuleData })
          })
    }

    getCasesXModules = () => {
        this.caseXmDB.getCasesXModules(this.props.data.caseID, modules => {
            this.setState({ modules })
        })    
    }   

    render = () => {
    return ( 
        <div>
            <Row xs={2}>
                <Col xs={10}>
                <Table size="sm" bordered hover>
                    <thead>
                        <tr style={{textAlign:'center'}}>
                            <th>#</th>
                            <th>Modulname</th>
                            <th>Name des Fachkollegen</th>
                            <th>Rückmeldung</th>
                            <th>Erinnerung</th>
                            <th>Begründung</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {this.state.modules && this.state.modules.length > 0 && this.state.modules.map((m, idx) => 
                            <tr key={'module-tr-key-' + idx}>
                                <td>{idx+1}</td>
                                <td>{m.moduleName}</td>
                                <td>{m.titel} {m.profName}</td>
                                <td>{m.requestActive}</td>
                                <td id="child" style={{textAlign:'center', fontSize:'15px'}}>
                                    <a href={m.cXmhref}><GrMailOption /></a>
                                </td>
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
                open={this.state.moduleModalOpen}
                size={300}
                toggle={() => this.setState({ moduleModalOpen: !this.state.moduleModalOpen })}
                onSubmit={this.addModulesToTable}
            />
        </div>
    );
    }
}


