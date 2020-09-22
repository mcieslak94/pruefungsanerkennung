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
                    <Input id="caseFirstName" type='text' value={this.props.data && this.props.data.caseFirstName} onChange={e => this.props.onChange('caseFirstName', e.target.value)} placeholder="Vorname eintragen" />
                </Col>
                <Col>
                    <Label for="caseLastName">Nachname</Label>
                    <Input id="caseLastName" type='text' value={this.props.data && this.props.data.caseLastName} onChange={e => this.props.onChange('caseLastName', e.target.value)} placeholder="Nachname eintragen" />
                </Col>
                <Col> 
                    <Label for="mNumber">Matrikelnummer</Label>
                    <Input id="mNumber" type='text' value={this.props.data && this.props.data.mNumber}  onChange={e => this.props.onChange('mNumber', e.target.value)} placeholder="Matrikelnummer eintragen" />
                </Col>
                <Col>
                    <Label for="courseID">Studiengang</Label>
                    <CoursesInput id="courseID" value={this.props.data.courseID} onChange={ value => this.props.onChange('courseID', value)} />
                </Col>
                </Row>
            </FormGroup>
        </Form>
    }
}