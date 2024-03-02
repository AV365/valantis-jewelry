import React from "react";
import { Paginator } from 'primereact/paginator';


export default function PageNav({totalRecords, onChange, pageStart, numRows}) {


    const onPageChange = (event) => {
        onChange(event.first);

    };

    return (
        <div className="card">
            <Paginator first={pageStart} rows={numRows} totalRecords={totalRecords} rowsPerPageOptions={numRows} onPageChange={onPageChange} />
        </div>
    );
}

