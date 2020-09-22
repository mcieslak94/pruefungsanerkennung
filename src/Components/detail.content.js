import React, {Component} from 'react'
import { Form, FormGroup, Row, Col, Label, Input, Button } from 'reactstrap'
import DocumentDetail from './document.panel';
import CaseProofPanel from './case.proof.panel';
import CaseModulePanel from './case.module.panel';
import CoursesInput from '../Components/inputField.courses'

export default class DetailContent extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            disabled: true,
            moduleModalOpen: false,
            form: {
                caseFirstName: '', 
                caseLastName: '', 
                mNumber: '', 
                courseID: '' ,
                documentID: '',
                caseID: '',
                email: '', 
                geschlecht: ''
            } 
        }
    }
    
    
    
    handleChange = (prop, e) => {
        console.log('a')
        let tempForm = this.props.data
        tempForm[prop] = e.target.value
        this.props.onChange(tempForm, prop, this.props.detail)
        this.setState({ tempForm })
        
    }

    handleSubmit = () => {
        this.props.onSubmit(this.state.form)
        this.props.toggle()
        this.setState({ form: {} })
    }

    setChangeMode = () => {
        this.setState( {disabled: !this.state.disabled} )
    }

    render = () => {
    return this.props.data
    ? 
    <>
    <Form>
    <h3>{(this.props.data.caseFirstName ? this.props.data.caseFirstName : '') + ' ' + (this.props.data.caseLastName ? this.props.data.caseLastName : '')}</h3>
    <Row style={{ padding: 16}}>
        {this.state.disabled && <Button color="primary" onClick={this.setChangeMode} 
        
                disabled = {(!this.state.disabled)? true : false}>
                    Fall bearbeiten
        </Button>}
        {!this.state.disabled && <Button color="secondary" onClick={this.setChangeMode} 
                disabled = {(this.state.disabled)? true : false}>
                    Speichern
        </Button>}
    </Row>  
    <FormGroup>
        <Row xs={2} style={{ padding: 16 }}>
            <Col>
                <Label for="caseFirstName">Vorname</Label>
                <Input disabled={this.state.disabled} type='text' value={this.props.data.caseFirstName ? this.props.data.caseFirstName : ''} 
                onChange={value => this.props.onChange(this.props.data.caseID, 'caseFirstName', value)} />
            </Col>
            <Col>
                <Label for="caseLastName">Nachname</Label>
                <Input disabled={this.state.disabled} type='text' value={this.props.data.caseLastName ? this.props.data.caseLastName : ''} 
                onChange={value => this.props.onChange(this.props.data.caseID, 'caseLastName', value)} />
            </Col>
            <Col> 
                <Label for="mNumber">Matrikelnummer</Label>
                <Input disabled={this.state.disabled} type='text' value={this.props.data.mNumber ? this.props.data.mNumber : ''} 
                onChange={value => this.props.onChange(this.props.data.caseID, 'mNumber', value)} />
            </Col>
            <Col> 
                <Label for="email">E-Mail-Adresse</Label>
                <Input disabled={this.state.disabled} type='text' value={this.props.data.email ? this.props.data.email : ''} 
                onChange={value => this.props.onChange(this.props.data.caseID, 'email', value)} />
            </Col>
            <Col> 
                <Label for="geschlecht">Geschlecht</Label>
                <Input disabled={this.state.disabled} type='text' value={this.props.data.geschlecht ? this.props.data.geschlecht : ''} 
                onChange={value => this.props.onChange(this.props.data.caseID, 'geschlecht', value)} />
            </Col>
            <Col>
            <Label for="courseID">Studiengang</Label>
                <CoursesInput disabled={this.state.disabled}  value={this.props.data.courseID ? this.props.data.courseID : ''} 
                onChange={ value => this.props.onChange(this.props.data.caseID, 'courseID', value)} />
            </Col>
        </Row>
    </FormGroup>

    <hr />
    <h4>Prüfung der Institution</h4>
    <Row style={{ padding: 16 }}>
        <Col xs={12}>
            <CaseProofPanel disabled={this.state.disabled} />
        </Col>
    </Row>

    <hr />
    <h4>Dokumente</h4>
    <Row style={{ padding: 16 }}>
        <Col xs={12}>
            <DocumentDetail disabled={this.state.disabled} />
        </Col>
    </Row>

    <hr />
    <h4>Module</h4>
    <Row style={{ padding: 16 }}>
        <Col xs={12}>
            <CaseModulePanel disabled={this.state.disabled} onSubmit={() => this.setState({ moduleModalOpen: true })}/>
        </Col>
    </Row>
    </Form>
         
    </> 
    : <></>    
}
}