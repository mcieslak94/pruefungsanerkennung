import React, { Component } from 'react'
import { Row, Col, FormGroup, Label, Input} from 'reactstrap'
import '../App.css';


export default class EditCourseBaseDataPanel extends Component {

    state = { 
        antragChecked: false,
        gradesChecked: false,
        modulChecked: false,
        progressValue: 0
    } 
     
    handleChange = (prop, e) => {
        let tempForm = this.props.data
        tempForm[prop] = e.target.value
        this.setState({ tempForm })
    }

    render = () => {
    return ( 
    this.props.data
    ?
        <div>
            <Row>
                <Col>
                <FormGroup>
                    <Row xs={2}>
                        <Col xs={12}>
                            <Label for="courseName">Name des Studiengangs</Label>
                            <Input disabled={this.props.disabled} type='text' value={this.props.data.courseName ? this.props.data.courseName : ''} 
                            onChange= {value => this.handleChange('courseName', value)} />
                        </Col>         
                    </Row>
                </FormGroup>
                </Col>
            </Row>
        </div>
          : <></> 
    );
    }
}


