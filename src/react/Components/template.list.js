import React, {Component} from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';

class TemplateList extends Component {

    render () {
        return (
            <>
            <ListGroup >
                {this.props.data && this.props.data.length > 0 && this.props.data.map((o, idx) => 
                <ListGroupItem  key={'template-list-item' + idx}
                    active={this.props.active === idx}
                    onClick={() => this.props.onChange(idx)}
                    tag="button" action>
                    <span>{(o.templateBetreff ? o.templateBetreff : '')}</span>
                </ListGroupItem>)}
            </ListGroup>
            </>
        )}
}

export default TemplateList 

