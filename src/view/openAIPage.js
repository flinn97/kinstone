import { Component } from 'react';
import "../App.css"
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import FormWithUpdateAndRun from '../componentListNPM/componentForms/buttons/formWithUpdateAndRun';
import Notes from '../componentListNPM/componentForms/fullForms/notes';
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import OpenAI from './openAI';

// import mummy from "../pics/runesTest1/2red.png";
// import kinstone from "../pics/runesTest1/1red.png";

export default class OpenAIPage extends Component {
  constructor(props) {
    super(props);
      this.state={
        obj: undefined
      }

  }
  
  

  render() {
    let app = {...this.props.app};
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    let opps = state.opps
    let center = window.innerWidth<600? {
      display: "flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center"
    }: undefined


    return (
      <div style={{...center, width:"100vw", height:"100vh", display:"flex", flexDirection:"row"}} >
      
        <OpenAI app={app} type="card"/>
      </div>
    )

  }
}
