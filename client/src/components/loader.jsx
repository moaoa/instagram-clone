import React from 'react';
import Loader from 'react-loader-spinner';
export default function MyLoader() {
    return (
        <>
            <div className="loader">
                <Loader type="Puff" color="#00BFFF" height={100} width={100} />
            </div>
        </>
    );
}
