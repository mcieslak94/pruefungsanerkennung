import React, {Component} from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';

class BaseDateList extends Component {

    render () {
        return (
            <>
            <ListGroup>
                {this.props.data && this.props.data.length > 0 && this.props.data.map((o, idx) => <ListGroupItem  key={'base-date-list-item' + idx}
                    active={this.props.active === idx}
                    onClick={() => this.props.onChange(idx)}
                    tag="button" action>
                        <span><b>{o}</b></span>
                    </ListGroupItem>)}
            </ListGroup>
            </>
        )}
}

export default BaseDateList
