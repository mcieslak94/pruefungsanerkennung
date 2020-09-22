import React, {Component} from 'react'
import { Input } from 'reactstrap'

const electron = window.require('electron')

class CoursesInput extends Component {

    constructor(props) {
        super(props)
        const DataBaseConnector = electron.remote.require('./database.connector.js')
        this.course = DataBaseConnector('course')
    }

    state= {
        courses: null
    }

    componentDidMount() {
        this.getCourses()
    }

    getCourses = () => {
        this.course.getAll(courses => this.setState({ courses }))
    }

    render () {
        return (
           <Input type={'select'} value={this.props.value} placeholder='Studiengang wählen...' onChange={e => this.props.onChange(e.target.value)}>
               {this.state.courses && this.state.courses.length > 0 && this.state.courses.map(c => <option key={'courses-option-' + c.courseID} value={c.courseID}>{c.courseName}</option>)}
           </Input>  
        )}
}
export default CoursesInput
