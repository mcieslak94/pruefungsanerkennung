import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import BaseDateList from '../Components/base.date.list'
import ProfBaseDateContent from '../Components/prof.base.date.content'
import CourseBaseDateContent from '../Components/course.base.date.content'
/* import moment from 'moment'
 */
const electron = window.require('electron')


export default class BaseDataView extends Component {
    constructor(props) {
        super(props)
        const DataBaseConnector = electron.remote.require('./database.connector.js')
        this.professorDB = DataBaseConnector('professor')
        this.courseDB = DataBaseConnector('course')
    }

    state = {
        baseData: ['Professoren', 'Studiengänge'],
        courses: null, 
        profs: null,
        detail: null,
        addModalOpen: false
    }

    componentDidMount() {
        this.getProfs()
        this.getCourses()
    }

    getProfs = () => {
        let data = {
            criteria: 'profName'
        }
        this.professorDB.data(data).getAllAsc(profs => this.setState({ profs }))
    }

    getCourses = () => {
        let data = {
            criteria: 'courseName'
        }
        this.courseDB.data(data).getAllAsc(courses => this.setState({ courses }))
    }
    getPage() {
        switch (this.state.detail) {
          case 0: return <ProfBaseDateContent
          detail={this.state.detail}
          data={this.state.profs != null && this.state.detail != null ? this.state.profs : null}
          saveChanges={this.saveProf} addProf={this.addProf} deleteProf={this.deleteProf}
      />
          case 1: return <CourseBaseDateContent
          detail={this.state.detail}
          data={this.state.courses != null && this.state.detail != null ? this.state.courses : null}
          saveChanges={this.saveCourse} addCourse={this.addCourse} deleteCourse={this.deleteCourse}
      /> 
          default: return <></>;
    }
}

    saveProf = (prof) => {
        console.log(prof)
        let data = {
            value: prof,
            selector: { professorID: prof.professorID }
        }
        this.professorDB.data(data).update(() => this.getProfs())
    }

    saveCourse = (course) => {
        console.log(course)
        let data = {
            value: course,
            selector: { courseID: course.courseID }
        }
        this.courseDB.data(data).update(() => this.getCourses())
    }

    addProf = prof => {
        this.professorDB.data(prof).create(() => {
                            this.getProfs()
                        })
    }

    addCourse = course => {
        this.courseDB.data(course).create(() => {
                            this.getCourses()
                        })
    }

    deleteProf = professorID => {
        let data = {
            prop: 'professorID',
            value: professorID
        }
        console.log('##', data.prop, data.value)
        this.professorDB.data(data).delete(() => {
                            this.getProfs()
                        })
    }

    deleteCourse = courseID => {
        let data = {
            prop: 'courseID',
            value: courseID
        }
        this.courseDB.data(data).delete(() => {
                            this.getCourses()
                        })
    }

    render = () => {
        return <>    
            <Row className='app-header'>
                <Col><h3>Stammdatenverwaltung</h3></Col>
            </Row>
            <Row className='app-body'>
                <Col xs={3} className='app-list' style={{ minHeight: '89vh' }}>
                    <BaseDateList
                        onAdd={() => this.setState({ addModalOpen: true })}
                        onChange={value => this.setState({ detail: value })}
                        active={this.state.detail}
                        data={this.state.baseData}
                    />
                </Col>
                <Col xs={9} style={{ maxHeight: '75vh' }}> 
                    {this.getPage()}
                </Col>
            </Row>           
        </>
    }
}
