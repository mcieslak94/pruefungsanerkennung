import React from 'react'
import { ListGroupItem } from 'reactstrap'

    const ModuleListItem = ({ data, listItemClickHandler, active }) => (
        <ListGroupItem active={active} tag="button" action onClick={() => listItemClickHandler()}>
            <span><b>{(data.moduleName ? data.moduleName : '')}</b></span>
        </ListGroupItem>
    )

    export default ModuleListItem