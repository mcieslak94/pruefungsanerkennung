import React, { Component } from 'react'
import { Progress, Row, Col, FormGroup, CustomInput, Label} from 'reactstrap'
import '../App.css';
import CourseExtInput from './university/inputField.courseExt';
import UniversityInput from './university/inputField.university';

const electron = window.require('electron')

export default class CaseProofPanel extends Component {

    constructor(props) {
        super(props)
        const DatabaseUni = electron.remote.require('./university.db.js')
        this.UniversityData = DatabaseUni()
        this.ExtCourseData = DatabaseUni()
    }
    state = { 
        internChecked: false,
        germanyChecked: false,
        moreChecked: false,
        progressValue: 0, 
        university: null,
        extCourses: null
    } 

    componentDidUpdate(prevProps) {
        if((prevProps.data == null && this.props.data != null) || (this.props.data != null && (this.props.data.universityID !== prevProps.data.universityID))){
            this.getUniversityName()
            this.getExtCourses()
        }
    }
    
    getExtCourses = () => {
        this.ExtCourseData.getExtCourses( extCourses => {
            this.setState({ extCourses })
          }) 
    }

    getUniversityName = () => {
        this.UniversityData.getUniversityName(this.props.data.universityID, university => {
            if(university && university.length > 0) university = university[0]
            this.setState({ university })
          }) 
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
    
    render = () => {
    return ( 
        <div>
            <Row xs={2} style={{ paddingBottom: 16 }}>
                <Col>
                    <Label for="caseFirstName">ehem. Institution </Label>
                    <UniversityInput disabled={this.props.disabled} id="universityID" 
                        value={this.props.data.universityID ? this.props.data.universityID : ''} 
                        onChange={value => this.saveUniversity('universityID', value)} />
                </Col>
                <Col>
                    <Label for="caseFirstName">ehem. Studiengang</Label>
                    <CourseExtInput disabled={this.props.disabled} id="courseNameExt" 
                        value={this.state.extCourses && this.state.extCourses.length > 0 ? this.state.extCourses : ''} 
                        onChange={value => this.saveUniversity('courseNameExt', value)} />
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
        </div>
    );
    }
}


