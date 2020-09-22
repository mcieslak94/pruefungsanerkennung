import React, { Component } from 'react'
import { Row, Col, Table, Button} from 'reactstrap'
import AddCaseModuleModal from './add.casemodule.modal';


export default class CaseModulePanel extends Component {

    state = { 
        internChecked: false,
        germanyChecked: false,
        moreChecked: false,
        progressValue: 0,
        modules: null,
        moduleModalOpen: false
    } 

    addModulesToTable = modules => {

    }
    
    
    render = () => {
    return ( 
        <div>
            
            <Row xs={2}>
                <Col xs={9}>
                <Table size="sm" hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Modulname</th>
                        <th>Name des Fachkollegen</th>
                        <th>Rückmeldung erhalten</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {this.state.modules && this.state.modules.length > 0 && this.state.modules.map(m => {
                            <tr>
                                <th scope="row">1</th>
                                <td>{m.name}</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                        })} */}
                        <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
                </Col>
                
                <Col xs={3}>
                    <Button color="primary" onClick={() => this.setState({ moduleModalOpen: !this.state.moduleModalOpen })}>Module auswählen</Button>
                </Col> 
            </Row>

            <AddCaseModuleModal className="app-case-module"
                open={this.state.moduleModalOpen}
                size={300}
                toggle={() => this.setState({ moduleModalOpen: !this.state.moduleModalOpen })}
                onSubmit={() => this.addModulesToTable}
            />
        </div>
    );
    }
}


