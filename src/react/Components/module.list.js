import React, {Component} from 'react'
import ModuleListItem from './module.list.item'
import { ListGroup } from 'reactstrap';
import ModuleListHeader from './module.list.header';

class ModuleList extends Component {

    render () {
        return (
            <>
                <ModuleListHeader onAdd={this.props.onAdd} onSearch={this.props.onSearch} />
                <ListGroup>
                {this.props.data && this.props.data.length > 0 && this.props.data.map((o, idx) => <ModuleListItem
                    key={'module-list-item' + idx}
                    active={this.props.active === idx}
                    data={o}
                    listItemClickHandler={() => this.props.onChange(idx)}
                />)}
                </ListGroup>                
            </>
        )}
}
export default ModuleList
