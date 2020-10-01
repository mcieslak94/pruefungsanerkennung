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
        baseDate: ['Professoren', 'Studiengänge'],
        courses: null, 
        profs: null,
        detail: null,
        addModalOpen: false
    }

    componentDidMount() {
        this.getProfs()
        this.getCourses()
    }

    getCourses = () => {
        this.professorDB.getAll(profs => this.setState({ profs }))
    }

    getProfs = () => {
        this.courseDB.getAll(courses => this.setState({ courses }))
    }
    getPage() {
        switch (this.state.detail) {
          case 0: return <ProfBaseDateContent
          detail={this.state.detail}
          data={this.state.profs != null && this.state.detail != null ? this.state.profs : null}
          saveChanges={this.saveProf} addProf={this.addProf}
      />
          case 1: return <CourseBaseDateContent
          detail={this.state.detail}
          data={this.state.courses != null && this.state.detail != null ? this.state.courses : null}
          saveChanges={this.saveCourse} addCourse={this.addCourse}
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
                            console.log(' prof added')
                        })
    }

    addCourse = course => {
        this.courseDB.data(course).create(() => {
                            this.getCourses()
                            console.log(' course added')
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
                        data={this.state.baseDate}
                    />
                </Col>
                <Col xs={9} style={{ minHeight: '89vh' }}>
                    {this.getPage()}
                </Col>
            </Row>           
        </>
    }
}
