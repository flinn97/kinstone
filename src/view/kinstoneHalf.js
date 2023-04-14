import React, { Component } from 'react';
import "../App.css"
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import FormWithUpdateAndRun from '../componentListNPM/componentForms/buttons/formWithUpdateAndRun';
import mummy from "../pics/runesTest1/2red.png";
import kinstone from "../pics/runesTest1/1red.png";
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
export default class KinstoneHalf extends Component {
  constructor(props) {
    super(props);


  }

  /**
   * 
   * OPTIONS
   */


  render() {
    let app = { ...this.props.app };
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;


    if (this.props.theme) {
      if (Object.prototype.toString.call(this.props.theme) === "[object String]") {
        styles = state.themeFactory.getThemeFactory()[this.props.theme];
      }
      else {
        styles = this.props.theme;
      }
    }
    app.state.styles = styles





    //********CARD ASSIGN********/

    let cards = {

      card: <Card app={{ ...app, state: { ...app.state, styles: styles } }} options={this.props.options} type={this.props.type} />,
      cardWithTab: <CardWithTab app={{ ...app, state: { ...app.state, styles: styles } }} options={this.props.options} type={this.props.type} />,
      popup: <Popup app={{ ...app, state: { ...app.state, styles: styles } }} handleClose={this.props.handleClose} options={this.props.options} type={this.props.type} />,
      popupWithTab: <PopupWithTab app={{ ...app, state: { ...app.state, styles: styles } }} handleClose={this.props.handleClose} options={this.props.options} type={this.props.type} />
      //popupType={this.props.popupType} popupTab={this.props.popupTab}

    }

    //*********CARD ASSIGN********/





    return (
      <div >

        {cards[this.props.type ? this.props.type : "card"]}
      </div>

    )
  }
}



//********CONTENTS********/
class MainContent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;
    let opps = state.opps

    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: "400px" }}>
          Kinstone Half
          <MapComponent app={app} name="kinstoneComponent" filter={{ search: state.user.getJson()._id, attribute: "owner" }} cells={[{ img: "picURL", imgStyle: { width: "100px", height: "100px", borderRadius: "50%" } }, "title",]} functions={{
            cells: [0, 1], functions: [(component) => {

              if (componentList.getList("chosenKinstoneComponent").length === 0) {
                opps.cleanJsonPrepareRun({ addchosenKinstoneComponent: { ...component.getJson(), type: "chosenKinstoneComponent", _id: Math.random(Math.floor() * 100000).toString(), ogKinstoneHalf:component.getJson()._id, ogOwner: component.getJson().owner } })

              }


            }]
          }} />
        </div>
        <div style={{ width: "400px" }}>
          Chosen Kinstone Half
          <div style={{ backgroundColor: "purple" }}>

            <MapComponent app={app} name="chosenKinstoneComponent" cells={[{ img: "picURL", imgStyle: { width: "100px", height: "100px", borderRadius: "50%" } }, "title", "delete"]} />
            {componentList.getList("chosenKinstoneComponent").length === 2 && (
            <div onClick={async () => {
              debugger
              let list = componentList.getList("chosenKinstoneComponent")
              let userKinstone = undefined;
              let friendKinstone = undefined;
              for(let kinstone of list){
                if(kinstone.getJson().ogOwner === state.user.getJson()._id){
                  userKinstone = kinstone
                }
                else{
                  friendKinstone = kinstone
                }
                
              }
              // let word = "";
              // for (let el of componentList.getList("chosenKinstoneComponent")) {
              //   word += el.getJson().title + " "
              // }
              // componentList.clearSelectedList("chosenKinstoneComponent", "type");

              // await opps.cleanJsonPrepareRun({ addkinstone: { title: word, picURL: kinstone } })
              // opps.prepareRun({ del: componentList.getList("chozenKinstoneComponent") })
              await opps.cleanJsonPrepareRun({ addmergeRequest: {_id: Math.random(Math.floor() * 100000).toString(), owner: friendKinstone.getJson().ogOwner, friendOgKinstoneID: friendKinstone.getJson().ogKinstoneHalf, sender: state.user.getJson()._id, kinstoneHalfid: friendKinstone.getJson()._id, senderKinstoneHalfid:userKinstone.getJson()._id }})
              userKinstone.setCompState({type:"mergeRequestKinstoneHalf"});
              friendKinstone.setCompState({type:"mergeRequestKinstoneHalf"});
              let ogKinstoneHalf = componentList.getComponent("kinstoneComponent", userKinstone.ogKinstoneHalf);
              ogKinstoneHalf.setCompState({type:"mergeRequestKinstoneHalf"});

              await opps.cleanPrepareRun({update:[userKinstone, friendKinstone, ogKinstoneHalf]});
              componentList.setComponentsList();
              dispatch({});
            }}
              style={{ cursor: "pointer", backgroundColor: "green", marginTop: '10px', color: "white", borderRadius: "7px", width: "120px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>Send Merge Request</div>)
          }
          </div>
          <div style={{ backgroundColor: "teal", height: "100px" }} className="scroller">
            <MapComponent app={app} name="friend" cells={["email"]} functions={{
              cells: [0], functions: [async (comp) => {
                debugger
                await auth.getFriendKinstoneHalf(comp.getJson().email, componentList);
                dispatch({selectedFriend:comp});
              }]
            }} />
           
          </div>
          {state.selectedFriend!==undefined&&(
          <div style={{ backgroundColor: "teal", height: "1000px" }} className="scroller">
          
            <MapComponent app={app} name="kinstoneComponent" filter={{search:state.selectedFriend?.getJson().email, attribute:"owner"}} cells={[{ img: "picURL", imgStyle: { width: "100px", height: "100px", borderRadius: "50%" } }, "title",]} functions={{
              cells: [0], functions: [async (component) => {
                if(componentList.getList("chosenKinstoneComponent").length === 1){
                  opps.cleanJsonPrepareRun({ addchosenKinstoneComponent: { ...component.getJson(), type: "chosenKinstoneComponent", _id: Math.random(Math.floor() * 100000).toString(), ogKinstoneHalf: component.getJson()._id, ogOwner:component.getJson().owner, owner:state.user.getJson()._id } })

                }

              }]
            }} />
</div>)}

          </div>




      </div>
    )
  }
}

class TabContent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

      </div>
    )
  }
}

/**Popups */
class Popup extends Component {
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

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div className="popup-box" style={{ zIndex: "1010" }}>
        <div ref={this.wrapperRef} className="popupCard" style={{ zIndex: "1010", ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCard"] }}>
          <div style={ ///EXIT BUTTON
            styles.buttons.closeicon
          } onClick={this.props.handleClose}>x</div>

          <div className='scroller' style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
            <MainContent app={app} />
          </div>


        </div>



      </div>
    )
  }
}
class PopupWithTab extends Component {
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
  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div className="popup-box" style={{ zIndex: "1010" }}>
        <div ref={this.wrapperRef} className="popupCard" style={{ zIndex: "1010", ...styles[this.props.options?.cardType ? this.props.options?.cardType : "biggestCard"] }}>

          <div style={{ ...styles[this.props.options?.tabType ? this.props.options?.tabType : "colorTab1"] }}> <TabContent app={app} /> <div style={ ///EXIT BUTTON
            styles.buttons.closeicon
          } onClick={this.props.handleClose}>x</div></div>
          <div className='scroller' style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
            <MainContent app={app} />
          </div>
        </div>




      </div>
    )
  }
}





//********CARDs********/
class Card extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div className='scroller' style={{ ...styles[this.props?.options.cardType ? this.props?.options.cardType : "biggestCard"] }}>
        <div style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }}>
          <MainContent app={app} />
        </div>
      </div>
    )
  }
}

class CardWithTab extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let state = app.state;
    let componentList = state.componentList;
    let styles = state.styles;

    return (
      <div style={{ ...styles[this.props.type ? this.props.type : "biggestCard"] }}>
        <div style={{ ...styles[this.props.options?.tabType ? this.props.options?.tabType : "colorTab1"] }}> <TabContent app={app} /></div>
        <div style={{ ...styles[this.props.options?.cardContent ? this.props.options.cardContent : "cardContent"] }} className='scroller'>
          <MainContent app={app} />
        </div>
      </div>
    )
  }
}
