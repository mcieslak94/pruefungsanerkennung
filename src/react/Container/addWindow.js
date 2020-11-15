import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap'
import CoursesInput from '../Components/inputField.courses'


export default class AddWindow extends Component {

    render = () => {
        return <Form>
            <FormGroup>
                <Row xs={2} style={{ padding: 16 }}>
                <Col>
                    <Label for="caseFirstName">Vorname</Label>
                    <Input id="caseFirstName" type='text' value={this.props.data && this.props.data.caseFirstName} 
                    onChange={value => this.props.onChange('caseFirstName', value)} placeholder="Vorname eintragen" />
                </Col>
                <Col>
                    <Label for="caseLastName">Nachname</Label>
                    <Input id="caseLastName" type='text' value={this.props.data && this.props.data.caseLastName} 
                    onChange={value => this.props.onChange('caseLastName', value)} placeholder="Nachname eintragen" />
                </Col>
                <Col> 
                    <Label for="mNumber">Matrikelnummer</Label>
                    <Input id="mNumber" type='text' value={this.props.data && this.props.data.mNumber}  
                    onChange={value => this.props.onChange('mNumber', value)} placeholder="Matrikelnummer eintragen" />
                </Col>
                <Col> 
                    <Label for="email">E-Mail-Adresse</Label>
                    <Input id="email" type='text' value={this.props.data.email ? this.props.data.email : ''} 
                    onChange={value => this.props.onChange('email', value)} placeholder="E-Mail-Adresse angeben"/>
                </Col>
                <Col> 
                    <Label for="geschlecht">Geschlecht</Label>
                    <Input id="geschlecht" type='text' value={this.props.data.geschlecht ? this.props.data.geschlecht : ''} 
                    onChange={value => this.props.onChange('geschlecht', value)} placeholder="Geschlecht angeben"/>
                </Col>
                <Col>
                    <Label for="courseID">Studiengang</Label>
                    <CoursesInput id="courseID" value={this.props.data.courseID ? this.props.data.courseID : ''} handleChange={this.props.onChange} />
                </Col>
                </Row>
            </FormGroup>
        </Form>
    }
}