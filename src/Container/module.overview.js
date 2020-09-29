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

    getModules = () => {
        this.module.getAll(modules => this.setState({ modules }))
    }

    addModule = newModule => {
      this.module.data(newModule).create(() => {
        this.getModules()
        console.log(' module added')
    })
    }

    saveCase = (module) => {
      let data = {
          value: module,
          selector: { moduleID: this.state.modules[this.state.detail].moduleID }
      }
      this.module.data(data).update(() => this.getModules())
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
                        data={this.state.modules}
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

