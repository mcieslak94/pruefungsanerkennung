import React, {Component} from 'react'
import { Button, Col, Row } from 'reactstrap';
import EditModuleFooter from './globals/module.edit.footer';
import CourseBaseDataList from './course.data.list';
import EditCourseBaseDataPanel from './edit.course.panel';
import AddCourseModal from './addBaseData/add.course.modal';
import DeleteModal from './addBaseData/delete.modal';
import DeleteAlert from './delete.alert.modal';

export default class CourseBaseDataContent extends Component {

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
            <Button style={{paddingRight: '10px', paddingLeft: '11px', marginBottom: '2px'}} size='lg' color="success" 
            onClick={() => this.setState({ courseModalOpen: true })}>+</Button>
            <Button disabled={!(this.state.coursedetail === null) ? false : true } size='lg' color="danger" 
            onClick={() => this.setState({ deleteModalOpen: true })}>-</Button>
        </Col>
        <Col xs={5} className="base-data-content" style={{ maxHeight: '83vh' , paddingBottom:"30px"}}>
            <CourseBaseDataList
            onAdd={() => this.setState({ addModalOpen: true })}
            onChange={value => this.setState({ coursedetail: value })}
            active={this.state.coursedetail}
            data={this.props.data}/>
        </Col>
        <div style={{borderLeft: '1px solid lightgrey', maxHeight: '85vh'}}></div>
        <Col xs={5}>
            <EditCourseBaseDataPanel 
            disabled={this.state.disabled}
            profdetail={this.state.coursedetail}
            data={this.props.data != null && this.state.coursedetail != null ? this.props.data[this.state.coursedetail] : null}
            saveChanges={this.saveCourse}
            />
        </Col>
    </Row>   
            <EditModuleFooter editActive={!this.state.disabled} onSave={this.saveChanges} toggle={this.setChangeMode} />
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
            <DeleteAlert
                alertOpen={this.props.courseAlertModalOpen}
                toggleAlert={this.props.toggleAlert}
            />
    </div> 
    </>
    : <></>    
}
}