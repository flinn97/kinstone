import { Component } from 'react';
import "../App.css"
import ParentFormComponent from '../componentListNPM/componentForms/parentFormComponent';
import FormWithUpdateAndRun from '../componentListNPM/componentForms/buttons/formWithUpdateAndRun';
import Notes from '../componentListNPM/componentForms/fullForms/notes';
import MapComponent from '../componentListNPM/mapTech/mapComponent';
import CRM from './crm';
import Grind from './dailyGrind';

// import mummy from "../pics/runesTest1/2red.png";
// import kinstone from "../pics/runesTest1/1red.png";

export default class Daily extends Component {
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
      
        <Grind app={app} />
      </div>
    )

  }
}

/**
 *  <div style={{width:"100vw", height:"100vh", display:"flex", flexDirection:"row"}} >
        <div style={{width:"250px"}}>
          Elements  
       <MapComponent app={app} name="element" cells={[{img:"picURL", imgStyle:{width:"100px", height:"100px", borderRadius:"50%"}}, "title", ]} innerCellStyle={{cursor:"pointer"}} 
       functions={{cells:[0,1], functions:[(component)=>{
        
        let list = componentList.getList("chosenElement");
        if(list.length<3){
          opps.cleanJsonPrepareRun({addchosenElement:{...component.getJson(), type:"chosenElement"}})

        }
        }]}}/></div>
<div style={{width:"250px"}}> 
  <div >
  Chosen Elements
<MapComponent app={app} name="chosenElement" cells={[{img:"picURL", imgStyle:{width:"100px", height:"100px", borderRadius:"50%"}}, "title", ]}  />
{componentList.getList("chosenElement").length===3&&(
  <div onClick={()=>{
    let word = "";
    for(let el of componentList.getList("chosenElement")){
      word+=el.getJson().title + " "
    }
    componentList.clearSelectedList("chosenElement", "type");
    opps.cleanJsonPrepareRun({addkinstoneComponent:{title:word, picURL:mummy}})
    
  }}
   style={{cursor:"pointer", backgroundColor:"purple", marginTop:'10px', color:"white", borderRadius:"7px", width:"120px", height:"40px", display:"flex", alignItems:"center", justifyContent:"center" }}>merge elements</div>)
}
</div>


</div>

<div style={{width:"400px"}}>
  Kinstone Half
<MapComponent app={app} name="kinstoneComponent" cells={[{img:"picURL", imgStyle:{width:"100px", height:"100px", borderRadius:"50%"}}, "title", ]}  functions={{cells:[0,1], functions:[(component)=>{
        
       
          opps.cleanJsonPrepareRun({addchosenKinstoneComponent:{...component.getJson(), type:"chosenKinstoneComponent"}})

        
        }]}}/>
        </div>
        <div style={{width:"400px"}}>
        Chosen Kinstone Half
        <div>
<MapComponent app={app} name="chosenKinstoneComponent" cells={[{img:"picURL", imgStyle:{width:"100px", height:"100px", borderRadius:"50%"}}, "title", ]}/>
</div>
        
        {componentList.getList("chosenKinstoneComponent").length===2&&(
  <div onClick={()=>{
    let word = "";
    for(let el of componentList.getList("chosenKinstoneComponent")){
      word+=el.getJson().title + " "
    }
    componentList.clearSelectedList("chosenKinstoneComponent", "type");
    
    opps.cleanJsonPrepareRun({addkinstone:{title:word, picURL:kinstone}})
    
  }}
   style={{cursor:"pointer", backgroundColor:"purple", marginTop:'10px', color:"white", borderRadius:"7px", width:"120px", height:"40px", display:"flex", alignItems:"center", justifyContent:"center" }}>merge Kinstones</div>)
}</div>
<div>
  Kinstone
<MapComponent app={app} name="kinstone" cells={[{img:"picURL", imgStyle:{width:"100px", height:"100px", borderRadius:"50%"}}, "title", ]}/>
</div>
        </div>
 */