import React, { Component } from 'react';


export default class DragnDropMapComponent extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.movementRef= React.createRef();        
        this.handleClick=this.handleClick.bind(this);
        this.onMouseMove=this.onMouseMove.bind(this);
        this.onMouseUp=this.onMouseUp.bind(this);
        this.state={
          position: undefined,
          left:undefined,
          top:undefined,
          isDragging:false
        }

  }
  componentDidMount() {
    
    let app = this.props.props.app;
    let state = app.state;
    document.addEventListener('mousedown', this.handleClick);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp)
    app.dispatch({[this.props.obj.getJson()._id+ "movementRef"]: this.movementRef})


  }
  async componentDidUpdate(){
    if(this.props.props.app.state.dragComplete){
      await this.props.props.app.dispatch({dragComplete:false});
      let app = this.props.props.app;
      let state = app.state;
      app.dispatch({[this.props.obj.getJson()._id+ "movementRef"]: this.movementRef})
    }
  }

componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp);

}


handleClick(event) {
  
    if (this.movementRef && this.movementRef.current.contains(event.target)) {
      
      
        this.setState({position:"absolute", isDragging:true, top:event.y-5, left:event.x-5, zIndex:1000})
    }
}
onMouseMove(e){
  
  if(this.state.isDragging){
    
    this.setState({left:e.x-5, top:e.y-5})
  }
}
async onMouseUp(e){
  if(this.state.isDragging){
    debugger
    this.setState({isDragging:false, left:e.x-5, top:e.y-5});
    let app = this.props.props.app;
    let state = app.state;
    
    let refs = [];
    for(const key in state){
      if(key.includes('movementRef')){
        refs.push({[key.substring(0, key.length-11)]: state[key].current.getBoundingClientRect().top,});
      }
    }
  refs =refs.sort(function(a, b){return(a[Object.keys(a)[0]]-b[Object.keys(b)[0]])});

  for(const key in refs){
    let componentID= Object.keys(refs[key])[0];
    let component = state.componentList.getComponent("tag", componentID);
    component.setCompState({order:parseInt(key)})
  }
  let list =state.componentList.getList("tag")
  await state.opps.cleanPrepareRun({update:list});
  state.componentList.sortSelectedList('tag', "order");
  this.setState({left:undefined, position:undefined, top:undefined})
  app.dispatch({dragComplete:true});
  
  //[this.props.obj.getJson()._id+ "movementRef"]: this.movementRef

    

    // for(const key in refs){
    //   let rect1 = this.movementRef.current.getBoundingClientRect();
    //   let rect2 = refs[key].current.getBoundingClientRect();
    //   if(rect1.top<rect2.top){
    //     this.props.obj.setCompState({order: this.props.obj.getJson().order-1});
    //     let component = state.componentList.getComponent("tag", refIDs[key]);
    //     component.setCompState({order: this.props.obj.getJson().order+1});

    //   }
      
    // }


  }
}


  render() {
    let app = {...this.props.props.app};
    let dispatch = app.dispatch;
    let state = app?.state;
    let componentList = state?.componentList;
    let styles =state.styles;
 
    return (
      <div style={{height:"100px", }} ref={this.wrapperRef} >
        
        <div   ref={this.movementRef} style={{position:this.state.position, left:this.state.left, top:this.state.top,  zIndex:this.state.zIndex}}>{this.props.obj.getJson().name}</div>
        
        {!this.state.isDragging&&(<div style={{display:'flex', flexDirection:"row"}}>
          <div onClick={()=>{state.opps.cleanPrepareRun({del:this.props.obj})}}>delete</div>
          <div style={{cursor:"poitner", marginLeft:"10px"}} onClick={async ()=>{
        await app.setPopup({operate:"update", operation:"cleanPrepare", object:this.props.obj}, "addTag")
      }
        }> edit</div>
          
          </div>)}
        
        </div>

    )
  }
}



