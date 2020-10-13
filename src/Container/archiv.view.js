import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import ArchivList from '../Components/archiv/archiv.list'
import ArchivContent from '../Components/archiv/archiv.content'
/* import moment from 'moment'
 */
const electron = window.require('electron')

export default class ArchivView extends Component {
    constructor(props) {
        super(props)
        const DataBaseConnector = electron.remote.require('./database.connector.js')
        const DatabaseCase = electron.remote.require('./casedb.js')
        this.course = DataBaseConnector('course')
        this.casesDB = DataBaseConnector('cases')
        this.caseDB = DatabaseCase()
    }


    state = {
        detail: null,
        courses: null, 
        cases: null,
        tests: null,
        addModalOpen: false
    }

    componentDidMount() {
        this.getCases()
        this.getCourses()
    }

    getCourses = () => {
        let data = {
            criteria: 'courseName'
        }
        this.course.data(data).getAllAsc(courses => this.setState({ courses }))
    }

    getCases = () => {
        let data = {
            criteria: 'caseLastName'
        }
        this.casesDB.data(data).getAllAsc(cases => this.setState({ cases }))
    }

    addCase = student => {
        this.casesDB.data(student).create(() => {
                            this.getCases()
                        })
    }

    resetCase = () => {
        this.getCases()
    }

    saveCase = (student) => {
        let data = {
            value: student,
            selector: { caseID: this.state.cases[this.state.detail].caseID }
        }
        this.casesDB.data(data).update(() => this.getCases())
    }
          
    render = () => {
        return <>    
            <Row className='app-header'>
                <Col><h3>Archiv der abgeschlossenen Fälle</h3></Col>
{/*                 

{moment(this.state.data.createDate).isBefore(moment().subtract(2, 'weeks'))}
 */} 
            </Row>
            <Row className='app-body'>
                <Col xs={3} className='app-list' style={{ minHeight: '89vh' }}>
                    <ArchivList
                        onAdd={() => this.setState({ addModalOpen: true })}
                        onChange={value => this.setState({ detail: value })}
                        active={this.state.detail}
                        data={this.state.cases}
                    />
                </Col>
                <Col xs={9} className='app-content' style={{ maxHeight: '89vh' }}>
                    <ArchivContent
                        detail={this.state.detail}
                        data={this.state.cases != null && this.state.detail != null ? this.state.cases[this.state.detail] : null}
                        saveChanges={this.saveCase} resetChanges={this.resetCase}
                    />
                </Col>
            </Row>
        </>
    }
}