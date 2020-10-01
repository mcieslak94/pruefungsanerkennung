import React, {Component} from 'react'
import { Button, Col, Row } from 'reactstrap';
import EditProfBaseDatePanel from './edit.prof.panel';
import EditFooter from './globals/edit.footer';
import ProfBaseDateList from './prof.date.list';
import AddProfModal from './addBaseDate/add.prof.modal';

export default class ProfBaseDateContent extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            disabled: true,
            profdetail: null,
            profModalOpen: false
        }
    }
        
    handleSubmit = () => {
        this.props.onSubmit(this.state.form)
        this.props.toggle()
        this.setState({ form: {} })
    }

    saveChanges = () => {
        this.props.saveChanges(this.props.data[this.state.profdetail])
        this.setChangeMode() 
    }

    setChangeMode = () => {
        this.setState( {disabled: !this.state.disabled} )
    }

    addProf = (prof) => {
        this.props.addProf(prof)
    }
/**/
    render = () => {
    return this.props.data
    ?
    <>
    <div style={{paddingTop: '20px', minheight:'89vh'}}>
    <Row>
        <Col xs={1}><Button color="success" onClick={() => this.setState({ profModalOpen: true })}>+</Button></Col>
        <Col xs={4}>
            <ProfBaseDateList 
            onAdd={() => this.setState({ addModalOpen: true })}
            onChange={value => this.setState({ profdetail: value })}
            active={this.state.profdetail}
            data={this.props.data}
            />
        </Col>
        <div style={{borderLeft: '1px solid lightgrey', minHeight: '85vh'}}></div>
        <Col xs={6}>
            <EditProfBaseDatePanel 
            disabled={this.state.disabled}
            profdetail={this.state.profdetail}
            data={this.props.data != null && this.state.profdetail != null ? this.props.data[this.state.profdetail] : null}
            saveChanges={this.saveProf}
            />
        </Col>
    </Row>   
            <EditFooter editActive={!this.state.disabled} onSave={this.saveChanges} toggle={this.setChangeMode} />
            <AddProfModal className="app-modal-addProf"
                open={this.state.profModalOpen}
                toggle={() => this.setState({ profModalOpen: !this.state.profModalOpen })}
                onSubmit={this.addProf}
            />
    </div> 
    </>
    : <></>    
}
}