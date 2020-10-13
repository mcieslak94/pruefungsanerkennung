import React, {Component} from 'react'
import { Button, Col, Row } from 'reactstrap';
import EditFooter from './globals/edit.footer';
import CourseBaseDateList from './course.date.list';
import EditCourseBaseDatePanel from './edit.course.panel';
import AddCourseModal from './addBaseDate/add.course.modal';
import DeleteModal from './addBaseDate/delete.modal';

export default class CourseBaseDateContent extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            coursedetail: null,
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
        this.props.saveChanges(this.props.data[this.state.coursedetail])
        this.setChangeMode() 
    }

    setChangeMode = () => {
        this.setState( {disabled: !this.state.disabled} )
    }

    addCourse = (course) => {
        this.props.addCourse(course)
    }

    deleteCourse = () => {
        this.props.deleteCourse(this.props.data[this.state.coursedetail].courseID)
        this.setState({ deleteModalOpen: !this.state.deleteModalOpen })
    }

    render = () => {
    return this.props.data
    ?
    <>
    <div style={{paddingTop: '20px', minheight:'89vh'}}>
    <Row>
        <Col xs={1}>
            <Button style={{paddingRight: '11px', paddingLeft: '11px', marginBottom: '2px'}} size='lg' color="success" 
            onClick={() => this.setState({ courseModalOpen: true })}>+</Button>
            <Button disabled={this.state.coursedetail ? false : true } size='lg' color="danger" 
            onClick={() => this.setState({ deleteModalOpen: true })}>-</Button>
        </Col>
        <Col xs={4} className="base-data-content" style={{ maxHeight: '83vh' , paddingBottom:"30px"}}>
            <CourseBaseDateList
            onAdd={() => this.setState({ addModalOpen: true })}
            onChange={value => this.setState({ coursedetail: value })}
            active={this.state.coursedetail}
            data={this.props.data}/>
        </Col>
        <div style={{borderLeft: '1px solid lightgrey', maxHeight: '85vh'}}></div>
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
            <DeleteModal className="deleteCourse"
                open={this.state.deleteModalOpen}
                toggle={() => this.setState({ deleteModalOpen: !this.state.deleteModalOpen })}
                data={this.props.data != null && this.state.coursedetail != null ? this.props.data[this.state.coursedetail] : null}
                onSubmit={this.deleteCourse}
            />
    </div> 
    </>
    : <></>    
}
}