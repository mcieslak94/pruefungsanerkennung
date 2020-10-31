import React, {Component} from 'react'
import { Form, FormGroup, Row, Col, Label, Input, CustomInput } from 'reactstrap'
import ModuleEditFooter from './globals/module.edit.footer';
import ProfsInput from './inputField.profs';

const electron = window.require('electron')


export default class ModuleContent extends Component {

    constructor(props) {
        super(props);
        const DataBaseConnector = electron.remote.require('./database.connector.js')        
        const ModuleDatabase = electron.remote.require('./modules.db.js')
        const CourseDatabase = electron.remote.require('./course.db.js')
        this.moduleExtraDB = ModuleDatabase()
        this.courseDB = CourseDatabase()
        this.courseXDB = DataBaseConnector('courseXmodule')
    }
    state = { 
        disabled: true,
        documentsModalOpen: false,
        courses: null,
        courseIDs: null,
        courseXmodule: null,
        prof: null, 
        deleteArray: [], 
        addArray: []
    }
    
    componentDidMount() {
        this.getCourses()
    }

    componentDidUpdate(prevProps) {
        if((prevProps.data == null && this.props.data != null) || (this.props.data != null && (this.props.data.professorID !== prevProps.data.professorID))){
            this.getProfByModule()
            this.getCourseXmodule()
        }
    }
    
    getCourses = () => {
        let data = {
            intern: '1'
        }
        this.courseDB.getCourses(data.intern, courses => this.setState({ courses }))
    }
        
    getCourseXmodule = () => {
        this.moduleExtraDB.getCourseIDbyModule(this.props.data.moduleID, courseIDs => {
            this.setState({ courseIDs })
        })    
    }

    getProfByModule = () => {
        this.moduleExtraDB.getProfByModule(this.props.data.professorID, prof => {
            if(prof && prof.length > 0) prof = prof[0]
            this.setState({ prof })
          })
    }

    handleChange = (prop, e) => {
        let tempForm = this.props.data
        tempForm[prop] = e.target.value
        this.setState({ tempForm })
    }

    toggleCourse = (courseID) => {
        if(this.state.courseIDs.find(m => m.courseID === courseID)){
            let tempCourse = this.state.courseIDs
            var idx =this.state.courseIDs.findIndex(m => m.courseID === courseID)
            tempCourse.splice(idx,1)
            this.setState({courseIDs: tempCourse})  
            this.state.deleteArray.push(courseID)
        } else {
            let tempCourse = this.state.courseIDs
            const value = {courseID: courseID}
            tempCourse.push(value)
            this.setState({courseIDs: tempCourse})   
            this.state.addArray.push(courseID)
        }
    }

    addCourses = () => {
        this.state.addArray && this.state.addArray.length > 0 && this.state.addArray.map(c => {
            let data = {
                courseID: c,
                module_ID: this.props.data.moduleID
            }
            this.courseXDB.data(data).create(() => {
                this.getCourseXmodule()
                return null
            })
            return null
    })
    }

    deleteCourses = () => {
        this.state.deleteArray && this.state.deleteArray.length > 0 && this.state.deleteArray.map(c => {
            let data = {
                courseID: c,
                module_ID: this.props.data.moduleID
            }
            this.moduleExtraDB.deleteCourseXmodule(data, (changes) => {
            this.getCourseXmodule()
                return null
              })
            return null
    })
    }

    handleProf = (prop, e) => {
        let tempForm = this.props.data
        tempForm[prop] = e
        this.setState({ tempForm })
    }

    handleSubmit = () => {
        this.props.onSubmit(this.state.form)
        this.props.toggle()
        this.setState({ form: {} })
    }

    saveChanges = () => {
        this.props.saveChanges(this.props.data)
        this.addCourses()
        this.deleteCourses()
        this.setChangeMode()
    }

    resetChanges = () => {
        this.getCourseXmodule()
        this.setState({addArray: []})
        this.setState({deleteArray: []})
        this.setChangeMode()
    }

    setChangeMode = () => {
        this.setState( {disabled: !this.state.disabled} )
    }

    render = () => {
    return this.props.data
    ? 
    <div style={{ paddingBottom: "70px"}}>
    <h3>{(this.props.data.moduleName ? this.props.data.moduleName : '')}</h3>
    <Form>
           <FormGroup>
                <Row xs={2} style={{ padding: 16 }}>
                    <Col>
                        <Label for="moduleName">Modulname</Label>
                        <Input disabled={this.state.disabled} value={this.props.data.moduleName ? this.props.data.moduleName : ''} 
                        onChange={value => this.handleChange('moduleName', value)} 
                        type="text" placeholder="Modulname eintragen" />
                    </Col>
                    <Col>
                        <Label for="creditpoints">Credit Points</Label>
                        <Input disabled={this.state.disabled} value={this.props.data.creditpoints ? this.props.data.creditpoints : ''} 
                        onChange={value => this.handleChange('creditpoints', value)} 
                        type="text" placeholder="Credit Points eintragen" />
                    </Col>
                    <Col xs={12}>
                    <Label for="courseID">Studiengang</Label>
                    {this.state.courses && this.state.courses.length > 0 && this.state.courses.map(c => 
                                <Row key={'courses-option-' + c.courseID}>
                                    <Col>
                                    <CustomInput disabled={this.state.disabled}
                                        type="checkbox"
                                        id={"c.courseID" + c.courseID}
                                        checked={this.state.courseIDs && this.state.courseIDs.length > 0 && (this.state.courseIDs.find(m => m.courseID === c.courseID)) }
                                        label={c.courseName} 
                                        onChange={(value) => this.toggleCourse(c.courseID)}/>
                                    </Col>
                                </Row> 
                            )}
                    </Col>
                    <Col xs={12}>
                    <hr />
                    </Col>
                    <Col>
                        <Label for="professorID">Lehrender</Label>
                        <ProfsInput disabled={this.state.disabled} id="professorID" value={this.props.data.professorID ? this.props.data.professorID : ''} onChange={value => this.handleProf('professorID', value)} />
                    </Col>
                </Row>
        </FormGroup>
            
</Form>
    <ModuleEditFooter className="module-edit-footer" editActive={!this.state.disabled} onSave={this.saveChanges} toggle={this.resetChanges} />
    </div> 
    : <></>    
}
}