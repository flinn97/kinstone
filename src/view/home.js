import { Component } from 'react';
import "../App.css"
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import FormWithUpdateAndRun from '../componentListNPM/componentForms/buttons/formWithUpdateAndRun';
import Notes from '../componentListNPM/componentForms/fullForms/notes';
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import CRM from './crm';
import mummy from "../pics/runesTest1/2red.png";
import kinstone from "../pics/runesTest1/1red.png";
import Element from './element';
import KinstoneHalf from './kinstoneHalf';
import Kinstone from './kinstone';
import CrowningJewels from './crowningJewels';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      obj: undefined
    }

  }



  render() {
    let app = { ...this.props.app };
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;
    let opps = state.opps
    let center = window.innerWidth < 600 ? {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    } : undefined


    return (
      <div style={{ ...center, width: "100vw", height: "100vh", display: "flex", flexDirection: "column", }} >
        <div style={{cursor:"pointer", backgroundColor:"green", marginTop:'10px', color:"white", borderRadius:"7px", position: "absolute", right: "0", top: 0, width:"120px", height:"40px", display:"flex", alignItems:"center", justifyContent:"center" }}
        onClick={()=>{app.dispatch({popupSwitch: "viewmergerequest"})}}>View Merge Requests</div>
        <div style={{ width: "100vw", display: "flex", flexDirection: "row" }} >
          <Element app={app} options={{ cardType: "bigCard" }} />
          <KinstoneHalf app={app} options={{ cardType: "bigCard" }} />
        </div>
        <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "row" }} >
          <Kinstone app={app} options={{ cardType: "bigCard" }} />
          <CrowningJewels app={app} options={{ cardType: "bigCard" }} />

        </div>

        <div>
        </div>

        {/* <CRM app={app} type="biggestCardColorTabWhite"/> */}
      </div>
    )

  }
}