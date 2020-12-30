import React, {Component} from 'react'
import { Row, Col, Table} from 'reactstrap'

const electron = window.require('electron')

export default class UniversityContent extends Component {

    constructor(props) {
        super(props);
        const UniversityDBConnector = electron.remote.require('../src/shared/university.db.js')
        this.universitymodulesDB = UniversityDBConnector()
    }
    
    state = { 
        modules: null
    }

    componentDidUpdate(prevProps) {
        if((prevProps.data == null && this.props.data != null) || (this.props.data != null && (this.props.data.universityID !== prevProps.data.universityID))){
            this.getExternModules()
        }
    }

    getExternModules = () => {
        let data = {
            universityID: this.props.data.universityID
        }
        this.universitymodulesDB.getExternModules(data, modules => this.setState({ modules }))
    }

    render = () => {
    return this.props.data
    ?
    <>
    <div style={{ paddingBottom: "70px", paddingTop: "10px" }}>
        <h3 style={{ paddingBottom: "20px"}}>{(this.props.data.universityName ? this.props.data.universityName : '') }</h3>
        <div>
            <Row xs={2}>
                <Col xs={12}>
                <Table size="sm" hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Studiengang Extern</th>
                            <th xs={3}>Modulname Extern</th>
                            <th>Modulname Intern</th>
                            <th>Anerkannt?</th>
                            <th>Begründung</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.modules && this.state.modules.length > 0 && this.state.modules.map((m, idx) => 
                            <tr key={'university-tr-key-' + idx}>
                                <td>{idx+1}</td>
                                <td>{m.courseName}</td>
                                <td>{m.extModuleName}</td>
                                <td>{m.moduleName}</td>
                                <td>{m.anerkannt === 1 ? 'ja' : 'nein'}</td>
                                <td>{m.begruendung}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                </Col>
            </Row>
        </div>
    </div> 
    </>
    : <></>    
}
}