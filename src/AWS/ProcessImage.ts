import {Dispatch, SetStateAction} from "react";
import log from "./Login";
import DetectFaces from "./DetectFaces";


const ProcessImage  = (e:any,setList:Dispatch<SetStateAction<any>>,setLoading:Dispatch<SetStateAction<boolean>>) => {
    log();
    setLoading(true);
    new Response(e.target.files?.[0]).arrayBuffer().then((result) => {
        console.log("Calling the API !");
        DetectFaces(result,setList,setLoading);
    });
}

export default ProcessImage;