import React, { Component } from 'react'
import { Form, FormGroup, Label, Row, Col, CustomInput } from 'reactstrap'

export default class DocumentWindow extends Component {

    render = () => {
        return <Form>
            <FormGroup>
                <Row xs={2} style={{ padding: 16 }}>
                   <Col>
                    <Label for="antragAnerkennung">Antrag hochladen</Label>
                        <CustomInput type="file" id="antragAnerkennung" name="antrag" label="Antrag auswählen"/>
                    </Col>
                    <Col>
                        <Label for="alterNotenspiegel">Notenspiegel hochladen</Label>
                        <CustomInput type="file" id="alterNotenspiegel" name="notenspiegel" label="Notenspiegel auswählen" />
                    </Col>
                    <Col>
                        <Label for="modulhandbuch">Modulhandbuch hochladen</Label>
                        <CustomInput type="file" id="modulhandbuch" name="customFile" label="Modulhandbuch auswählen"/>
                    </Col>
                
                </Row>
            </FormGroup>
        </Form>
    }
}