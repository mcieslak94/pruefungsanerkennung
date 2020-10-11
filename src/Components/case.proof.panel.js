import React, { Component } from 'react'
import { Progress, Row, Col, FormGroup, CustomInput, Label, Input} from 'reactstrap'
import '../App.css';

const electron = window.require('electron')

export default class CaseProofPanel extends Component {

    constructor(props) {
        super(props)
        const DatabaseUni = electron.remote.require('./university.db.js')
        this.UniversityData = DatabaseUni()
    }
    state = { 
        internChecked: false,
        germanyChecked: false,
        moreChecked: false,
        progressValue: 0, 
        university: null
    } 

    componentDidUpdate(prevProps) {
        if((prevProps.data == null && this.props.data != null) || (this.props.data != null && (this.props.data.universityID !== prevProps.data.universityID))){
            this.getUniversityName()
        }
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
    
    
    render = () => {
    return ( 
        <div>
            <Row xs={2}>
                    <Col xs={2} style={{ paddingTop: '5px'}}>
                        <Label for="caseFirstName">Institution wählen</Label>
                    </Col>
                    <Col xs={4} style={{ paddingBottom: '10px'}}>
                        <Input disabled={this.props.disabled} type='text' value={this.state.university && this.state.university.universityName ? this.state.university.universityName : ''} 
                        onChange= {value => this.handleChange('universityID', value)} />
                    </Col>
                    <Col xs={6} style={{ paddingBottom: '10px'}}>
                    </Col>
            </Row>
            <Row xs={2}>
                <Col xs={6}>
                    <FormGroup>
                        <div className="documentChecks">
                            <CustomInput disabled={this.props.disabled} type="checkbox" defaultChecked={this.state.internChecked} onChange={this.toggleIntern} id="hochschulinternCheckbox" label="Hochschulinterner Wechsel?"/>
                            <CustomInput disabled={this.props.disabled} type="checkbox" defaultChecked={this.state.germanyChecked} onChange={this.toggleGermany} id="germanyCheckbox" label="Institution in Deutschland?" />
                            <CustomInput disabled={this.props.disabled} type="checkbox" defaultChecked={this.state.moreChecked} onChange={this.toggleMore} id="moreCheckbox" label="weitere Überprüfung notwendig?"/>
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


