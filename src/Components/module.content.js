import React, {Component} from 'react'
import { Form, FormGroup, Row, Col, Label, Input, CustomInput, InputGroup, ButtonToggle } from 'reactstrap'

export default class ModuleContent extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            disabled: true,
            documentsModalOpen: false,
            form: {
                moduleName: '', 
                profName: '', 
                creditpoints: '', 
                courseID: '' ,
                profEmail: ''
            } 
        }
    }
    
    handleChange = (prop, e) => {
        let tempForm = this.props.data
        tempForm[prop] = e.target.value
        this.props.onChange(tempForm, this.props.detail)
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
    <h3>{(this.props.data.moduleName ? this.props.data.moduleName : '')}</h3>
    <Form>
    <Row style={{ padding: 16}}>
        {this.state.disabled && <ButtonToggle  color="primary" onClick={this.setChangeMode} 
        
                disabled = {(!this.state.disabled)? true : false}>
                    Fall bearbeiten
        </ButtonToggle >}
        {!this.state.disabled && <ButtonToggle color="success" onClick={this.setChangeMode} 
                disabled = {(this.state.disabled)? true : false}>
                    Übernehmen
        </ButtonToggle>} {'  '}
        {!this.state.disabled && <ButtonToggle color="danger" onClick={this.setChangeMode} 
                disabled = {(this.state.disabled)? true : false}>
                    Abbrechen
        </ButtonToggle>}
    </Row>  
        <FormGroup>
                <Row xs={2} style={{ padding: 16 }}>
                    <Col>
                        <Label for="moduleName">Modulname</Label>
                        <Input disabled={this.state.disabled} value={this.props.data.moduleName ? this.props.data.moduleName : ''} 
                        onChange={e => this.props.onChange('moduleName', e.target.value)} 
                        type="text" placeholder="Modulname eintragen" />
                    </Col>
                    <Col>
                        <Label for="creditpoints">Credit Points</Label>
                        <Input disabled={this.state.disabled} value={this.props.data.creditpoints ? this.props.data.creditpoints : ''} 
                        onChange={e => this.props.onChange('creditPoints', e.target.value)} 
                        type="text" placeholder="Credit Points eintragen" />
                    </Col>
                    <Col>
                        <Label for="profName">Lehrender</Label>
                        <Input disabled={this.state.disabled} value={this.props.data.profName ? this.props.data.profName : ''} 
                        onChange={e => this.props.onChange('profName', e.target.value)} 
                        type="text" placeholder="Name des Lehrenden eintragen" />
                    </Col>
                    <Col>
                        <Label for="profEmail">E-Mail-Adresse</Label>
                        <Input disabled={this.state.disabled} value={this.props.data.profEmail ? this.props.data.profEmail : ''} 
                        onChange={e => this.props.onChange('profEmail', e.target.value)} 
                        type="text" placeholder="E-Mail-Adresse eintragen" />
                    </Col>
                    <Col xs={3}>
                        <Label for="courseID">Studiengang</Label>
                        <InputGroup >
                            <CustomInput disabled={this.state.disabled}  type="checkbox"  id="praktische" label="Praktische Informatik" />
                            <CustomInput disabled={this.state.disabled}  type="checkbox"  id="wirtschaft" label="Wirtschaftsinformatik"/>
                            <CustomInput disabled={this.state.disabled}  type="checkbox"  id="theoretische" label="Theoretische Informatik"/>
                        </InputGroup>
                    </Col>
                </Row>
        </FormGroup>
            
</Form>
    
    </> 
    : <></>    
}
}