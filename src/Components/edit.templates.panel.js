import React, { Component } from 'react'
import { Row, Col, FormGroup, Label, Input} from 'reactstrap'
import '../App.css';


export default class TemplatePanel extends Component {

    state = { 
        antragChecked: false,
        gradesChecked: false,
        modulChecked: false,
        progressValue: 0
    } 
     
    handleChange = (prop, e) => {
        let tempForm = this.props.data
        tempForm[prop] = e.target.value
        this.setState({ tempForm })
    }

    render = () => {
    return ( 
    this.props.data
    ?
        <div>
            <Row>
                <Col>
                <FormGroup>
                    <Row xs={2}>
                        <Col xs={12}>
                            <Label for="templateBetreff">Betreff der Vorlage</Label>
                            <Input disabled={this.props.disabled} type='text' value={this.props.data.templateBetreff ? this.props.data.templateBetreff : ''} 
                            onChange= {value => this.handleChange('templateBetreff', value)} />

                            <Label for="templateText">Text der Vorlage</Label>
                            <Input disabled={this.props.disabled} type="textarea" name="templateText" id="templateText"
                            value={this.props.data.templateText ? this.props.data.templateText : ''}     
                            onChange= {value => this.handleChange('templateText', value)} placeholder="Text eintragen"/>
                        </Col>         
                    </Row>
                </FormGroup>
                </Col>
            </Row>
        </div>
          : <></> 
    );
    }
}


