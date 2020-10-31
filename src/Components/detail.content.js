import React, {Component} from 'react'
import { Form, FormGroup, Row, Col, Label, Input } from 'reactstrap'
import DocumentDetail from './document.panel';
import CaseProofPanel from './case.proof.panel';
import CaseModulePanel from './case.module.panel';
import CoursesInput from '../Components/inputField.courses'
import EditFooter from './globals/edit.footer';
import { GrMailOption } from "react-icons/gr";

export default class DetailContent extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            disabled: true,
            moduleModalOpen: false,
            archiv: false,
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
        let tempForm = this.props.data
        tempForm[prop] = e.target.value
        this.setState({ tempForm })
    }

    handleSubmit = () => {
        this.props.onSubmit(this.state.form)
        this.props.toggle()
        this.setState({ form: {} })
    }

    saveChanges = () => {
        this.props.saveChanges(this.props.data)
        this.setChangeMode()
    }

    resetChanges = () => {
        this.props.resetChanges()
        this.setChangeMode()
    }

    setChangeMode = () => {
        this.setState( {disabled: !this.state.disabled} )
    }

    render = () => {
    return this.props.data
    ?
    <>
    <div style={{ paddingBottom: "70px"}}>
        <Form>
        <h3>{(this.props.data.caseFirstName ? this.props.data.caseFirstName : '') + ' ' + (this.props.data.caseLastName ? this.props.data.caseLastName : '')}</h3>
        
        <FormGroup>
            <Row xs={2} style={{ padding: 16 }}>
                <Col>
                    <Label for="caseFirstName">Vorname</Label>
                    <Input disabled={this.state.disabled} type='text' value={this.props.data.caseFirstName ? this.props.data.caseFirstName : ''} 
                    onChange= {value => this.handleChange('caseFirstName', value)} />
                </Col>
                <Col>
                    <Label for="caseLastName">Nachname</Label>
                    <Input disabled={this.state.disabled} type='text' value={this.props.data.caseLastName ? this.props.data.caseLastName : ''} 
                    onChange={value => this.handleChange('caseLastName', value)} />
                </Col>
                <Col> 
                    <Label for="mNumber">Matrikelnummer</Label>
                    <Input disabled={this.state.disabled} type='text' value={this.props.data.mNumber ? this.props.data.mNumber : ''} 
                    onChange={value => this.handleChange('mNumber', value)} />
                </Col>
                <Col> 
                    <Label for="email">E-Mail-Adresse</Label>
                    <Input disabled={this.state.disabled} type='text' value={this.props.data.email ? this.props.data.email : ''} 
                    onChange={value => this.handleChange('email', value)} />
                </Col>
                <Col> 
                    <Label for="geschlecht">Geschlecht</Label>
                    <Input disabled={this.state.disabled} type='text' value={this.props.data.geschlecht ? this.props.data.geschlecht : ''} 
                    onChange={value => this.handleChange('geschlecht', value)} />
                </Col>
                <Col>
                <Label for="courseID">Studiengang</Label>
                    <CoursesInput disabled={this.state.disabled}  value={this.props.data.courseID ? this.props.data.courseID : ''} 
                    handleChange={this.handleChange} />
                </Col>
                <Col xs={3}> 
                    <Label for="reminderDate">Wiedervorlage</Label>
                    <Input disabled={this.state.disabled}
                        type="date" value={this.props.data.reminderDate ? this.props.data.reminderDate : ''}
                        id="reminderDate" placeholder="date placeholder" onChange={value => this.handleChange('reminderDate', value)}
                    />
                </Col>
                <Col xs={1} style={{fontSize:'30px', paddingTop: '14px'}}>
                        <a href={this.props.data.caseHref ? this.props.data.caseHref : ''}><GrMailOption /></a>
                </Col>
                
            </Row>
        </FormGroup>

        <hr />
        <h4>Prüfung der Institution</h4>
        <Row style={{ padding: 16 }}>
            <Col xs={12}>
                <CaseProofPanel 
                disabled={this.state.disabled} 
                data={this.props.data}
                />
            </Col>
        </Row>

        <hr />
        <h4>Dokumente</h4>
        <Row style={{ padding: 16 }}>
            <Col xs={12}>
                <DocumentDetail 
                data={this.props.data} 
                disabled={this.state.disabled}/>
            </Col>
        </Row>

        <hr />
        <h4>Module</h4>
        <Row style={{ padding: 16 }}>
            <Col xs={12}>
                <CaseModulePanel archiv={this.state.archiv}
                data={this.props.data} 
                disabled={this.state.disabled} 
                onSubmit={() => this.setState({ moduleModalOpen: true })}/>
            </Col>
        </Row>
        </Form>
    </div> 
    <EditFooter editActive={!this.state.disabled} onSave={this.saveChanges} toggle={this.resetChanges} />
    </>
    : <></>    
}
}