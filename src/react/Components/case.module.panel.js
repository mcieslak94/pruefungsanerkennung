import React, { Component } from 'react'
import { Row, Col, Table, Button, CustomInput, Label, Input} from 'reactstrap'
import AddCaseModuleModal from './add.casemodule.modal';
import AddActiveModal from './add.active.modal';
import { GrMailOption } from "react-icons/gr";
import '../App.css';

import _ from 'lodash'

const electron = window.require('electron')

export default class CaseModulePanel extends Component {
    constructor(props) {
        super(props)
        const DataBaseConnector = electron.remote.require('../src/shared/database.connector.js')
        const CaseXMConnector = electron.remote.require('../src/shared/modules.db.js')
        this.caseXmoduleDB = DataBaseConnector('caseXmodule')
        this.caseXmDB = CaseXMConnector()
    }
    state = { 
        modules: null,
        moduleModalOpen: false,
        reasonModalOpen: false,
        selected: [],
        addModuleData: null,
        activeModule: null
    } 

    componentDidMount () {
        if(this.props.data && this.props.data.caseID){ 
            this.setState({ modules: [] })
            this.getCasesXModules()
        }
    }

    componentDidUpdate (prevProps) {
        if(!_.isEqual(this.props.data, prevProps.data)) this.getCasesXModules()
    }

    addModulesToTable = (selected, extNameArray = null) => {
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
            let newEntry = { caseID: this.props.data.caseID, module_ID: s, begruendung: 'keine', requestActive: 0, requestDate: new Date()}
            if (extNameArray && extNameArray.length > 0) {
                let extNameIdx = extNameArray.findIndex(ext => ext.moduleID === s)
                if (extNameIdx !== -1) newEntry.extModuleName = extNameArray[extNameIdx].name
            }
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
        if ((extNameArray && extNameArray.length > 0)) {
            extNameArray.forEach((extName, idx) => {
                let data = { selector: { caseID: this.props.data.caseID, module_ID: extName.moduleID }, value: { extModuleName: extName.name } }
                this.caseXmoduleDB.data(data).update(() => {
                    if (idx === addArray.length - 1) {
                        setTimeout(() => {
                            this.setState({ modules: [] },() => this.getCasesXModules())
                        }, 200)
                    }
                    return null
                }) 
            })
        }
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

    toggleRueckruf = (caseXmodule) => {
        this.setState({ activeModule: caseXmodule})
        let caseXmoduleEntry = {
            requestActive: caseXmodule.requestActive===1 ? 0 : 1,
            begruendung: 'keine'
        }
        if(caseXmodule.requestActive===0){
            this.setState({ reasonModalOpen: !this.state.reasonModalOpen })
        } else {
            caseXmoduleEntry = {
                requestActive: caseXmodule.requestActive===1 ? 0 : 1,
                begruendung: 'keine',
                anerkannt: 0
            }
        }
        let data = {
                value: caseXmoduleEntry,
                selector: { case_module_ID: caseXmodule.case_module_ID }
                }
        this.caseXmoduleDB.data(data).update(() => this.getCasesXModules())
    }

    addReason = (begruendung, anerkannt) => {
        let newBegruendung = begruendung ? begruendung : "keine"
        let caseXmoduleEntry = {
            begruendung: newBegruendung,
            anerkannt: anerkannt
        }
        let data = {
            value: caseXmoduleEntry,
            selector: { case_module_ID: this.state.activeModule.case_module_ID }
            }
        this.caseXmoduleDB.data(data).update(() => this.getCasesXModules())
        this.setState({ reasonModalOpen: !this.state.reasonModalOpen, activeModule: null })
    }

    handleChange = (prop, e) => {
        let tempForm = this.props.data
        tempForm[prop] = e.target.value
        this.setState({ tempForm })
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
                            <th>Anerkannt</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {this.state.modules && this.state.modules.length > 0 && this.state.modules.map((m, idx) => 
                            <tr key={'module-tr-key-' + idx}>
                                <td>{idx+1}</td>
                                <td>{m.moduleName}</td>
                                <td>{m.titel} {m.profName}</td>
                                <td style={{textAlign:'center'}}>
                                    <CustomInput disabled={this.props.disabled} checked={m.requestActive===1} type="checkbox" id={'ruckmeldung-'+ idx} onChange={() => this.toggleRueckruf(m)}/>
                                </td>
                                <td id="child" style={{textAlign:'center', fontSize:'15px'}}>
                                    <a href={m.cXmhref}><GrMailOption /></a>
                                </td>
                                <td>{m.begruendung}</td>
                                <td style={{textAlign:'center'}}>
                                    <CustomInput disabled={this.props.disabled} checked={m.anerkannt===1} type="checkbox" id={'anerkannt-'+ idx}/>
                                </td>
                            </tr>
                            

                        )}
                    </tbody>
                </Table>
                
                </Col>
                {!this.props.archiv ?
                    <Col xs={2}>
                        <Button disabled={this.props.disabled} color="primary" onClick={() => this.setState({ moduleModalOpen: !this.state.moduleModalOpen })}>Module auswählen</Button>
                        <hr />
                        <Label for="moduleReminderDate">Wiedervorlage am</Label>
                        <Input disabled={this.props.disabled}
                            type="date" value={this.props.data.moduleReminderDate ? this.props.data.moduleReminderDate : ''}
                            id="moduleReminderDate" placeholder="days placeholder" onChange={value => this.handleChange('moduleReminderDate', value)}
                        />
                    </Col> 
                : <></> } 
            </Row>

            <AddCaseModuleModal className="app-case-module"
                modules={this.state.modules}
                open={this.state.moduleModalOpen}
                size={700}
                toggle={() => this.setState({ moduleModalOpen: !this.state.moduleModalOpen })}
                onSubmit={this.addModulesToTable}
                course={this.props.data.courseID}
                case={this.props.data.caseID}
            />
            <AddActiveModal className="app-rename-modal"
                open={this.state.reasonModalOpen}
                toggle={() => this.setState({ reasonModalOpen: !this.state.reasonModalOpen })}
                onSubmit={this.addReason}
            />
        </div>
    )
    }
}


