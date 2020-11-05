import React, {Component} from 'react'
import { Form, FormGroup, Row, Col } from 'reactstrap'
import CaseModulePanel from '../case.module.panel';

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
        const DataBaseConnector = electron.remote.require('./database.connector.js')
        this.universityDB = DataBaseConnector('university')
        this.courseDB = DataBaseConnector('course')
        this.moduleDB = DataBaseConnector('module')
    }

    componentDidMount() {
        this.getCourses()
        this.getModules()
        this.getUnis()
    }

    getUnis = () => {
        this.universityDB.getAll(universities => this.setState({ universities }))
    }

    getCourses = () => {
        this.courseDB.getAll(course => this.setState({ course }))
    }

    getModules = () => {
        this.moduleDB.getAll(modules => this.setState({ modules }))
    }

    getUniversity = () => {
        let idx = this.state.universities && this.state.universities.length > 0 && (this.state.universities.findIndex(m => m.universityID === this.props.data.universityID))
            if(idx){
                let tempModule = this.state.universities[idx]
                return tempModule.universityName
        }
    }

    getCourse = () => {
        let idx = this.state.course && this.state.course.length > 0 && (this.state.course.findIndex(m => m.courseID === this.props.data.courseID))
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
        <h3>{(this.props.data.caseFirstName ? this.props.data.caseFirstName : '') + ' ' + (this.props.data.caseLastName ? this.props.data.caseLastName : '')}</h3>
        
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
        <Row xs={2} style={{ padding: 16 }}>
            <Col xs={3}> <span>Ehemalige Institution: </span> </Col>
            <Col xs={9}> <span>{this.getUniversity()}</span> </Col>
            <Col xs={3}> <span>Ehemaliger Studiengang:</span> </Col>
            <Col xs={9}> <span> {this.getCourse()}</span> </Col>
        </Row>
        <hr />
        <h4>Dokumente</h4>
        <Row xs={2} style={{ padding: 16 }}>
            <Col xs={3}> <span>Prüfungsanerkennungsantrag: </span> </Col>
            <Col xs={9}> <span>{this.props.data.docAntrag === 0 ? 'Der Antrag wurde nicht eingereicht' : this.props.data.docAntrag === 1 ? 'nicht vollständig' : 'vollständig'}</span> </Col>
            <Col xs={3}> <span>Notenspiegel:</span> </Col>
            <Col xs={9}> <span>{this.props.data.docNoten === 0 ? ' Der Notenspiegel wurde nicht eingereicht' : this.props.data.docNoten === 1 ? 'nicht vollständig' : 'vollständig'}</span> </Col>
            <Col xs={3}> <span>Modulhandbuch:</span> </Col>
            <Col xs={9}> <span>{this.props.data.docHandbuch === 0 ? 'Das Modulhandbuch wurde nicht eingereicht' : this.props.data.docHandbuch === 1 ? 'nicht vollständig' : 'vollständig'}</span> </Col>
        </Row>
        <hr />
        <h4>Module</h4>
        <Row style={{ padding: 16 }}>
            <Col xs={12}>
                <CaseModulePanel archiv={this.state.archiv}
                data={this.props.data} 
                disabled={this.state.disabled} 
                onSubmit={() => this.setState({ moduleModalOpen: true })}/>
            </Col>
        </Row>
        </Form>
    </div> 
    </>
    : <></>    
}
}