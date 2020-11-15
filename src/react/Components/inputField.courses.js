import React, {Component} from 'react'
import { Input } from 'reactstrap'

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
           <Input disabled={this.props.disabled}  type={'select'} value={this.props.value} placeholder='Studiengang wählen...' onChange={value => this.props.handleChange('courseID', value)}>
               {this.state.courses && this.state.courses.length > 0 && this.state.courses.map(c => <option key={'courses-option-' + c.courseID} value={c.courseID}>{c.courseName}</option>)}
           </Input>  
        )}
}
export default CoursesInput
