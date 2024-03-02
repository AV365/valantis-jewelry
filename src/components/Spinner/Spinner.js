
import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

export default function Spinner() {
    return (
        <div className="card flex align-items-center justify-content-center w-screen h-screen">
            <ProgressSpinner />
        </div>
    );
}
