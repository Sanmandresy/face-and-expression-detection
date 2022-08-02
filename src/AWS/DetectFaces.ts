import {Dispatch, SetStateAction} from "react";
import AWS from 'aws-sdk';
import {DetectFacesResponse} from "aws-sdk/clients/rekognition";

const DetectFaces = (imageData: ArrayBuffer,setList:Dispatch<SetStateAction<any>>,setLoading:Dispatch<SetStateAction<boolean>>) => {
    const rekognition = new AWS.Rekognition();
    const params = {
        Image: {
            Bytes: imageData
        },
        Attributes: [
            'ALL',
        ]
    };
    rekognition.detectFaces(params,(error,response:DetectFacesResponse) => {
        if(error){
            console.error(error.stack);
            alert("Oops ! Something went wrong !");
            window.location.reload();
        }
        else{
            console.log("Ok AWS Rekognition  is called");
            setList(response.FaceDetails);
            setLoading(false);
        }
    });
}

export default DetectFaces;