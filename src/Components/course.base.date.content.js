import React, {Component} from 'react'
import { Button, Col, Row } from 'reactstrap';
import EditFooter from './globals/edit.footer';
import CourseBaseDateList from './course.date.list';
import EditCourseBaseDatePanel from './edit.course.panel';
import AddCourseModal from './addBaseDate/add.course.modal';

export default class CourseBaseDateContent extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            coursedetail: null,
            disabled: true,
            courseModalOpen: false
        }
    }
        
    handleSubmit = () => {
        this.props.onSubmit(this.state.form)
        this.props.toggle()
        this.setState({ form: {} })
    }

    saveChanges = () => {
        this.props.saveChanges(this.props.data[this.state.coursedetail])
        this.setChangeMode() 
    }

    setChangeMode = () => {
        this.setState( {disabled: !this.state.disabled} )
    }

    addCourse = (course) => {
        this.props.addCourse(course)
    }

    render = () => {
    return this.props.data
    ?
    <>
    <div style={{paddingTop: '20px', minheight:'89vh'}}>
    <Row>
    <Col xs={1}><Button color="success" onClick={() => this.setState({ courseModalOpen: true })}>+</Button></Col>
        <Col xs={4}>
            <CourseBaseDateList
            onAdd={() => this.setState({ addModalOpen: true })}
            onChange={value => this.setState({ coursedetail: value })}
            active={this.state.coursedetail}
            data={this.props.data}/>
        </Col>
        <div style={{borderLeft: '1px solid lightgrey', minHeight: '85vh'}}></div>
        <Col xs={6}>
            <EditCourseBaseDatePanel 
            disabled={this.state.disabled}
            profdetail={this.state.coursedetail}
            data={this.props.data != null && this.state.coursedetail != null ? this.props.data[this.state.coursedetail] : null}
            saveChanges={this.saveCourse}
            />
        </Col>
    </Row>   
            <EditFooter editActive={!this.state.disabled} onSave={this.saveChanges} toggle={this.setChangeMode} />
            <AddCourseModal className="app-modal-addCourse"
                open={this.state.courseModalOpen}
                toggle={() => this.setState({ courseModalOpen: !this.state.courseModalOpen })}
                onSubmit={this.addCourse}
            />
    </div> 
    </>
    : <></>    
}
}