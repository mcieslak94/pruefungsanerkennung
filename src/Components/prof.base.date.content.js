import React, {Component} from 'react'
import { Button, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import EditFooter from './globals/edit.footer';

export default class ProfBaseDateContent extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            disabled: true,
        }
    }
        
    handleChange = (prop, e) => {
        let tempForm = this.props.data
        tempForm[prop] = e.target.value
        this.setState({ tempForm })
    }

    handleSubmit = () => {
        this.props.onSubmit(this.state.form)
        this.props.toggle()
        this.setState({ form: {} })
    }

    saveChanges = () => {
        this.props.saveChanges(this.props.data)
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
        <Col xs={1} style={{backgroundColor:'yellow'}}><Button color="success" onClick={this.props.onAdd}>+</Button></Col>
        <Col xs={4} style={{backgroundColor:'black'}}>
            <ListGroup>
                {this.props.data && this.props.data.length > 0 && this.props.data.map((o, idx) => 
                <ListGroupItem  key={'prof-base-date-list-item' + idx}
                    active={this.props.active === idx}
                    onClick={() => this.props.onChange(idx)}
                    tag="button" action>
                    <span><b>{(o.titel ? o.titel : '') + ' ' + (o.profName ? o.profName : '')}</b></span>
                </ListGroupItem>)}
            </ListGroup>
        </Col>
        <div style={{borderLeft: '1px solid grey', minHeight: '85vh'}}></div>
        <Col xs={6} style={{backgroundColor:'red'}}>
            <EditFooter />
        </Col>
    </Row>   
    </div> 
    </>
    : <></>    
}
}