import React from 'react'
import { ListGroupItem } from 'reactstrap'

    const UniversityListItem = ({ data, listItemClickHandler, active }) => (
        <ListGroupItem active={active} tag="button" action onClick={() => listItemClickHandler()}>
            <span><b>{(data.universityName ? data.universityName : '')}</b></span>
        </ListGroupItem>
    )

    export default UniversityListItem