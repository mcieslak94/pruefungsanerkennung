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
        cases: null,
        addModalOpen: false,
        searchString: null
    }

    componentDidMount() {
        this.getCases()
    }

    getCases = (searchString = null) => {
        this.caseDB.getInactiveCasesAsc(cases => this.setState({ cases }))
    }


    resetCase = () => {
        this.getCases()
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
                        onSearch={searchString => this.setState({ searchString })}
                        data={this.filterCases()}
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
