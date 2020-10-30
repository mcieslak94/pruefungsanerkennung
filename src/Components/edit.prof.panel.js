import React, { Component } from 'react'
import { Row, Col, FormGroup, Label, Input} from 'reactstrap'
import '../App.css';


export default class EditProfBaseDataPanel extends Component {

    state = { 
        form: {
            titel: '', 
            profName: '',
            profEmailadress: ''            
        } 
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
                        <Col>
                            <Label for="titel">Titel</Label>
                            <Input disabled={this.props.disabled} type='text' value={this.props.data.titel ? this.props.data.titel : ''} 
                            onChange= {value => this.handleChange('titel', value)} />
                        </Col>
                        <Col>
                            <Label for="profName">Nachname</Label>
                            <Input disabled={this.props.disabled} type='text' value={this.props.data.profName ? this.props.data.profName : ''} 
                            onChange={value => this.handleChange('profName', value)} />
                        </Col>
                        <div style={{borderTop: '10px solid white'}}></div>
                        <Col xs={12}> 
                            <Label for="profEmailadress">E-Mail-Adresse</Label>
                            <Input disabled={this.props.disabled} type='text' value={this.props.data.profEmailadress ? this.props.data.profEmailadress : ''} 
                            onChange={value => this.handleChange('profEmailadress', value)} />
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


