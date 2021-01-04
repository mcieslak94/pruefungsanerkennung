import React, {Component} from 'react'
import { Input } from 'reactstrap'
import FormFeedback from 'reactstrap/lib/FormFeedback'

const electron = window.require('electron')

class CoursesInput extends Component {

    constructor(props) {
        super(props)
        const CourseConnector = electron.remote.require('../src/shared/course.db.js')
        this.courseDB = CourseConnector()
    }

    state= {
        courses: null
    }

    componentDidMount() {
        this.getCourses()
    }

    getCourses = () => {
        let data = {
            intern: '1'
        }
        this.courseDB.getCourses(data.intern, courses => this.setState({ courses }))
    }
    
    render () {
        return (
            <div>
               <Input invalid={this.props.courseError} disabled={this.props.disabled}  type={'select'} value={this.props.value} placeholder='Studiengang wählen...' onChange={value => this.props.handleChange('courseID', value)}>
                    <option key={'course-option-' + -1} value={-1}>{'Studiengang auswählen...'}</option>
                    {this.state.courses && this.state.courses.length > 0 && this.state.courses.map(c => <option key={'courses-option-' + c.courseID} value={c.courseID}>{c.courseName}</option>)}
                </Input>  
                <FormFeedback invalid={this.props.courseError}>Bitte einen Studiengang auswählen</FormFeedback>
            </div>
        )}
}
export default CoursesInput
