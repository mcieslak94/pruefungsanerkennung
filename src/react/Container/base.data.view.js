import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import BaseDataList from '../Components/base.data.list'
import ProfBaseDataContent from '../Components/prof.base.data.content'
import CourseBaseDataContent from '../Components/course.base.data.content'
//import EmailTemplateContent from '../Components/template.content'
//import _ from 'lodash'
/* import moment from 'moment'
 */
const electron = window.require('electron')


export default class BaseDataView extends Component {
    constructor(props) {
        super(props)
        const DataBaseConnector = electron.remote.require('../src/shared/database.connector.js')
        const CourseConnector = electron.remote.require('../src/shared/course.db.js')
        const ModuleConnector = electron.remote.require('../src/shared/modules.db.js')
        const CaseConnector = electron.remote.require('../src/shared/casedb.js')
        this.courseDB = CourseConnector()
        this.moduleDB = ModuleConnector()
        this.caseDB = CaseConnector()
        this.professorDB = DataBaseConnector('professor')
        this.courseDBAllg = DataBaseConnector('course')
    }

    state = {
        baseData: ['Lehrende', 'Studiengänge'],
        courses: null, 
        templates: null, 
        profs: null,
        detail: null,
        addModalOpen: false,
        profCount: {},
        courseCount: {},
        profAlertModalOpen: false,
        courseAlertModalOpen: false
    }

    componentDidMount() {
        this.getProfs()
        this.getCourses()
        //this.getTemplates()
    }

    getProfs = () => {
        let data = {
            criteria: 'profName'
        }
        this.professorDB.data(data).getAllAsc(profs => this.setState({ profs }))
    }

    /*getTemplates = () => {
        let data = {
            criteria: 'templateBetreff'
        }
        this.templatesDB.data(data).getAllAsc(templates => this.setState({ templates }))
    }*/
    
    getCourses = () => {
        let data = {
            intern: '1'
        }
        this.courseDB.getCourses(data.intern, courses => this.setState({ courses }))
    }
    
    getPage() {
        switch (this.state.detail) {
          case 0: return <ProfBaseDataContent
            detail={this.state.detail}
            data={this.state.profs != null && this.state.detail != null ? this.state.profs : null}
            saveChanges={this.saveProf} addProf={this.addProf} checkProf={this.checkProf} 
            profAlertModalOpen={this.state.profAlertModalOpen}
            toggleAlert={() => this.setState({ profAlertModalOpen: !this.state.profAlertModalOpen })}/>
          case 1: return <CourseBaseDataContent
            detail={this.state.detail}
            data={this.state.courses != null && this.state.detail != null ? this.state.courses : null}
            saveChanges={this.saveCourse} addCourse={this.addCourse} deleteCourse={this.checkCourse}
            courseAlertModalOpen={this.state.courseAlertModalOpen}
            toggleAlert={() => this.setState({ courseAlertModalOpen: !this.state.courseAlertModalOpen })}/> 
          default: return <></>;
    }
}

    saveProf = (prof) => {
        let data = {
            value: prof,
            selector: { professorID: prof.professorID }
        }
        this.professorDB.data(data).update(() => this.getProfs())
    }

    saveCourse = (course) => {
        let data = {
            value: course,
            selector: { courseID: course.courseID }
        }
        this.courseDBAllg.data(data).update(() => this.getCourses())
    }

    addProf = prof => {
        this.professorDB.data(prof).create(() => {
                            this.getProfs()
                        })
    }

    addCourse = course => {
        course.intern = '1'
        this.courseDBAllg.data(course).create(() => {
                            this.getCourses()
                        })
    }

    checkProf = professorID => {
        this.moduleDB.getCountByProfID(professorID, profCount => this.setState({ profCount }))
        setTimeout(() => {
            this.deleteProf(professorID)
        }, 200)
    }

    checkCourse = courseID => {
        this.caseDB.getCountByCourseID(courseID, courseCount => this.setState({ courseCount }))
        setTimeout(() => {
            this.deleteCourse(courseID)
        }, 200)
    }

    deleteProf = professorID => {
        console.log('##', this.state.profCount.length===0)
        if(this.state.profCount.length===0){
            let data = {
                prop: 'professorID',
                value: professorID
            }
            this.professorDB.data(data).delete(() => {
                this.getProfs()
            })
        } else {
            this.setState({ profAlertModalOpen: !this.state.profAlertModalOpen })
        }
    }
    
    deleteCourse = courseID => {
        console.log('##', this.state.courseCount.length===0)
        if(this.state.courseCount.length===0){
            let data = {
                prop: 'courseID',
                value: courseID
            }
            this.courseDBAllg.data(data).delete(() => {
                                this.getCourses()
                            })
        } else {
            this.setState({ courseAlertModalOpen: !this.state.courseAlertModalOpen })
        }
    }

    render = () => {
        return <>    
            <Row className='app-header'>
                <Col><h3>Stammdatenverwaltung</h3></Col>
            </Row>
            <Row className='app-body'>
                <Col xs={3} className='app-list' style={{ minHeight: '89vh' }}>
                    <BaseDataList
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
