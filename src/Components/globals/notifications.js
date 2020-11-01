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
        this.getDueModuleReminder()
      }
    
      state = {
        current: 0,
        casesToRemind: null,  
        modulesToRemind: null,  
      }
    
        getDueReminder = () => {
            let today = new Date()
            let dateString = '' + today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate()   
            this.casesDB.reminderCases(dateString, casesToRemind => this.setState({ casesToRemind }))
        }

        getDueModuleReminder = () => {
            let today = new Date()
            var day
            if(today.getDate()<10)
                day = "0" + today.getDate()
            else
                day = today.getDate()

            let dateString = '' + today.getFullYear() + '-' + (today.getMonth()+1) + '-' + day    
            this.casesDB.reminderModules(dateString, modulesToRemind => this.setState({ modulesToRemind }))
        }

    state = {
        selectedIndex: 0,
        dropdownOpen: false,
        casesToRemind: [''],
        modulesToRemind: [''],
        count: 0
    };


    render = () => {
        return (
            <div>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.setState({ dropdownOpen: !this.state.dropdownOpen }) }>
                    <DropdownToggle caret>
                        Erinnerungen <Badge color={this.state.casesToRemind && this.state.casesToRemind.length === 0 ? "secondary" : "danger"}>{ this.state.casesToRemind && this.state.modulesToRemind ? this.state.casesToRemind.length + this.state.modulesToRemind.length : 0 }</Badge>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem header className="text-danger">Fälle, bei denen eine Erinnerungs-E-Mail fällig ist</DropdownItem>
                        {this.state.casesToRemind && this.state.casesToRemind.length > 0 && this.state.casesToRemind.map((c, idx) => 
                        <DropdownItem  key={'reminder-cases-item' + idx}
                            onClick={() => this.props.setDetail(c.caseID)}
                            tag="button">
                            <span>{(c.caseLastName ? c.caseLastName : '') + ', ' + (c.caseFirstName ? c.caseFirstName : '')}</span>
                        </DropdownItem>)}
                        <DropdownItem divider/>
                        <DropdownItem header className="text-danger">Module, bei denen eine Erinnerungs-E-Mail fällig ist</DropdownItem>
                        {this.state.modulesToRemind && this.state.modulesToRemind.length > 0 && this.state.modulesToRemind.map((c, idx) => 
                        <DropdownItem  key={'reminder-cases-item' + idx}
                            onClick={() => this.props.setDetail(c.caseID)}
                            tag="button">
                            <span>{(c.caseLastName ? c.caseLastName : '') + ', ' + (c.caseFirstName ? c.caseFirstName : '')}</span>
                        </DropdownItem>)}
                    </DropdownMenu>
                </Dropdown>
            </div>
        )
    }
}

Notifications.defaultProps = {
    setDetail: (data) => console.warn('this.props.onChange ist nicht definiert', data)
}