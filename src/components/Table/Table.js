
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';

export default function Table({items}) {

    const brandBodyTemplate = (brand) => {

        if (brand.brand != null)
            return <Tag value={brand.brand}></Tag>;
        else
            return '';
    };


    useEffect(() => {


    }, [])

    return (
        <div className="card">
            <DataTable value={items} stripedRows tableStyle={{ minWidth: '50rem' }}>
                <Column field="product" header="Product"></Column>
                <Column field="brand" header="Brand"  body={brandBodyTemplate}></Column>
                <Column field="price" header="Price"></Column>
                <Column field="id" header="Id"></Column>
            </DataTable>
        </div>
    );
}
