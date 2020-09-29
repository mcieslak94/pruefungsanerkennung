import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Row, Col, CustomInput } from 'reactstrap'
import ProfsInput from '../Components/inputField.profs'

const electron = window.require('electron')

export default class AddModuleWindow extends Component {
    constructor(props) {
        super(props)
        const DataBaseConnector = electron.remote.require('./database.connector.js')  
        this.courseDB = DataBaseConnector('course')
    }

    state = { 
        courses: null
    }

    componentDidMount() {
        this.getCourses()
    }

    getCourses = () => {
        this.courseDB.getAll(courses => this.setState({ courses }))
    }

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
                    <Col xs={12}>
                    <Label for="courseID">Studiengang</Label>
                    {this.state.courses && this.state.courses.length > 0 && this.state.courses.map(c => 
                                <Row key={'courses-option-' + c.courseID}>
                                    <Col>
                                    <CustomInput disabled={this.state.disabled}
                                        type="checkbox"
                                        id={"c.courseID" + c.courseID}
                                        checked={this.props.selected && this.props.selected.length > 0 && (this.props.selected.findIndex(m => m === c.moduleID) !== -1)} 
                                        label={c.courseName} 
                                        onChange={(value) => this.props.onChange(c.courseID, value)}/>
                                    </Col>
                                </Row> 
                            )}
                    </Col>
                    <Col xs={12}>
                    <hr />
                    </Col>
                    <Col>
                        <Label for="professorID">Lehrender</Label>
                        <ProfsInput id="professorID" value={this.props.data.professorID} onChange={ value => this.props.onChange('professorID', value)} />
                    </Col>
                    
                </Row>
            </FormGroup>
        </Form>
    }
}