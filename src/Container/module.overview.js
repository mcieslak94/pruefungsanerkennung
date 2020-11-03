import React, {Component} from 'react'
import { Row, Col } from 'reactstrap'
import ModuleList from '../Components/module.list'
import ModuleContent from '../Components/module.content'
import AddModuleModal from '../Components/add.module.modal'

const electron = window.require('electron')

export default class MainView extends Component {
        constructor(props) {
        super(props)
        const DataBaseConnector = electron.remote.require('./database.connector.js')
        this.module = DataBaseConnector('module')
      }
      state = {
        modules: null
      }  
  
      componentDidMount() {
          this.getModules()          
      }

    getModules = (searchString = null) => {
        let data = {
            criteria: 'moduleName'
        }
        this.module.data(data).getAllAsc(modules => this.setState({ modules }))
    }

    addModule = newModule => {
      this.module.data(newModule).create(() => {
        this.getModules()
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

    render () {
        return (
            <>
                <Row className='app-header'>
                    <Col><h3>Modulübersicht</h3></Col>
                </Row>
                <Row className='app-body'>
                <Col xs={3} className='app-list' style={{ minHeight: '89vh' }}>
                    <ModuleList 
                        onAdd={() => this.setState({ addModalOpen: true })}
                        onChange={value => this.setState({ detail: value })} 
                        active={this.state.detail}
                        onSearch={searchString => this.setState({ searchString })}
                        data={this.filterModules()}
                    />
                </Col>
                <Col xs={9} className='app-content' style={{ maxHeight: '83vh' }}>
                    <ModuleContent 
                    detail={this.state.detail} 
                    data={this.state.modules != null && this.state.detail != null ? this.state.modules[this.state.detail] : null}
                    saveChanges={this.saveCase}
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

