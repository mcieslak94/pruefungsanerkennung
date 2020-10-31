import React, {Component} from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge } from 'reactstrap'
const electron = window.require('electron')

 
export default class Notifications extends Component {

    constructor(props) {
        super(props)
        const DataBaseConnector = electron.remote.require('./casedb.js')
        this.casesDB = DataBaseConnector()
      }
    
      componentDidMount() {
        this.getDueReminder()
      }
    
      state = {
        current: 0,
        casesToRemind: null  
      }
    
      getDueReminder = () => {
          let today = new Date()
          let dateString = '' + today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate()   
          this.casesDB.reminderCases(dateString, casesToRemind => this.setState({ casesToRemind }))
      }

    state = {
        selectedIndex: 0,
        dropdownOpen: false,
        casesToRemind: [''],
        count: 0
    };


    render = () => {
        return (
            <div>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.setState({ dropdownOpen: !this.state.dropdownOpen }) }>
                    <DropdownToggle caret>
                        Erinnerungen <Badge color={this.state.casesToRemind && this.state.casesToRemind.length === 0 ? "secondary" : "danger"}>{ this.state.casesToRemind ? this.state.casesToRemind.length : 0 }</Badge>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem disabled>Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem>Another Really Really Long Action</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        )
    }
}
