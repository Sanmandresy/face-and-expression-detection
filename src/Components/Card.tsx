import React from 'react';
import {useState,useEffect} from "react";
import "../Styles/Card.css";
import ProcessImage from "../AWS/ProcessImage";
import BoundingBox from "./BoundingBox";
import {FaceDetail} from "aws-sdk/clients/rekognition";


const Card : React.FC <{file?:ImageData}> = () => {
    const [buttonStyle,setButton] = useState<string>("btn visible-btn");
    const [newButtonStyle,setNewButton] = useState<string>("hidden");
    const [image,setImage] = useState<File>();
    const [imageUrl,setImageUrl] = useState<string>("");
    const [display,mask] = useState<string>("hidden");
    const [title,showTitle] = useState<string>("hidden");
    const [list,setList] = useState<Array<FaceDetail>>();
    const [tableVisibility,setVisibility] = useState<string>("hidden");
    const [isLoading,setLoading] = useState<boolean>(false);

    const changeImageToDisplay = () => {
        setNewButton("hidden");
        showTitle("hidden");
        mask("hidden");
        setButton("btn visible-btn");
        setVisibility("hidden");
        setList(undefined);
    }


    useEffect(() => {
        if(image){
            setImageUrl(URL.createObjectURL(image));
        }
    },[image]);


    return (<>
        <div className="card" id={"keeper"}>
                <div className="card-body d-flex flex-column align-items-center">
                    <input type="file" accept={"image/*"}  id="select-image" className={"hidden"} onChange={(event) => {
                        var picture = event.target.files?.[0];
                        ProcessImage(event,setList,setLoading);
                        setImage(picture);
                        mask("preview");
                        showTitle("card-title");
                        setButton("hidden");
                        setNewButton("btn visible-btn");
                        setVisibility("table table-bordered table-hover table-striped result");
                    }}/>
                    <label htmlFor="select-image" className={buttonStyle}>Upload</label>
                    <h5 className={title} id={"title"}>{image?.name.split(".")[0]}</h5>
                    <div className={"img-container"}>
                        {list !== undefined && <BoundingBox Height={list?.at(0)?.BoundingBox?.Height} Left={list?.at(0)?.BoundingBox?.Left} Top={list?.at(0)?.BoundingBox?.Top} Width={list?.at(0)?.BoundingBox?.Width}/>}
                        {<img src={imageUrl} className={display} alt={""} />}
                    </div>
                    <button className={newButtonStyle} onClick={() => {
                        changeImageToDisplay();
                    }} >New image</button>
                </div>
        </div>
        <table className={tableVisibility}>
            <thead>
            <tr>
                <th  className={"label"} scope="col">Labels</th>
                <th scope="col" className={"values"}>Value(s)</th>
            </tr>
            </thead>
            <tbody>
            {
                isLoading? <div className="loader"></div> : list?.map((details) => (
                    <>
                        <tr>
                            <th className={"label"}  scope="row">AgeRange</th>
                            <td className={"values"} >{details.AgeRange?.Low} - {details.AgeRange?.High} years</td>
                        </tr>
                        <tr>
                            <th className={"label"} scope="row">Beard</th>
                            <td className={"values"} >{details.Beard?.Value?.toString()} : {details.Beard?.Confidence?.toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <th className = {"label"} scope = "row">Emotions</th>
                            <td className={"values"} >{details.Emotions?.map((emotion:any) => (
                                <ul>
                                    <li>{emotion.Type.toLowerCase()} : {emotion.Confidence.toFixed(2)}%</li>
                                </ul>
                            ))}</td>
                        </tr>
                        <tr>
                            <th className={"label"} scope="row">BoundingBox</th>
                            <td className={"values"} >
                                <ul>
                                    <li>Height : {details.BoundingBox?.Height?.toFixed(2)} </li>
                                    <li>Left : {details.BoundingBox?.Left?.toFixed(2)}  </li>
                                    <li>Top : {details.BoundingBox?.Top?.toFixed(2)}  </li>
                                    <li>Width : {details.BoundingBox?.Width?.toFixed(2)}  </li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <th className={"label"} scope="row">Confidence</th>
                            <td className={"values"} >{details.Confidence?.toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <th className={"label"} scope="row">Eyeglasses</th>
                            <td className={"values"} >{details.Eyeglasses?.Value?.toString()} : {details.Eyeglasses?.Confidence?.toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <th className={"label"} scope="row">EyesOpen</th>
                            <td className={"values"} >{details.EyesOpen?.Value?.toString()} : {details.EyesOpen?.Confidence?.toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <th className={"label"} scope="row">Gender</th>
                            <td className={"values"} >{details.Gender?.Value} : {details.Gender?.Confidence?.toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <th  className={"label"} scope="row">MouthOpen</th>
                            <td className={"values"} >{details.MouthOpen?.Value?.toString()} : {details.MouthOpen?.Confidence?.toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <th  className={"label"} scope="row">Mustache</th>
                            <td className={"values"} >{details.Mustache?.Value?.toString()} : {details.Mustache?.Confidence?.toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <th  className={"label"} scope="row">Pose</th>
                            <td className={"values"} >
                                <ul>
                                    <li>Pitch : {details.Pose?.Pitch?.toFixed(2)} </li>
                                    <li>Roll : {details.Pose?.Roll?.toFixed(2)}  </li>
                                    <li>Yaw : {details.Pose?.Yaw?.toFixed(2)}  </li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <th className={"label"} scope="row">Quality</th>
                            <td className={"values"} >
                                <ul>
                                    <li>Brightness : {details.Quality?.Brightness?.toFixed(2)} </li>
                                    <li>Sharpness : {details.Quality?.Sharpness?.toFixed(2)}  </li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <th className={"label"} scope="row">Smile</th>
                            <td className={"values"} > {details.Smile?.Value?.toString()} :  {details.Smile?.Confidence?.toFixed(2)}%</td>
                        </tr>
                        <tr>
                            <th className={"label"}  scope="row">Sunglasses</th>
                            <td className={"values"} >{details.Sunglasses?.Value?.toString()} {details.Sunglasses?.Confidence?.toFixed(2)}%</td>
                        </tr>
                </>))
            }

            </tbody>
        </table>
    </>);
}

export default Card