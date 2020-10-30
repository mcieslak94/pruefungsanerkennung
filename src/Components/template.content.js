import React, {Component} from 'react'
import { Col, Row } from 'reactstrap';
import EditFooter from './globals/edit.footer';
import TemplateList from './template.list';
import TemplatePanel from './edit.templates.panel';

export default class EmailTemplateContent extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            templateDetail: null,
            disabled: true,
            courseModalOpen: false,
            deleteModalOpen: false
        }
    }
        
    handleSubmit = () => {
        this.props.onSubmit(this.state.form)
        this.props.toggle()
        this.setState({ form: {} })
    }

    saveChanges = () => {
        this.props.saveChanges(this.props.data[this.state.templateDetail])
        this.setChangeMode() 
    }

    setChangeMode = () => {
        this.setState( {disabled: !this.state.disabled} )
    }

    render = () => {
    return this.props.data
    ?
    <>
    <div style={{paddingTop: '20px', minheight:'89vh'}}>
    <Row>
        <Col xs={4} className="base-data-content" style={{ maxHeight: '83vh' , paddingBottom:"30px"}}>
            <TemplateList
            onChange={value => this.setState({ templateDetail: value })}
            active={this.state.templateDetail}
            data={this.props.data}/>
        </Col>
        <div style={{borderLeft: '1px solid lightgrey', maxHeight: '85vh'}}></div>
        <Col xs={6}>
            <TemplatePanel 
            disabled={this.state.disabled}
            profdetail={this.state.templateDetail}
            data={this.props.data != null && this.state.templateDetail != null ? this.props.data[this.state.templateDetail] : null}
            saveChanges={this.saveCourse}
            />
        </Col>
    </Row>   
            <EditFooter editActive={!this.state.disabled} onSave={this.saveChanges} toggle={this.setChangeMode} />
    </div> 
    </>
    : <></>    
}
}