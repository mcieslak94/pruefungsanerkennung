import React, { Component } from 'react'
import DetailList from '../Components/detail.list'
import DetailContent from '../Components/detail.content'
import AddStudentModal from '../Components/add.student.modal'
import { Row, Col } from 'reactstrap'
/* import moment from 'moment'
 */
const electron = window.require('electron')

export default class MainView extends Component {
    constructor(props) {
        super(props)
        const DataBaseConnector = electron.remote.require('./database.connector.js')
        const DatabaseCase = electron.remote.require('./casedb.js')
        this.casesDB = DataBaseConnector('cases')
        this.course = DataBaseConnector('course')
        this.caseDB = DatabaseCase()
        this.universityDB = DataBaseConnector('university')
    }


    state = {
        detail: null,
        courses: null, 
        cases: null,
        tests: null,
        addModalOpen: false,
        searchString: null
    }

    componentDidMount() {
        this.getCases()
        this.getCourses()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.detail !== this.props.detail) {
            this.setState({ detail: this.state.cases.findIndex(c => c.caseID === this.props.detail) })
        }
    }

    getCourses = () => {
        let data = {
            criteria: 'courseName'
        }
        this.course.data(data).getAllAsc(courses => this.setState({ courses }))
    }

    getCases = (searchString = null) => {
        this.caseDB.getActiveCasesAsc(cases => this.setState({ cases }))
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
        let tempStudent = student
        let prop = 'state'
        tempStudent[prop] = 'in Bearbeitung'
        let data = {
            value: student,
            selector: { caseID: this.state.cases[this.state.detail].caseID }
        }
        this.casesDB.data(data).update(() => this.getCases())
    }

    closeCase = (student) => {
        student = { 
            state:'abgeschlossen'
    }
        let data = {
            value: student,
            selector: { caseID: this.state.cases[this.state.detail].caseID }
        }
        this.casesDB.data(data).update(() => this.getCases())
    }

    filterCases = () => {
        if (!this.state.searchString || this.state.searchString.length < 1) return  this.state.cases
        let splitted = this.state.searchString.toLowerCase().split(' ') 
        return this.state.cases.filter(c => {
            let match = false
            splitted.forEach(s => {
                match = c.caseFirstName.toLowerCase().includes(s) || c.caseLastName.toLowerCase().includes(s) || c.mNumber.toString().includes(s)
            });
            return match
        })
    }
     
    render = () => {
        return <>    
            <Row className='app-header'>
                <Col><h3>Fallübersicht</h3></Col>
{/*                 

{moment(this.state.data.createDate).isBefore(moment().subtract(2, 'weeks'))}
 */} 
            </Row>
            <Row className='app-body'>
                <Col xs={2} className='app-list' style={{ minHeight: '89vh' }}>
                    <DetailList
                        onAdd={() => this.setState({ addModalOpen: true })}
                        onChange={value => this.setState({ detail: value })}
                        active={this.state.detail}
                        onSearch={searchString => this.setState({ searchString })}
                        data={this.filterCases()}
                    />
                </Col>
                <Col xs={10} className='app-content' style={{ maxHeight: '83vh' }}>
                    <DetailContent
                        detail={this.state.detail}
                        data={this.state.cases != null && this.state.detail != null ? this.state.cases[this.state.detail] : null}
                        saveChanges={this.saveCase} resetChanges={this.resetCase} 
                        closeCase={this.closeCase}
                    />
                </Col>
            </Row>
            <AddStudentModal className="app-modal-add"
                open={this.state.addModalOpen}
                toggle={() => this.setState({ addModalOpen: !this.state.addModalOpen })}
                onSubmit={this.addCase}
            />
            
        </>
    }
}
