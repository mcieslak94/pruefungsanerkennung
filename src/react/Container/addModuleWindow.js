import React, { Component } from 'react'
import { Label, Input, Row, Col, CustomInput, Form } from 'reactstrap'
import ProfsInput from '../Components/inputField.profs'
import FormFeedback from 'reactstrap/lib/FormFeedback';

const electron = window.require('electron')

export default class AddModuleWindow extends Component {
    constructor(props) {
        super(props)
        const CourseDatabase = electron.remote.require('../src/shared/course.db.js')
        this.courseDB = CourseDatabase()
    }

    state = { 
        courses: null
    }

    componentDidMount() {
        this.getCourses()
    }

    getCourses = () => {
        let data = {
            intern: '1'
        }

        console.log('## toggle')
        this.courseDB.getCourses(data.intern, courses => this.setState({ courses }))
    }

    

    render = () => {
        return <>
             <Form>
                <Row xs={2} style={{ padding: 16 }}>
                    <Col>
                        <Label for="moduleName">Modulname *</Label>
                        <Input invalid={this.props.errors.nameError} value={this.props.data && this.props.data.name} 
                        onChange={e => this.props.onChange('moduleName', e.target.value)} 
                        type="text" name="moduleName" id="moduleName" 
                        placeholder="Modulname eintragen" required />
                    <FormFeedback invalid={this.props.errors.nameError}>Bitte einen Modulname eintragen</FormFeedback>
                    </Col>
                    <Col>
                        <Label for="creditPoints">Credit Points *</Label>
                        <Input invalid={this.props.errors.creditError} value={this.props.data && this.props.data.creditPoints} 
                        onChange={e => this.props.onChange('creditPoints', e.target.value)} 
                        type="text" name="creditPoints" id="creditPoints" 
                        placeholder="Credit Points eintragen" required />
                        <FormFeedback invalid={this.props.errors.creditError}>Bitte die Creditpoints eintragen</FormFeedback>
                    </Col>
                    <Col xs={12}>
                    <Label for="courseID">Studiengang *</Label>
                    {this.state.courses && this.state.courses.length > 0 && this.state.courses.map((c, idx) => 
                                <Row key={'choose-courses-' + idx}>
                                    <Col>
                                    <CustomInput invalid={this.props.errors.courseError}
                                        type="checkbox"
                                        id={"c.courseID" + idx}
                                        checked={this.state.courseIDs && this.state.courseIDs.length > 0 && (this.state.courseIDs.find(m => m.courseID === c.courseID))} 
                                        label={c.courseName} 
                                        onChange={() => this.props.toggleCourse(c.courseID)}/>
                                    </Col>
                                </Row> 
                            )}
                    </Col>
                    <Col xs={12}>
                    <hr />
                    </Col>
                    <Col>
                        <Label for="professorID">Lehrender *</Label>
                        <ProfsInput id="professorID" profError={this.props.errors.profError} value={this.props.data.professorID} onChange={ value => this.props.onChange('professorID', value)} required/>
                    </Col>
                    
                </Row>
            </Form>
            </>
    }
}