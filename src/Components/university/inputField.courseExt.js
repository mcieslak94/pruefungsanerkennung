import React, {Component} from 'react'
import { Input } from 'reactstrap'

const electron = window.require('electron')

class CourseExtInput extends Component {

    constructor(props) {
        super(props)
        const UniConnector = electron.remote.require('./university.db.js')
        this.uniExtDB = UniConnector()
    }

    state= {
        courseExt: null
    }

    componentDidMount() {
        this.getExtCourses()
    }

    getExtCourses = () => {
        this.uniExtDB.getExtCourses(courseExt => {
            this.setState({ courseExt })
          }) 
    }
    
    render () {
        return (
           <Input   disabled={this.props.disabled} type={'select'} value={this.props.value} placeholder='ehem. Studiengang wählen...'
                    onChange={e => this.props.onChange(e.target.value)}>
                    {this.state.courseExt && this.state.courseExt.length > 0 && this.state.courseExt.map((c, idx) => <option key={'course-option-' + idx} 
                    value={c.universityID}>{c.courseNameExt}</option>)}
           </Input>  
        )}
}
export default CourseExtInput
