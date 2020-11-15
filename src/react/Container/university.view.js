import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import UniversityContent from '../Components/university/university.content'
import UniversityList from '../Components/university/university.list'
/* import moment from 'moment'
 */
const electron = window.require('electron')


export default class UniversityView extends Component {
    constructor(props) {
        super(props)
        const DataBaseConnector = electron.remote.require('../src/shared/database.connector.js')
        this.universityDB = DataBaseConnector('university')
    }

    state = {
        universities: null,
        detail: null,
        searchString: null
    }

    componentDidMount() {
        this.getUniversities()
    }

    getUniversities = (searchString = null) => {
        let data = {
            criteria: 'universityName'
        }
        this.universityDB.data(data).getAllAsc(universities => this.setState({ universities }))
    }

    filterUniversities = () => {
        if (!this.state.searchString || this.state.searchString.length < 1) return  this.state.universities
        let splitted = this.state.searchString.toLowerCase().split(' ') 
        return this.state.universities.filter(c => {
            let match = false
            splitted.forEach(s => {
                match = c.universityName.toLowerCase().includes(s)
            });
            return match
        })
    }

    render = () => {
        return <>    
            <Row className='app-header'>
                <Col><h3>Hochschulen</h3></Col>
            </Row>
            <Row className='app-body'>
                <Col xs={3} className='app-list' style={{ minHeight: '89vh' }}>
                    <UniversityList
                        onChange={value => this.setState({ detail: value })}
                        active={this.state.detail}
                        onSearch={searchString => this.setState({ searchString })}
                        data={this.filterUniversities()}
                    />
                </Col>
                <Col xs={9} style={{ maxHeight: '75vh' }}> 
                    <UniversityContent 
                    detail={this.state.detail} 
                    data={this.state.universities != null && this.state.detail != null ? this.state.universities[this.state.detail] : null}
                    />
                </Col>
            </Row>           
        </>
    }
}
