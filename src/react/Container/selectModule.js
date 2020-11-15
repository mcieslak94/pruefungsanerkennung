import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Row, Col, CustomInput } from 'reactstrap'

export default class SelectModule extends Component {

    render = () => {
        return <Form>
            <FormGroup>
                <Row xs={2} style={{ padding: 16 }}>
                    <Col>
                        <Label for="name">Modulname</Label>
                        <Input value={this.props.data && this.props.data.name} 
                        onChange={e => this.props.onChange('name', e.target.value)} 
                        type="text" name="name" id="name" 
                        placeholder="Modulname eintragen" />
                    </Col>
                    <Col>
                        <Label for="prof">zuständiger Fachkollege</Label>
                        <Input value={this.props.data && this.props.data.prof} 
                        onChange={e => this.props.onChange('prof', e.target.value)} 
                        type="text" name="prof" id="prof" 
                        placeholder="Name des Professors eintragen" />
                    </Col>
                    <Col>
                        <Label for="creditPoints">Credit Points</Label>
                        <Input value={this.props.data && this.props.data.creditPoints} 
                        onChange={e => this.props.onChange('creditPoints', e.target.value)} 
                        type="text" name="creditPoints" id="creditPoints" 
                        placeholder="Credit Points eintragen" />
                    </Col>
                    <Col>
                        <Label for="courseName">Studiengang</Label>
                        <CustomInput type="checkbox"  id="praktische1" label="Praktische Informatik" />
                        <CustomInput type="checkbox"  id="wirtschaft1" label="Wirtschaftsinformatik"/>
                        <CustomInput type="checkbox"  id="theoretische1" label="Theoretische Informatik"/>
                    </Col>
                </Row>
            </FormGroup>
        </Form>
    }
}