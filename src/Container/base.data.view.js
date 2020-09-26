import React, { Component } from 'react'
/* import moment from 'moment'
 */
const electron = window.require('electron')


export default class BaseDataView extends Component {
    constructor(props) {
        super(props)
        const DataBaseConnector = electron.remote.require('./database.connector.js')
        const DatabaseCase = electron.remote.require('./casedb.js')
        this.course = DataBaseConnector('course')
        this.casesDB = DataBaseConnector('cases')
        this.caseDB = DatabaseCase()
    }

    render = () => {
        return <>    
            
            
        </>
    }
}
