import React, {Component} from 'react'
import { Form, FormGroup, Row, Col, Table, CustomInput } from 'reactstrap'
import _ from 'lodash'

const electron = window.require('electron')

export default class ArchivContent extends Component {

    
    constructor(props) {
        super(props);
        this.state = { 
            disabled: true, 
            archiv: true,
            universities: null,
            modules: null,
            course: null
        }
        const DataBaseConnector = electron.remote.require('../src/shared/database.connector.js')
        const CaseXMConnector = electron.remote.require('../src/shared/modules.db.js')
        this.caseXmoduleDB = CaseXMConnector()
        this.universityDB = DataBaseConnector('university')
        this.courseDB = DataBaseConnector('course')
        this.moduleDB = DataBaseConnector('module')
    }

    componentDidMount() {
        this.getCourses()
        this.getUnis()
    }

    componentDidUpdate (prevProps) {
        if(!_.isEqual(this.props.data, prevProps.data)) this.getCasesXModules()
    }

    getUnis = () => {
        this.universityDB.getAll(universities => this.setState({ universities }))
    }

    getCourses = () => {
        this.courseDB.getAll(course => this.setState({ course }))
    }

    getCasesXModules = () => {
        this.caseXmoduleDB.getCasesXModules(this.props.data.caseID, modules => {
            this.setState({ modules })
        })    
    }   

    getUniversity = () => {
        let idx = this.state.universities && this.state.universities.length > 0 && (this.state.universities.findIndex(m => m.universityID === this.props.data.universityID))
            if(idx>=0){
                let tempModule = this.state.universities[idx]
                return tempModule.universityName
        }
    }

    getCourse = () => {
        let idx = this.state.course && this.state.course.length > 0 && (this.state.course.findIndex(m => m.extCourseID === this.props.data.courseID))
        if(idx === 0 || idx >= 1){
            let tempModule = this.state.course[idx]
            return tempModule.courseName
        }
    }

    render = () => {
    return this.props.data
    ?
    <>
    <div>
        <Form>
            <Row>
        <Col xs={9}>
        <h3>{(this.props.data.caseFirstName ? this.props.data.caseFirstName : '') + ' ' + (this.props.data.caseLastName ? this.props.data.caseLastName : '')}</h3>
        </Col>
        <Col xs={3}>
                Status: {(this.props.data.state ? this.props.data.state : 'nicht angegeben')}
        </Col>
        </Row>
        <FormGroup>
            <Row xs={2} style={{ padding: 16 }}>
                <Col xs={3}> <span>Matrikelnummer: </span> </Col>
                <Col xs={9}> <span>{this.props.data.mNumber ? this.props.data.mNumber : ''}</span> </Col>
                <Col xs={3}> <span>E-Mail-Adresse:</span> </Col>
                <Col xs={9}> <span>{this.props.data.email ? this.props.data.email : ''}</span> </Col>
                <Col xs={3}> <span>Geschlecht: </span> </Col>
                <Col xs={9}> <span>{this.props.data.geschlecht ? this.props.data.geschlecht : ''}</span> </Col>
                <Col xs={3}> <span>Studiengang:</span> </Col>
                <Col xs={9}> <span> {this.getCourse()}</span> </Col>
            </Row>
        </FormGroup>
        <hr />
        <h4>Ehemalige Institution</h4>
        <Row xs={2} style={{ padding: 16 }}>
            <Col xs={3}> <span>Ehemalige Institution: </span> </Col>
            <Col xs={9}> <span>{this.getUniversity()}</span> </Col>
            <Col xs={3}> <span>Ehemaliger Studiengang:</span> </Col>
            <Col xs={9}> <span> {this.getCourse()}</span> </Col>
        </Row>
        <hr />
        <h4>Dokumente</h4>
        <Row xs={2} style={{ padding: 16 }}>
            <Col xs={3}> <span>Antrag Prüfungsanerkennung: </span> </Col>
            <Col xs={9}> <span>{this.props.data.docAntrag === 0 ? 'Der Antrag wurde nicht eingereicht' : this.props.data.docAntrag === 1 ? 'nicht vollständig' : 'vollständig'}</span> </Col>
            <Col xs={3}> <span>Notenspiegel:</span> </Col>
            <Col xs={9}> <span>{this.props.data.docNoten === 0 ? ' Der Notenspiegel wurde nicht eingereicht' : this.props.data.docNoten === 1 ? 'nicht vollständig' : 'vollständig'}</span> </Col>
            <Col xs={3}> <span>Modulhandbuch:</span> </Col>
            <Col xs={9}> <span>{this.props.data.docHandbuch === 0 ? 'Das Modulhandbuch wurde nicht eingereicht' : this.props.data.docHandbuch === 1 ? 'nicht vollständig' : 'vollständig'}</span> </Col>
        </Row>
        <hr />
        <h4>Module</h4>
        <Row xs={2} disabled>
                <Col xs={10}>
                <Table size="sm" bordered>
                    <thead>
                        <tr style={{textAlign:'center'}}>
                            <th>#</th>
                            <th>Modulname</th>
                            <th>Name des Fachkollegen</th>
                            <th>Rückmeldung</th>
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
                                    <CustomInput disabled checked={m.requestActive===1} type="checkbox" id={'ruckmeldung-'+ idx} onChange={() => this.toggleRueckruf(m)}/>
                                </td>
                                <td>{m.begruendung}</td>
                                <td style={{textAlign:'center'}}>
                                    <CustomInput disabled checked={m.anerkannt===1} type="checkbox" id={'anerkannt-'+ idx}/>
                                </td>
                            </tr>
                            

                        )}
                    </tbody>
                </Table>
                
                </Col>
                    
            </Row>
        </Form>
    </div> 
    </>
    : <></>    
}
}