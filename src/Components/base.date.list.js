import React, {Component} from 'react'
import { ListGroup } from 'reactstrap';
import BaseDateListHeader from './base.date.list.header';
import BaseDateListItem from './base.date.list.item';

class BaseDateList extends Component {

    render () {
        return (
            <>
                <BaseDateListHeader onAdd={this.props.onAdd} />
                <ListGroup>
                {this.props.data && this.props.data.length > 0 && this.props.data.map((o, idx) => <BaseDateListItem
                    key={'base-date-list-item' + idx}
                    active={this.props.active === idx}
                    data={o}
                    listItemClickHandler={() => this.props.onChange(idx)}
                />)}
                </ListGroup>                
            </>
        )}
}
export default BaseDateList
