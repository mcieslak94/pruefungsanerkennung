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
            if(this.props.data.intern && this.props.data.inGermany && this.props.data.otherChecks){
                return 100;
            }
            this.props.data.intern ? value += 33.3 : value += 0;
            this.props.data.inGermany ? value += 33.3 : value += 0;
            this.props.data.otherChecks ? value += 33.3 : value += 0;
    
            return value;
    };

    toggleIntern = () => {
        if (this.props.data.intern === 0){
            this.props.data.intern = 1
            this.setState({intern: 1})
        } else {
            this.props.data.intern = 0
            this.setState({intern: 0})
        }
    }

    toggleGermany = () => {
        if (this.props.data.inGermany === 0){
            this.props.data.inGermany = 1
            this.setState({inGermany: 1})
        } else {
            this.props.data.inGermany = 0
            this.setState({inGermany: 0})
        }
    }

    toggleMore = () => {
        if (this.props.data.otherChecks === 0){
            this.props.data.otherChecks = 1
            this.setState({otherChecks: 1})
        } else {
            this.props.data.otherChecks = 0
            this.setState({otherChecks: 0})
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
                        <div className="instChecked">
                            <CustomInput disabled={this.props.disabled} type="checkbox" checked={this.props.data.intern} 
                            onChange={this.toggleIntern} id="intern" label="Hochschulinterner Wechsel?"/>
                            <CustomInput disabled={this.props.disabled} type="checkbox" checked={this.props.data.inGermany} 
                            onChange={this.toggleGermany} id="inGermany" label="Institution in Deutschland?" />
                            <CustomInput disabled={this.props.disabled} type="checkbox" checked={this.props.data.otherChecks} 
                            onChange={this.toggleMore} id="otherChecks" label="weitere Überprüfung notwendig?"/>
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


