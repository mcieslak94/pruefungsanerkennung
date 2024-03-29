import React, {Component} from 'react'
import { Form, FormGroup, Row, Col, Label, Input } from 'reactstrap'
import DocumentDetail from './document.panel';
import CaseProofPanel from './case.proof.panel';
import CaseModulePanel from './case.module.panel';
import CoursesInput from '../Components/inputField.courses'
import EditFooter from './globals/edit.footer';
import { GrMailOption } from "react-icons/gr";
import { CreateTemplate } from '../utils/mail.template.util';
import Moment from 'moment'
import OnChangeAlert from './onChange.alert.modal';

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
            },
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

    closeCase = (abgeschlossen) => {
        this.setChangeMode()
        this.props.closeCase(abgeschlossen)
    }

    resetChanges = () => {
        this.props.resetChanges()
        this.setChangeMode()
    }

    setChangeMode = () => {
        this.setState( {disabled: !this.state.disabled} )
        this.props.toggleIsOnChange()
    }

    getDocs = () => {
        let docAntrag = this.props.data.docAntrag === 0 ? 'nicht eingereicht' : this.props.data.docAntrag=== 1 ? 'nicht vollständig ausgefüllt' : 'vollständig'
        let docNoten = this.props.data.docNoten === 0 ? 'nicht eingereicht' : this.props.data.docNoten=== 1 ? 'nicht vollständig ausgefüllt' : 'vollständig'
        let docHandbuch = this.props.data.docHandbuch === 0 ? 'nicht eingereicht' : this.props.data.docHandbuch=== 1 ? 'nicht vollständig ausgefüllt' : 'vollständig'
        let docString = '%0D%0AAnerkennungsantrag: ' + docAntrag + '%0D%0ANotenübersicht: ' + docNoten + '%0D%0AModulhandbuch: ' + docHandbuch
        return docString
    }

    render = () => {
    return this.props.data
    ?
    <>
    <div style={{ paddingBottom: "70px"}}>
        <Form>
            <Row>
            <Col xs={10}>
                <h3>{(this.props.data.caseFirstName ? this.props.data.caseFirstName : '') + ' ' + (this.props.data.caseLastName ? this.props.data.caseLastName : '')}</h3>
            </Col>
            <Col xs={2}>
                Status: {(this.props.data.state ? this.props.data.state : 'nicht angegeben')}
            </Col>
            </Row>
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
                        <Input disabled={this.state.disabled} type='select' value={this.props.data.geschlecht ? this.props.data.geschlecht : ''} 
                            onChange={value => this.handleChange('geschlecht', value)} > 
                            <option value={-1}>Geschlecht auswählen..</option> 
                            <option value={'m'}>männlich</option> 
                            <option value={'w'}>weiblich</option> 
                            <option value={'d'}>divers</option> 
                        </Input>
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
                        <a href={CreateTemplate('missingDoc', { mail: this.props.data.email, gender: this.props.data.geschlecht==='w' ? 'Frau' : 'Herr', lastName: this.props.data.caseLastName, date: Moment(this.props.data.createDateCase).format('DD.MM.YYYY'), docs: this.getDocs()})}><GrMailOption /></a>
                    </Col>
                    
                    
                </Row>
            </FormGroup>

        <hr />
        <h4>Prüfung der Institution</h4>
        <Row style={{ padding: 16 }}>
            <Col xs={12}>
                <CaseProofPanel 
                data={this.props.data}
                disabled={this.state.disabled} 
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
    <EditFooter editActive={!this.state.disabled} onSave={this.saveChanges} toggle={this.resetChanges} closeCase={this.closeCase} />
    
    <OnChangeAlert  
        open={this.props.alertModalOpen} 
        toggle={() => this.props.toggle()}
    />
    </>
    : <></>    
}
}