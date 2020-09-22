import React, {Component} from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge } from 'reactstrap'

 
export default class Notifications extends Component {

    state = {
        selectedIndex: 0,
        dropdownOpen: false,
        count: 0
    };


    render = () => {
        return (
            <div>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.setState({ dropdownOpen: !this.state.dropdownOpen }) }>
                    <DropdownToggle caret>
                        Erinnerungen <Badge color={this.state.count === 0 ? "secondary" : "danger"}>{this.state.count}</Badge>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem disabled>Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem>Another Really Really Long Action (Really!)</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        )
    }
}
