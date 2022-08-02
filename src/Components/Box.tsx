import React from 'react';
import Card from "./Card";

const Box : React.FC <{}> = () => {
    return(<>
        <div className="container-fluid d-flex justify-content-evenly " id={"box"}>
            <Card/>
        </div>
    </>);
}

export default Box;