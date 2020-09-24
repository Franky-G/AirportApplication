import {Container, Input} from "reactstrap";
import Fade from "@material-ui/core/Fade";

export const helperRenderFunction = (temp) => {
    return ( <Input name = {temp.name} placeholder = {temp.place} className = {temp.classname} style = {temp.style} color={temp.color} onChange={temp.change}/> )
}

export const helperSetCurrentSearchBar = (temp) => {
    return ( <Container><Fade id="searchCollapse" in={temp.info} style={{zIndex: 1010}}>{temp.extra}</Fade></Container> )
}

export const calculateDistance = () => { console.log("placeholder function"); }


