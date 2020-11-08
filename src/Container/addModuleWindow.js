import React, { Component } from 'react'
import { Label, Input, Row, Col, CustomInput } from 'reactstrap'
import { AvField } from 'availity-reactstrap-validation';
import ProfsInput from '../Components/inputField.profs'
import AvForm from 'availity-reactstrap-validation/lib/AvForm';

const electron = window.require('electron')

export default class AddModuleWindow extends Component {
    constructor(props) {
        super(props)
        const CourseDatabase = electron.remote.require('./course.db.js')
        this.courseDB = CourseDatabase()
    }

    state = { 
        courses: null,
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
             <AvForm onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
                <Row xs={2} style={{ padding: 16 }}>
                    <Col>
                        <Label for="moduleName">Modulname</Label>
                        <Input value={this.props.data && this.props.data.name} 
                        onChange={e => this.props.onChange('moduleName', e.target.value)} 
                        type="text" name="moduleName" id="moduleName" 
                        placeholder="Modulname eintragen" required />
                    </Col>
                    <Col>
                        <Label for="creditPoints">Credit Points</Label>
                        <AvField value={this.props.data && this.props.data.creditPoints} 
                        onChange={e => this.props.onChange('creditPoints', e.target.value)} 
                        type="text" name="creditPoints" id="creditPoints" 
                        placeholder="Credit Points eintragen" required />
                    </Col>
                    <Col xs={12}>
                    <Label for="courseID">Studiengang</Label>
                    {this.state.courses && this.state.courses.length > 0 && this.state.courses.map((c, idx) => 
                                <Row key={'choose-courses-' + idx}>
                                    <Col>
                                    <CustomInput 
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
                        <Label for="professorID">Lehrender</Label>
                        <ProfsInput id="professorID" value={this.props.data.professorID} onChange={ value => this.props.onChange('professorID', value)} required/>
                    </Col>
                    
                </Row>
            </AvForm>
            </>
    }
}