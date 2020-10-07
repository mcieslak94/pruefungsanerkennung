import React, {Component} from 'react'
import { Form, FormGroup, Row, Col, Label, Input, CustomInput } from 'reactstrap'
import EditFooter from './globals/edit.footer';
import ProfsInput from './inputField.profs';

const electron = window.require('electron')


export default class ModuleContent extends Component {

    constructor(props) {
        super(props);
        const DataBaseConnector = electron.remote.require('./database.connector.js')        
        const ModuleDatabase = electron.remote.require('./module-db.js')
        this.moduleExtraDB = ModuleDatabase()
        this.courseDB = DataBaseConnector('course')
        this.courseXDB = DataBaseConnector('courseXmodule')
    }
    state = { 
        disabled: true,
        documentsModalOpen: false,
        courses: null,
        courseXmodule: null,
        prof: null,
        form: {
            moduleName: '', 
            creditpoints: '', 
            courseID: '' ,
            professorID:''
        }      
    }
    
    componentDidMount() {
        this.getCourses()
    }

    componentDidUpdate(prevProps) {
        if((prevProps.data == null && this.props.data != null) || (this.props.data != null && (this.props.data.professorID !== prevProps.data.professorID))){
            this.getProfByModule()
        }
    }
    
    getCourses = () => {
        this.courseDB.getAll(courses => this.setState({ courses }))
    }
    
    getCourseXmodule = () => {
        this.moduleExtraDB.getProfByModule(this.props.data.professorID, prof => {
            if(prof && prof.length > 0) prof = prof[0]
            this.setState({ prof })
        })    
    }

    getProfByModule = () => {
        this.moduleExtraDB.getProfByModule(this.props.data.professorID, prof => {
            if(prof && prof.length > 0) prof = prof[0]
            this.setState({ prof })
          })
    }

    handleChange = (prop, e) => {
        console.log('##', prop, e)
        console.log('## data', this.props.data)
        let tempForm = this.props.data
        tempForm[prop] = e.target.value
        this.setState({ tempForm })
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
        this.setChangeMode()
    }

    setChangeMode = () => {
        this.setState( {disabled: !this.state.disabled} )
    }

    render = () => {
    return this.props.data
    ? 
    <div style={{ paddingBottom: "70px", paddingTop: "40px" }}>
    <h3 className='header-row'>{(this.props.data.moduleName ? this.props.data.moduleName : '')}</h3>
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
                                        checked={this.props.selected && this.props.selected.length > 0 && (this.props.selected.findIndex(m => m === c.moduleID) !== -1)} 
                                        label={c.courseName} 
                                        onChange={(value) => this.props.onChange(c.courseID, value)}/>
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
    <EditFooter editActive={!this.state.disabled} onSave={this.saveChanges} toggle={this.setChangeMode} />
    </div> 
    : <></>    
}
}