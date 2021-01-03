import React, { Component } from 'react'
import { Row, Col, FormGroup, Label, Button, Input} from 'reactstrap'
import '../App.css';
import AddUniversityModal from './university/add.university.modal';
import AddExtCourseModal from './university/add.ext.course.modal';

const electron = window.require('electron')

export default class CaseProofPanel extends Component {

    constructor(props) {
        super(props)
        const DatabaseUni = electron.remote.require('../src/shared/university.db.js')
        const DataBaseConnector = electron.remote.require('../src/shared/database.connector.js')
        this.uniDB = DataBaseConnector('university')
        this.course = DataBaseConnector('course')
        this.ExtCourseData = DatabaseUni()
    }
    state = { 
        extCourses: null,
        extCourseModalOpen: false,
        universityModalOpen: false,
        universities: null
    } 

    componentDidMount() {
        this.getUnis()
        this.getExtCourses()
    }

    getExtCourses = () => {
        this.ExtCourseData.getExtCourses( extCourses => {
            this.setState({ extCourses })
          }) 
    }

    getUnis = () => {
        this.uniDB.getAll(universities => this.setState({ universities }))
    }

    setUniversityCheck = (state) => {
        if(state === 1){
            this.props.data.universityCheck = 1
            this.setState({universityCheck: 1})
        }
        if(state === 2){
            this.props.data.universityCheck = 2
            this.setState({universityCheck: 2})
        }
        if(state === 3){
            this.props.data.universityCheck = 3
            this.setState({universityCheck: 3})
        }
    }
   
    saveUniversity = (prop, e) => {
        let tempForm = this.props.data
        tempForm[prop] = e
        this.setState({ tempForm })
    }
    
    saveCourseExt = (prop, e) => {
        let tempForm = this.props.data
        tempForm[prop] = e
        this.setState({ tempForm })
    }

    addExtCourse = (extCourse) => {
        extCourse.intern = '0'
        this.course.data(extCourse).create(() => {
                            this.getExtCourses()
                        })
    }
    
    addUniversity = (university) => {
        this.uniDB.data(university).create(() => {
            this.getUnis()
        })
    }
    
    render = () => {
    return ( 
        <div>
            <Row xs={2} style={{ paddingBottom: 16 }}>
                <Col>
                    <Label for="caseFirstName">ehem. Institution </Label>
                    <div style={{ float:"right"}}>
                        <Button disabled={this.props.disabled} size="sm" style={{ marginBottom: 5 }} color="success" onClick={() => this.setState({ universityModalOpen: true })}>+</Button>
                    </div>
                    <Input disabled={this.props.disabled} id="universityID" type={'select'} value={this.props.data.universityID ? this.props.data.universityID : ''} 
                        onChange={e => this.saveUniversity('universityID', e.target.value)} >
                        <option key={'universities-option-' + -1} value={-1}>{'Bitte eine Institution auswählen...'}</option>
                        {this.state.universities && this.state.universities.length > 0 && this.state.universities.map(c => <option key={'universities-option-' + c.universityID} 
                        value={c.universityID}>{c.universityName}</option>)}
                    </Input> 
                    
                </Col>
                <Col>
                    <Label for="caseFirstName">ehem. Studiengang</Label>
                    <div style={{ float:"right"}}>
                        <Button disabled={this.props.disabled} size="sm" style={{ marginBottom: 5 }} color="success" onClick={() => this.setState({ extCourseModalOpen: true })}>+</Button>
                    </div>
                    <Input   disabled={this.props.disabled} type={'select'} value={this.props.data.extCourseID ? this.props.data.extCourseID : ''} 
                        onChange={e => this.saveUniversity('extCourseID', e.target.value)}>
                        <option key={'course-option-' + -1} value={-1}>{'Bitte einen Studiengang auswählen...'}</option>
                        {this.state.extCourses && this.state.extCourses.length > 0 && this.state.extCourses.map((c, idx) => <option key={'course-option-' + idx} 
                        value={c.courseID}>{c.courseName}</option>)}
                    </Input> 
                </Col>
            </Row>
            
            <Row xs={2} style={{ paddingLeft: 16 }}>
                <Col xs={6}>
                    
                            <FormGroup>
                                        <Label check>
                                            <Input type="radio" name="yesNoOption" checked={this.props.data.universityCheck === 1} onChange={() => this.setUniversityCheck(1)}/>{' '}
                                            Hochschulinterner Wechsel
                                        </Label>
                                        <br />
                                        <Label check>
                                            <Input type="radio" name="yesNoOption" checked={this.props.data.universityCheck === 2} onChange={() => this.setUniversityCheck(2)}/>{' '}
                                            Institution in Deutschland
                                        </Label>
                                        <br />
                                        <Label check>
                                            <Input type="radio" name="yesNoOption" checked={this.props.data.universityCheck === 3} onChange={() => this.setUniversityCheck(3)}/>{' '}
                                            weitere Überprüfung notwendig
                                        </Label>
                            </FormGroup>
                </Col>
                <Col xs={3}>
                    <a href="https://anabin.kmk.org/anabin.html"><button disabled={this.props.disabled}> Anabin öffnen</button> </a>
                </Col> 
            </Row>
            <AddExtCourseModal className="app-modal-addExtCourse"
                open={this.state.extCourseModalOpen}
                toggle={() => this.setState({ extCourseModalOpen: !this.state.extCourseModalOpen })}
                onSubmit={this.addExtCourse}
            />
            <AddUniversityModal className="app-modal-addUniversity"
                open={this.state.universityModalOpen}
                toggle={() => this.setState({ universityModalOpen: !this.state.universityModalOpen })}
                onSubmit={this.addUniversity}
            />
        </div>
    );
    }
}


