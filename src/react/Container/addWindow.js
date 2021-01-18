import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap'
import CustomInput from 'reactstrap/lib/CustomInput'
import FormFeedback from 'reactstrap/lib/FormFeedback'
import CoursesInput from '../Components/inputField.courses'


export default class AddWindow extends Component {

    render = () => {
        return <Form>
            <FormGroup> 
                <Row xs={2} style={{ padding: 16 }}>
                <Col>
                    <Label for="caseFirstName">Vorname*</Label>
                    <Input invalid={this.props.errors.firstNameError} id="caseFirstName" type='text' value={this.props.data && this.props.data.caseFirstName} 
                    onChange={value => this.props.onChange('caseFirstName', value)} placeholder="Vorname eintragen" />
                    <FormFeedback invalid={this.props.errors.firstNameError}>Bitte einen Vornamen angeben</FormFeedback>
                </Col>
                <Col>
                    <Label for="caseLastName">Nachname*</Label>
                    <Input invalid={this.props.errors.lastNameError} id="caseLastName" type='text' value={this.props.data && this.props.data.caseLastName} 
                    onChange={value => this.props.onChange('caseLastName', value)} placeholder="Nachname eintragen" />
                    <FormFeedback invalid={this.props.errors.lastNameError}>Bitte einen Nachnamen angeben</FormFeedback>
                </Col>
                <Col> 
                    <Label for="mNumber">Matrikelnummer*</Label>
                    <Input invalid={this.props.errors.matrikelError} id="mNumber" type='text' value={this.props.data && this.props.data.mNumber}  
                    onChange={value => this.props.onChange('mNumber', value)} placeholder="Matrikelnummer eintragen" />
                    <FormFeedback invalid={this.props.errors.matrikelError}>Bitte eine Matrikelnummer angeben</FormFeedback>
                </Col>
                <Col> 
                    <Label for="email">E-Mail-Adresse*</Label>
                    <Input invalid={this.props.errors.emailError} id="email" type='text' value={this.props.data.email ? this.props.data.email : ''} 
                    onChange={value => this.props.onChange('email', value)} placeholder="E-Mail-Adresse angeben"/>
                    <FormFeedback invalid={this.props.errors.emailError}>Bitte eine E-Mail-Adresse angeben</FormFeedback>
                </Col>
                <Col> 
                    <Label for="geschlecht">Geschlecht*</Label>
                    <CustomInput invalid={this.props.errors.geschlechtError} 
                        type="select" 
                        id="geschlecht" 
                        name="geschlecht"
                        onChange={value => this.props.onChange('geschlecht', value)}> 
                        <option value={-1}>Geschlecht auswählen..</option> 
                        <option value={'m'}>männlich</option> 
                        <option value={'w'}>weiblich</option> 
                        <option value={'d'}>divers</option> </CustomInput>
                    <FormFeedback check invalid={this.props.errors.geschlechtError}>Bitte eine Geschlecht angeben</FormFeedback>
                </Col>
                <Col>
                    <Label for="courseID">Studiengang*</Label>
                    <CoursesInput courseError={this.props.errors.courseError} id="courseID" value={this.props.data.courseID ? this.props.data.courseID : ''} handleChange={this.props.onChange} />
                </Col>
                <Col xs={12}>
                    <hr />
                </Col>
                <Col xs={12}>
                    * Pflichtfelder
                </Col>
                </Row>
            </FormGroup>
        </Form>
    }
}