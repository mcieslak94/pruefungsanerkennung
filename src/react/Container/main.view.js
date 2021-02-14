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
        const DataBaseConnector = electron.remote.require('../src/shared/database.connector.js')
        const DatabaseCase = electron.remote.require('../src/shared/casedb.js')
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
        searchString: null, 
        isOnChange: false,
        alertModalOpen: false 
    }

    componentDidMount() {
        this.getCases()
        this.getCourses()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.detail !== this.props.detail && this.props.detail !== this.state.detail) {
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
        this.setState({alertModalOpen : false})
    }

    saveCase = (student) => {
        student.state = 'in Bearbeitung'
        let data = {
            value: student,
            selector: { caseID: this.state.cases[this.state.detail].caseID }
        }
        this.casesDB.data(data).update(() => this.getCases())
        this.setState({alertModalOpen : false})
    }

    closeCase = (abgeschlossen, student) => {
        if(abgeschlossen===1){
            student = { 
                state:'abgeschlossen'
            }
        } else {
            student = { 
                state:'abgebrochen'
            }
        }
        let data = {
            value: student,
            selector: { caseID: this.state.cases[this.state.detail].caseID }
        }
        this.casesDB.data(data).update(() => this.getCases())
        this.setState({detail : null})
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
    
    isOnChange = (value) => {
        if(!this.state.isOnChange){
            this.setState({ detail: value })
        } else {
            this.setState({alertModalOpen : true})
        }
    }
     
    render = () => {
        return <>    
            <Row className='app-header'>
                <Col><h3>Fallübersicht</h3></Col>
            </Row>
            <Row className='app-body'>
                <Col xs={3} className='app-list' style={{ minHeight: '89vh' }}>
                    <DetailList
                        onAdd={() => this.setState({ addModalOpen: true })}
                        onChange={this.isOnChange}
                        active={this.state.detail}
                        onSearch={searchString => this.setState({ searchString })}
                        data={this.filterCases()}
                    />
                </Col>
                <Col xs={9} className='app-content' style={{ maxHeight: '83vh' }}>
                    <DetailContent
                        alertModalOpen={this.state.alertModalOpen}
                        toggle={() => this.setState({ alertModalOpen: !this.state.alertModalOpen })}
                        detail={this.state.detail}
                        data={this.state.cases != null && this.state.detail != null ? this.state.cases[this.state.detail] : null}
                        saveChanges={this.saveCase} resetChanges={this.resetCase} 
                        closeCase={this.closeCase}
                        toggleIsOnChange={() => this.setState({ isOnChange: !this.state.isOnChange })}
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
