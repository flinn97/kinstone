import React, { Component } from 'react';
import "../App.css"
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import FormWithUpdateAndRun from '../componentListNPM/componentForms/buttons/formWithUpdateAndRun';
import auth from '../services/auth';


/**
 * condensed version of the cards.
 * Works with themes.
 * props
 * theme
 * type
 * app
 * options
 * options can include cardType, cardContent, tabType, 
 */
export default class CustomMergeReqListItem extends Component {
  constructor(props) {
    super(props);
    

  }



  render() {
    let app = {...this.props.app};
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let req = this.props.obj

    
  





    return (
      <div style={{display:"flex", flexDirection:"row"}} >
        mine
        <img style={{width: "50px", height:"50px"}} src={componentList.getComponent("mergeRequestKinstoneHalf", req.getJson().kinstoneHalfid)?.getJson()?.picURL}/>
        theirs
        <img style={{width: "50px", height:"50px"}} src={componentList.getComponent("mergeRequestKinstoneHalf", req.getJson().senderKinstoneHalfid)?.getJson()?.picURL}/>
        </div>

    )
  }
}
