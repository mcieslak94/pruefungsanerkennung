import React, {Component} from 'react'
import { Row, Col, Table} from 'reactstrap'

const electron = window.require('electron')

export default class UniversityContent extends Component {

    constructor(props) {
        super(props);
        const UniversityDBConnector = electron.remote.require('./university.db.js')
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
                <Table size="sm" hover responsive>
                    <thead>
                        <tr>
                        <th xs={5}>Modulname Extern </th>
                        <th xs={5}>Modulname Fachhochschule Dortmund</th>
                        <th xs={2}>Anerkannt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.modules && this.state.modules.length > 0 && this.state.modules.map(m => 
                            <tr>
                                <td>{m.moduleNameExt}</td>
                                <td>{m.moduleName}</td>
                                <td>{m.anerkannt}</td>
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