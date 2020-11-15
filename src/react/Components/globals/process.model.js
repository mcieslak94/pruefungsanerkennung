import React from 'react'
import { Progress } from "reactstrap";

const DocumentDetail = ( header, progressValue ) => {
    return ( 
        <div>
            <h2>{{header}}</h2>
                <Progress color="success" value={{progressValue}} />
        </div>
    );
    };

export default DocumentDetail;