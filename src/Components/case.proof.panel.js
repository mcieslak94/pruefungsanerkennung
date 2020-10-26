import React, { Component } from 'react'
import { Progress, Row, Col, FormGroup, CustomInput, Label, Button, Input} from 'reactstrap'
import '../App.css';
import AddUniversityModal from './university/add.university.modal';
import AddExtCourseModal from './university/add.ext.course.modal';

const electron = window.require('electron')

export default class CaseProofPanel extends Component {

    constructor(props) {
        super(props)
        const DatabaseUni = electron.remote.require('./university.db.js')
        const DataBaseConnector = electron.remote.require('./database.connector.js')
        this.uniDB = DataBaseConnector('university')
        this.course = DataBaseConnector('course')
        this.ExtCourseData = DatabaseUni()
    }
    state = { 
        internChecked: false,
        germanyChecked: false,
        moreChecked: false,
        progressValue: 0, 
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

    getProgressValue = () => {
            var value = 0;
            if(this.state.internChecked && this.state.germanyChecked && this.state.moreChecked){
                return 100;
            }
            this.state.internChecked ? value += 33.3 : value += 0;
            this.state.germanyChecked ? value += 33.3 : value += 0;
            this.state.moreChecked ? value += 33.3 : value += 0;
    
            return value;
    };

    toggleIntern = () => {
        this.setState({ internChecked: !this.state.internChecked })
    }

    toggleGermany = () => {
        this.setState({ germanyChecked: !this.state.germanyChecked })
    }

    toggleMore = () => {
        this.setState({ moreChecked: !this.state.moreChecked })
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
        console.log('this.state.extCourse', this.state.extCourses)
    }
    
    addUniversity = (university) => {
        this.uniDB.data(university).create(() => {
            this.getUnis()
        })
        console.log('this.state.universities', this.state.universities)
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
                        {this.state.extCourses && this.state.extCourses.length > 0 && this.state.extCourses.map((c, idx) => <option key={'course-option-' + idx} 
                        value={c.courseID}>{c.courseName}</option>)}
                    </Input> 
                </Col>
            </Row>
            
            <Row xs={2}>
                <Col xs={6}>
                    <FormGroup>
                        <div className="documentChecks">
                            <CustomInput disabled={this.props.disabled} type="checkbox" defaultChecked={this.state.internChecked} 
                            onChange={this.toggleIntern} id="hochschulinternCheckbox" label="Hochschulinterner Wechsel?"/>
                            <CustomInput disabled={this.props.disabled} type="checkbox" defaultChecked={this.state.germanyChecked} 
                            onChange={this.toggleGermany} id="germanyCheckbox" label="Institution in Deutschland?" />
                            <CustomInput disabled={this.props.disabled} type="checkbox" defaultChecked={this.state.moreChecked} 
                            onChange={this.toggleMore} id="moreCheckbox" label="weitere Überprüfung notwendig?"/>
                        </div>
                    </FormGroup>
                </Col>
                <Col xs={6}>
                    <Progress color="success" value={this.getProgressValue()}>{(this.getProgressValue())}% Vollständig</Progress>
                </Col >
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


