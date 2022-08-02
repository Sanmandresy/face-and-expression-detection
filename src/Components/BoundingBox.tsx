import React from 'react';

const BoundingBox:React.FC <{Height?:number,Left?:number,Top?:number,Width?:number}> = (props) => {
    const {Height, Left, Top, Width} = props;
    return(<>
        <span className={"bdbox"}  style={{
            "position" : "absolute",
            "height" : `${Height?Height*220:220}px`,
            "left" : `${Left?Left*200:200}px`,
            "top" : `${Top?Top*220:220}px`,
            "width" : `${Width?Width*200:200}px`
        }}></span>
    </>);
}


export default BoundingBox;