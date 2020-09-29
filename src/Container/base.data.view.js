import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import BaseDateContent from '../Components/base.date.content'
import BaseDateList from '../Components/base.date.list'
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
        detail: null,
        addModalOpen: false
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
                        data={this.state.cases}
                    />
                </Col>
                <Col xs={9} className='app-content' style={{ maxHeight: '83vh' }}>
                    <BaseDateContent
                        detail={this.state.detail}
                        data={this.state.cases != null && this.state.detail != null ? this.state.cases[this.state.detail] : null}
                        saveChanges={this.saveCase}
                    />
                </Col>
            </Row>           
        </>
    }
}
