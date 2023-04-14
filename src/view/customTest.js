import React, { Component } from 'react';


export default class CustomTest extends Component {
  constructor(props) {
    super(props);
    

  }



  render() {
    let app = {...this.props.props.app};
    let dispatch = app.dispatch;
    let state = app?.state;
    let componentList = state?.componentList;
    let styles =state.styles;
 
    return (
      <div style={{width:"40px",  borderTop:state.switchcase===this.props.obj.getJson().name&& "1px solid black", display:"flex", alignItems:'center', justifyContent:"center" }} >
        
        <p style={{fontSize:"20px", color:state.switchcase===this.props.obj.getJson().name?"purple":"black"}}>{componentList.getList("person", this.props.obj.getJson().name, "tag").length}</p>
        </div>

    )
  }
}



