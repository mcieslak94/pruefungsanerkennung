import React, { Component } from 'react'
import { Progress, Row, Col, FormGroup, CustomInput} from 'reactstrap'
import '../App.css';


export default class CaseProofPanel extends Component {

    state = { 
        internChecked: false,
        germanyChecked: false,
        moreChecked: false,
        progressValue: 0
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
        console.log("toggle!")
    }

    toggleGermany = () => {
        this.setState({ germanyChecked: !this.state.germanyChecked })
        console.log("toggle!")
    }

    toggleMore = () => {
        this.setState({ moreChecked: !this.state.moreChecked })
        console.log("toggle!")
    }
    
    
    render = () => {
    return ( 
        <div>
            
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
                    <a href="google.de"><button disabled={this.props.disabled}> Anabin öffnen</button> </a>
                </Col> 
            </Row>
        </div>
    );
    }
}


