import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Row, Col, CustomInput } from 'reactstrap'

export default class AddModuleWindow extends Component {

    render = () => {
        return <Form>
            <FormGroup>
                <Row xs={2} style={{ padding: 16 }}>
                    <Col>
                        <Label for="moduleName">Modulname</Label>
                        <Input value={this.props.data && this.props.data.name} 
                        onChange={e => this.props.onChange('moduleName', e.target.value)} 
                        type="text" name="moduleName" id="moduleName" 
                        placeholder="Modulname eintragen" />
                    </Col>
                    <Col>
                        <Label for="creditPoints">Credit Points</Label>
                        <Input value={this.props.data && this.props.data.creditPoints} 
                        onChange={e => this.props.onChange('creditPoints', e.target.value)} 
                        type="text" name="creditPoints" id="creditPoints" 
                        placeholder="Credit Points eintragen" />
                    </Col>
                    <Col>
                        <Label for="profName">Lehrender</Label>
                        <Input value={this.props.data && this.props.data.profName} 
                        onChange={e => this.props.onChange('profName', e.target.value)} 
                        type="text" name="profName" id="profName" 
                        placeholder="Name des Lehrenden eintragen" />
                    </Col>
                    <Col>
                        <Label for="profEmail">E-Mail-Adresse</Label>
                        <Input value={this.props.data && this.props.data.profEmail} 
                        onChange={e => this.props.onChange('profEmail', e.target.value)} 
                        type="text" name="profEmail" id="profEmail" 
                        placeholder="E-Mail-Adresse eintragen" />
                    </Col>
                    <Col>
                        <Label for="courseID">Studiengang</Label>
                        <CustomInput type="checkbox"  id="praktische1" label="Praktische Informatik" />
                        <CustomInput type="checkbox"  id="wirtschaft1" label="Wirtschaftsinformatik"/>
                        <CustomInput type="checkbox"  id="theoretische1" label="Theoretische Informatik"/>
                    </Col>
                </Row>
            </FormGroup>
        </Form>
    }
}