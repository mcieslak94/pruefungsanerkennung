import React, {Component} from 'react'
import ArchivListItem from './archiv.list.item'
import { ListGroup } from 'reactstrap';
import ArchivListHeader from './archiv.list.header';

class ArchivList extends Component {

    render () {
        return (
            <>
                <ArchivListHeader onAdd={this.props.onAdd} onSearch={this.props.onSearch} />
                <ListGroup>
                {this.props.data && this.props.data.length > 0 && this.props.data.map((o, idx) => <ArchivListItem
                    key={'archiv-list-item' + idx}
                    active={this.props.active === idx}
                    data={o}
                    listItemClickHandler={() => this.props.onChange(idx)}
                />)}
                </ListGroup>                
            </>
        )}
}
export default ArchivList
