import React, { Component } from 'react'
import { Progress, Row, Col, FormGroup, CustomInput} from 'reactstrap'
import '../App.css';


export default class DocumentsPanel extends Component {

    state = { 
        progressValue: 0
    } 
        
    getProgressValue = () => {
            var value = 0;
            if(this.props.data.docAntrag && this.props.data.docNoten && this.props.data.docHandbuch){
                return 100;
            }
            this.props.data.docAntrag ? value += 33.3 : value += 0;
            this.props.data.docNoten ? value += 33.3 : value += 0;
            this.props.data.docHandbuch ? value += 33.3 : value += 0;
    
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
        }    }

    toggleModul = () => {
        if (this.props.data.docHandbuch === 0){
            this.props.data.docHandbuch = 1
            this.setState({docHandbuch: 1})
        } else {
            this.props.data.docHandbuch = 0
            this.setState({docHandbuch: 0})
        }    }
    
    
    render = () => {
    return ( 
        <div>
            
            <Row>
                <Col>
                    <FormGroup>
                        <div className="documentChecks">
                            <CustomInput disabled={this.props.disabled} checked={this.props.data.docAntrag} type="checkbox" 
                            id="docAntrag" onChange={this.toggleAntrag} label="Antrag auf Prüfungsanerkennung"/>
                            <CustomInput disabled={this.props.disabled} checked={this.props.data.docNoten} type="checkbox" 
                            id="docNoten" onChange={this.toggleGrades} label="Notenspiegel"/>
                            <CustomInput disabled={this.props.disabled} checked={this.props.data.docHandbuch} type="checkbox" 
                            id="docHandbuch" onChange={this.toggleModul} label="Modulhandbuch"/>
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


