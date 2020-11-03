import React, { Component } from 'react'
import { GrMailOption } from 'react-icons/gr';
import { Progress, Row, Col, FormGroup, CustomInput} from 'reactstrap'
import '../App.css';
import { CreateTemplate } from '../utils/mail.template.util';


export default class DocumentsPanel extends Component {

    state = { 
        progressValue: 0,
        completeAntrag: false,
        completeGrades: false,
        completeHandbuch: false
    }  
        
    getProgressValue = () => {
            var value = 0;
            if(this.props.data.docAntrag===2 && this.props.data.docNoten===2 && this.props.data.docHandbuch===2){
                return 100;
            }
            this.props.data.docAntrag===2 ? value += 33.3 : value += 0;
            this.props.data.docNoten===2 ? value += 33.3 : value += 0;
            this.props.data.docHandbuch===2 ? value += 33.3 : value += 0;
    
            return value;
    };

    toggleAntrag = () => {
        if (this.props.data.docAntrag === 0){
            this.props.data.docAntrag = 1
            this.setState({docAntrag: 1})
        } else {
            this.props.data.docAntrag = 0
            this.setState({docAntrag: 0})
        }
    }

    toggleGrades = () => {
        if (this.props.data.docNoten === 0){
                this.props.data.docNoten = 1
                this.setState({docNoten: 1})
        } else {
                this.props.data.docNoten = 0
                this.setState({docNoten: 0})
        }    
    }

    toggleModul = () => {
        if (this.props.data.docHandbuch === 0){
            this.props.data.docHandbuch = 1
            this.setState({docHandbuch: 1})
        } else {
            this.props.data.docHandbuch = 0
            this.setState({docHandbuch: 0})
        }    
    }

    toggleAntragComplete = () => {
        if (this.props.data.docAntrag === 1){
            this.props.data.docAntrag = 2
            this.setState({docAntrag: 2})
        } else {
            this.props.data.docAntrag = 1
            this.setState({docAntrag: 1})
        }
    }

    toggleGradesComplete = () => {
        if (this.props.data.docNoten === 1){
            this.props.data.docNoten = 2
            this.setState({docNoten: 2})
        } else {
            this.props.data.docNoten = 1
            this.setState({docNoten: 1})
        }  
    }

    toggleModulComplete = () => {
        if (this.props.data.docHandbuch === 1){
            this.props.data.docHandbuch = 2
            this.setState({docHandbuch: 2})
        } else {
            this.props.data.docHandbuch = 1
            this.setState({docHandbuch: 1})
        }  
    }
    
    
    render = () => {
    return ( 
        <div>
            
            <Row xs={3}>
                <Col xs={3}>
                    <FormGroup>
                        <div className="documentChecks">
                            <CustomInput disabled={this.props.disabled} checked={this.props.data.docAntrag>0} type="checkbox" 
                            id="docAntrag" onChange={this.toggleAntrag} label="Prüfungsanerkennungsantrag"/>
                            <CustomInput disabled={this.props.disabled} checked={this.props.data.docNoten>0} type="checkbox" 
                            id="docNoten" onChange={this.toggleGrades} label="Notenspiegel"/>
                            <CustomInput disabled={this.props.disabled} checked={this.props.data.docHandbuch>0} type="checkbox" 
                            id="docHandbuch" onChange={this.toggleModul} label="Modulhandbuch"/>
                        </div>
                    </FormGroup>
                </Col>
                <Col xs={2}>
                    <FormGroup>
                        <div className="documentComplete">
                            <CustomInput disabled={!(this.props.data.docAntrag>=1)} checked={this.props.data.docAntrag>1} type="checkbox" 
                            id="docAntragComplete" onChange={this.toggleAntragComplete} label="Vollständig?"/> 
                            <CustomInput disabled={!(this.props.data.docNoten>0)} checked={this.props.data.docNoten>1} type="checkbox" 
                            id="docNotenComplete" onChange={this.toggleGradesComplete} label="Vollständig?"/>
                            <CustomInput disabled={!(this.props.data.docHandbuch>0)} checked={this.props.data.docHandbuch>1} type="checkbox" 
                            id="docHandbuchComplete" onChange={this.toggleModulComplete} label="Vollständig?"/>
                        </div>
                    </FormGroup>
                </Col>
                <Col xs={1} >
                    <div style={{fontSize:'30px'}}><a href={CreateTemplate('missingDocuments', { mail: 'tet@test.de', firstName: 'Heidi', lastName: 'Müller', date: '10.10.20' })}><GrMailOption /></a></div>
                </Col>
                <Col xs={6}>
                    <Progress color="success" value={this.getProgressValue()}>{(this.getProgressValue())}% Vollständig</Progress>
                </Col>
            </Row>
        </div>
    );
    }
}


