import React, {Component} from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';

class ProfBaseDataList extends Component {

    render () {
        return (
            <>
            <ListGroup >  
                {this.props.data && this.props.data.length > 0 && this.props.data.map((o, idx) => 
                <ListGroupItem  key={'prof-base-date-list-item' + idx}
                    active={this.props.active === idx}
                    onClick={() => this.props.onChange(idx)}
                    tag="button" action>
                    <span>{(o.titel ? o.titel : '') + ' ' + (o.profFirstName ? o.profFirstName : '') + ' ' + (o.profName ? o.profName : '')}</span>
                </ListGroupItem>)}
            </ListGroup>
            </>
        )}
}

export default ProfBaseDataList 

