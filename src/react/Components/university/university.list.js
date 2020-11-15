import React, {Component} from 'react'
import UniversityListItem from './university.list.item'
import { ListGroup } from 'reactstrap';
import UniversityListHeader from './university.list.header';

class UniversityList extends Component {

    render () {
        return (
            <>
                <UniversityListHeader onAdd={this.props.onAdd} onSearch={this.props.onSearch} />
                <ListGroup>
                {this.props.data && this.props.data.length > 0 && this.props.data.map((o, idx) => <UniversityListItem
                    key={'university-list-item' + idx}
                    active={this.props.active === idx}
                    data={o}
                    listItemClickHandler={() => this.props.onChange(idx)}
                />)}
                </ListGroup>                
            </>
        )}
}
export default UniversityList
