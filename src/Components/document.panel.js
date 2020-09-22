import React, { Component } from 'react'
import { Progress, Row, Col, FormGroup, CustomInput} from 'reactstrap'
import '../App.css';


export default class DocumentsPanel extends Component {

    state = { 
        antragChecked: false,
        gradesChecked: false,
        modulChecked: false,
        progressValue: 0
    } 
        
    
    getProgressValue = () => {
            var value = 0;
            if(this.state.antragChecked && this.state.gradesChecked && this.state.modulChecked){
                return 100;
            }
            this.state.antragChecked ? value += 33.3 : value += 0;
            this.state.gradesChecked ? value += 33.3 : value += 0;
            this.state.modulChecked ? value += 33.3 : value += 0;
    
            return value;
    };

    toggleAntrag = () => {
        this.setState({ antragChecked: !this.state.antragChecked })
        console.log("toggle!")
    }

    togglGrades = () => {
        this.setState({ gradesChecked: !this.state.gradesChecked })
        console.log("toggle!")
    }

    toggleModul = () => {
        this.setState({ modulChecked: !this.state.modulChecked })
        console.log("toggle!")
    }
    
    
    render = () => {
    return ( 
        <div>
            
            <Row>
                <Col>
                    <FormGroup>
                        <div className="documentChecks">
                            <CustomInput type="checkbox" id="antragCheckbox" onChange={this.toggleAntrag} label="Antrag auf Prüfungsanerkennung" readOnly/>
                            <CustomInput type="checkbox" id="gradesCheckbox" onChange={this.togglGrades} label="Notenspiegel"  readOnly/>
                            <CustomInput type="checkbox" id="modulCheckbox" onChange={this.toggleModul} label="Modulhandbuch" readOnly/>
                        </div>
                    </FormGroup>
                </Col>
                <Col xs={6}>
                    <Progress color="success" value={this.getProgressValue()}>{(this.getProgressValue())}% Vollständig</Progress>
                </Col>
            </Row>
        </div>
    );
    }
}


