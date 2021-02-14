import React, {Component} from 'react'
import { Row, Col } from 'reactstrap'
import ModuleList from '../Components/module.list'
import ModuleContent from '../Components/module.content'
import AddModuleModal from '../Components/add.module.modal'

const electron = window.require('electron')

export default class MainView extends Component {
        constructor(props) {
        super(props)
        const DataBaseConnector = electron.remote.require('../src/shared/database.connector.js')
        const ModuleConnector = electron.remote.require('../src/shared/modules.db.js')
        this.module = DataBaseConnector('module')
        this.courseXmodule = DataBaseConnector('courseXmodule')
        this.moduleCon = ModuleConnector()
      }
      state = {
        modules: null,
        isOnChange: false,
        alertModalOpen: false 
      }  
  
    componentDidMount() {
          this.getModules()          
    }

    getModules = (searchString = null) => {
        console.log('###', this.state.modules)
        let data = {
            criteria: 'moduleName'
        }
        this.module.data(data).getAllAsc(modules => this.setState({ modules }))
    }

    getModuleID = (module) => {
        return this.moduleCon.getModuleID((module), tempID => {
            this.setState({ tempID })
        })
    }

    addModule = (data) => {
        let newModule = {
            moduleName: data.moduleName,
            creditpoints: data.creditPoints,
            professorID: data.professorID
        }
        this.module.data(newModule).create((module_ID) => {
            this.getModules()
            data.courseIDs.forEach((s) => {
                let data = {
                    courseID: s.courseID,
                    module_ID
                }
                this.courseXmodule.data(data).create(() => {})
            })
        })

    }

    saveCase = (module) => {
      let data = {
          value: module,
          selector: { moduleID: this.state.modules[this.state.detail].moduleID }
      }
      this.module.data(data).update(() => this.getModules())
  }

    filterModules = () => {
        if (!this.state.searchString || this.state.searchString.length < 1) return  this.state.modules
        let splitted = this.state.searchString.toLowerCase().split(' ') 
        return this.state.modules.filter(c => {
            let match = false
            splitted.forEach(s => {
                match = c.moduleName.toLowerCase().includes(s) 
            });
            return match
        })
    }

    isOnChange = (value) => {
        if(!this.state.isOnChange){
            this.setState({ detail: value })
        } else {
            this.setState({alertModalOpen : true})
        }
    }

    render () {
        return (
            <>
                <Row className='app-header'>
                    <Col><h3>Modulübersicht</h3></Col>
                </Row>
                <Row className='app-body'>
                <Col xs={3} className='app-list' style={{ minHeight: '89vh' }}>
                    <ModuleList 
                        onAdd={() => this.setState( { detail: null, addModalOpen: true })}
                        onChange={this.isOnChange}
                        active={this.state.detail}
                        onSearch={searchString => this.setState({ searchString })}
                        data={this.filterModules()}
                    />
                </Col>
                <Col xs={9} className='app-content' style={{ maxHeight: '83vh' }}>
                    <ModuleContent 
                        alertModalOpen={this.state.alertModalOpen}
                        toggle={() => this.setState({ alertModalOpen: !this.state.alertModalOpen })}
                        detail={this.state.detail} 
                        data={this.state.modules != null && this.state.detail != null ? this.state.modules[this.state.detail] : null}
                        saveChanges={this.saveCase}
                        toggleIsOnChange={() => this.setState({ isOnChange: !this.state.isOnChange })}
                    />
                </Col>
            </Row>
            <AddModuleModal className="app-modal-add"
                open={this.state.addModalOpen}
                toggle={() => this.setState({ addModalOpen: !this.state.addModalOpen })}
                onSubmit={this.addModule}
            />
                   
            </>
        )}
}

