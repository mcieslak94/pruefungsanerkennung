import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import UniversityList from '../Components/university/university.list'
/* import moment from 'moment'
 */
const electron = window.require('electron')


export default class UniversityView extends Component {
    constructor(props) {
        super(props)
        const DataBaseConnector = electron.remote.require('./database.connector.js')
        this.universityDB = DataBaseConnector('university')
    }

    state = {
        universities: null,
        detail: null,
    }

    componentDidMount() {
        this.getUniversities()
    }

    getUniversities = () => {
        let data = {
            criteria: 'universityName'
        }
        this.universityDB.data(data).getAllAsc(universities => this.setState({ universities }))
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
                        data={this.state.universities}
                    />
                </Col>
                <Col xs={9} style={{ maxHeight: '75vh' }}> 
                </Col>
            </Row>           
        </>
    }
}
