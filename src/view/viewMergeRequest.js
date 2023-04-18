import React, { Component } from 'react';
import "../App.css"
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import FormWithUpdateAndRun from '../componentListNPM/componentForms/buttons/formWithUpdateAndRun';
import auth from '../services/auth';
import kinstone from "../pics/runesTest1/1red.png";

import CustomMergeReqListItem from './mergeRequestListItem';
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
export default class ViewMergeRequest extends Component {
  constructor(props) {
    super(props);
    

  }

  /**
   * 
   * OPTIONS
   */


  render() {
    let app = {...this.props.app};
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    
    
    if(this.props.theme){
      if(Object.prototype.toString.call(this.props.theme) === "[object String]"){
        styles = state.themeFactory.getThemeFactory()[this.props.theme];
      }
      else{
        styles= this.props.theme;
      }
    }
    app.state.styles=styles
    




    //********CARD ASSIGN********/

    let cards={

      card: <Card app={app} options={this.props.options} type={this.props.type}/>,
      cardWithTab: <CardWithTab app={app} options={this.props.options} type={this.props.type}/>,
      popup: <Popup app={app} handleClose={this.props.handleClose}  options={this.props.options} type={this.props.type}/>,
      popupWithTab: <PopupWithTab app={app} handleClose={this.props.handleClose} options={this.props.options} type={this.props.type}/>
//popupType={this.props.popupType} popupTab={this.props.popupTab}
    
    }
    
    //*********CARD ASSIGN********/





    return (
      <div >
        
        {cards[this.props.type? this.props.type: "card"]}
        </div>

    )
  }
}



//********CONTENTS********/
class MainContent extends Component{
  constructor(props) {
    super(props);
    this.accept=this.accept.bind(this);
    this.decline=this.decline.bind(this);
    this.state={

      switchCase:"incoming"
    }
  }
  async componentDidMount(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
     await auth.getMergeRequests(this.props.app.state.user.getJson().owner, this.props.app.state.componentList);

     let mergeRequests = componentList.getList("mergeRequest", state.user.getJson().owner);
     for(let req of mergeRequests){
      await auth.getRequestedKinstone(req.getJson().kinstoneHalfid, componentList);
      await auth.getRequestedKinstone(req.getJson().senderKinstoneHalfid, componentList);

     }
     this.setState({start:true});

  }
  async accept(req){
    debugger
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let opps = state.opps;
    let componentList = state.componentList;
    let userHalf = await componentList.getComponent("mergeRequestKinstoneHalf", req.getJson().kinstoneHalfid);
    let senderHalf =  await componentList.getComponent("mergeRequestKinstoneHalf", req.getJson().senderKinstoneHalfid);
    let senderOgHalf = await auth.getRequestedKinstone(senderHalf.getJson().ogKinstoneHalf, componentList);
    let userOgHalf = componentList.getComponent("kinstoneComponent", userHalf.getJson().ogKinstoneHalf);
    let OGID = userOgHalf.getJson()._id
   
    let word = "";
              for (let el of [userHalf, senderHalf]) {
                word += el.getJson().title + " "
              }
            

              await opps.cleanJsonPrepare({ addkinstone: { title: word, picURL: kinstone,  owner:state.user.getJson().owner, _id:Math.floor((Math.random() * 100000)).toString(),   } });
              await opps.jsonPrepare({ addkinstone: { title: word, picURL: kinstone, owner:req.getJson().sender, _id:Math.floor((Math.random() * 100000)).toString(), }});

    await opps.prepareRun({ del: [userHalf, senderHalf,  userOgHalf, senderOgHalf, req] });

    // let requests = componentList.getList("mergeRequest", state.user.getJson().owner );
    // await senderOgHalf.setCompState({type:"kinstoneComponent"})
    // await opps.cleanPrepareRun({ update: senderOgHalf });

    // debugger
    // for(let req1 of requests){
      
    //   if(req1.getJson().friendOgKinstoneID===OGID){
    //     let del1 = componentList.getComponent("mergeRequestKinstoneHalf", req1.getJson().kinstoneHalfid);
    //     let del2 = componentList.getComponent("mergeRequestKinstoneHalf", req1.getJson().senderKinstoneHalfid);
    //     let change1 = await auth.getRequestedKinstone(del2.getJson().ogKinstoneHalf);
    //     await opps.prepareRun({del: [del1, del2, req1]});
    //     if(change1){
    //       change1.setCompState({type:"kinstoneComponent"});
    //       opps.cleanPrepareRun({update:change1});

    //     }


    //   }
    // }
    

  }

  async decline(req){
    debugger
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let opps = state.opps;
    let componentList = state.componentList;
    let userHalf = await componentList.getComponent("mergeRequestKinstoneHalf", req.getJson().kinstoneHalfid);
    let senderHalf =  await componentList.getComponent("mergeRequestKinstoneHalf", req.getJson().senderKinstoneHalfid);
    let senderOgHalf = await auth.getRequestedKinstone(senderHalf.getJson().ogKinstoneHalf, componentList);
    let userOgHalf = componentList.getComponent("kinstoneComponent", userHalf.getJson().ogKinstoneHalf);
    let OGID = userOgHalf.getJson()._id
    senderOgHalf.setCompState({type:"kinstoneComponent"});
    await opps.cleanPrepare({ update: senderOgHalf});
    await opps.prepareRun({del:[userHalf, senderHalf, req]});

  }

  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    

    return(
      <div>
        {this.state.start&&(<>
      <div style={{display:"flex", flexDirection:'row'}}>
        <div style={{color:this.state.switchCase==="incoming"? "magenta":"black"}} onClick={()=>{this.setState({switchCase:"incoming"})}}>Incoming</div>
      <div style={{color:this.state.switchCase!=="incoming"? "magenta":"black"}} onClick={()=>{this.setState({switchCase:"sent"})}}>Sent Requests</div></div>
      {this.state.switchCase==="incoming"?(<>
      <MapComponent app={app} name="mergeRequest" filter={{search:state.user.getJson().owner, attribute:"owner"}} cells={["sender", {custom: CustomMergeReqListItem, props:{app:app}},  {txt:"accept!"}, {txt:"decline"}]} 
      functions={{cells:[2,3], functions: [
        //accept
        (comp)=>{
          this.accept(comp);
        }, (comp)=>{this.decline(comp)}
        //decline
       ]}}  />
            </>):(<>
              <MapComponent app={app} name="mergeRequest"  filter={{search:state.user.getJson().owner, attribute:"sender"}} cells={["sender",{custom: CustomMergeReqListItem, props:{app:app}},  {txt: "pending..."}, {txt: "cancel"}, ]}  />
      </>)}
      </>
)}
    </div>
    )
  }
}

class TabContent extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;

    return(
    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
      
    </div>
    )
  }
}

/**Popups */
class Popup extends Component{
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.setWrapperRef = this.setWrapperRef;
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
}
componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
}
handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      
       this.props.handleClose();
    }
}
  
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    
    return(
      <div className="popup-box" style={{ zIndex: "1010" }}>
      <div ref={this.wrapperRef}  className="popupCard" style={{ zIndex: "1010", ...styles[this.props.options?.cardType? this.props.options?.cardType:"biggestCard"] }}>
      <div style={ ///EXIT BUTTON
                      styles.buttons.closeicon
                  } onClick={this.props.handleClose}>x</div>
          
          <div className='scroller' style={{...styles[this.props.options?.cardContent? this.props.options.cardContent: "cardContent"]}}>
        <MainContent app={app} />
        </div>
          
      
      </div>



      </div>
    )
  }
}
class PopupWithTab extends Component{
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.setWrapperRef = this.setWrapperRef;
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
}
componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
}
handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
       this.props.handleClose();
    }
}
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;
    
    return(
      <div  className="popup-box" style={{ zIndex: "1010" }}>
      <div ref={this.wrapperRef}  className="popupCard" style={{ zIndex: "1010", ...styles[this.props.options?.cardType? this.props.options?.cardType:"biggestCard"]  }}>
      
      <div style={{...styles[this.props.options?.tabType?this.props.options?.tabType: "colorTab1"]}}> <TabContent app={app} /> <div style={ ///EXIT BUTTON
                      styles.buttons.closeicon
                  } onClick={this.props.handleClose}>x</div></div>   
      <div className='scroller' style={{...styles[this.props.options?.cardContent? this.props.options.cardContent: "cardContent"]}}>
        <MainContent app={app} />
        </div>
        </div>
        



      </div>
    )
  }
}
  




//********CARDs********/
class Card extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;

    return(
      <div className='scroller'  style={{ ...styles[this.props.type?this.props.type:"biggestCard"] }}>   
            <div style={{...styles[this.props.options?.cardContent? this.props.options.cardContent: "cardContent"]}}>
              <MainContent app={app} />
            </div>
      </div>
    )
  }
}

class CardWithTab extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles =state.styles;

    return(
      <div  style={{...styles[this.props.type?this.props.type:"biggestCard"] }}>   
      <div style={{...styles[this.props.options?.tabType?this.props.options?.tabType: "colorTab1"]}}> <TabContent app={app} /></div>   
      <div style={{...styles[this.props.options?.cardContent? this.props.options.cardContent: "cardContent"]}} className='scroller'>
        <MainContent app={app} />
        </div>
        </div>
    )
  }
}
