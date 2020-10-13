import React, { Component } from 'react';
import Navigation from './Components/globals/navigation.js'
import './App.css';
import MainView from './Container/main.view';
import ModuleOverview from './Container/module.overview.js';
import './styles/main.css'
import { Container } from 'reactstrap';
import BaseDataView from './Container/base.data.view.js';
import UniversityView from './Container/university.view.js';
import ArchivView from './Container/archiv.view.js';

class App extends Component {
  state = {
    current: 0
  }
  
  getPage() {
    switch (this.state.current) {
      case 0: return <MainView />
      case 1: return <ModuleOverview />  
      case 2: return <BaseDataView />
      case 3: return <UniversityView />
      case 4: return <ArchivView />
      default: return <MainView />;
    }

    
  }
            /**<Row className="app-footer">
                <Col><p>Meike Cieslak</p></Col>
            </Row>*/

  render () {
        return (
      
          <Container fluid>
            <Navigation changeSite={(value) => this.setState({current: value})}/>
            {this.getPage()}
          </Container>
      );
}
}
export default App;
