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
import FriendRequestList from './friendRequestList';
import FriendList from './friendList';

export default class Friend extends Component {
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
        onClick={()=>{app.setPopup({operate: "addfriendRequest", operation: "cleanJsonPrepare", object: { _id: Math.floor(Math.random()*100000).toString()}},"addfriendRequest")}}>Add Friend</div>
        <FriendRequestList app={app} options={{ cardType: "bigCard" }} />
        <FriendList app={app} options={{cardType:"bigCard"}}/>
      </div>
    )

  }
}