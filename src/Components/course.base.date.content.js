import React, {Component} from 'react'
import { Button, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';

export default class CourseBaseDateContent extends Component {

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
    <div>
    <Row>
        <Col xs={3}><Button color="success" onClick={this.props.onAdd}>+</Button></Col>
        <Col xs={9}>
            <ListGroup>
                {this.props.data && this.props.data.length > 0 && this.props.data.map((o, idx) => 
                <ListGroupItem  key={'courses-base-date-list-item' + idx}
                    active={this.props.active === idx}
                    onClick={() => this.props.onChange(idx)}
                    tag="button" action>
                    <span><b>{(o.courseName ? o.courseName : '')}</b></span>
                </ListGroupItem>)}
            </ListGroup>
        </Col>
    </Row>   
    </div> 
    </>
    : <></>    
}
}