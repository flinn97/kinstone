import './App.css';
import { Component } from 'react';
import Dispatch from './dispatch.js';
import { forFactory } from './models/myComponents';
import ComponentListInterface from './componentListNPM/componentListInterface';
import auth from './services/auth';
import ThemeFactory from './componentListNPM/themes/themeFactory';
import Home from './view/home';
import ManageTags from './view/manageTags';
// icons
import calendarIcon from './icons/calendar.svg';
import chatIcon from './icons/chat.svg';
import dashboardIcon from './icons/dashboard.svg';
import studentIcon from './icons/students.svg';
import navThemeFactory from './componentListNPM/navThemes/navThemeFactory';
import OpenAIPage from './view/openAIPage';
import Daily from './view/daily';
import Friend from './view/friend';
// import NavThemeFactory from './componentListNPM/navThemes/navThemeFactory';

//fonts


//model
export default class App extends Component {
  constructor(props){
    super(props);
        this.handleChange=this.handleChange.bind(this);
        this.dispatch=this.dispatch.bind(this);
        this.setPopup= this.setPopup.bind(this);

    this.state={
      start: false,
      styles: undefined,
      phoneUIChange: 500,
      ipadUIChange: 1000,
      loginPage: true,
      registerPage:false,
      user: undefined,
      componentListInterface: new ComponentListInterface(this.dispatch),
      componentList: undefined,
      currentCharacter: undefined,
      opps: undefined,
      themeFactory: new ThemeFactory(),
      // navFactory: new NavThemeFactory(),
      navType: "topBar",
      
      switchcase: "Not Started",
      refs:[],
      
      login : true,
      operate: undefined,
      operation: "cleanJsonPrepare",
      object: undefined,
      currentComponent: undefined,
      backend: false,
      backendUpdate: undefined,
      currentComponents: [],
      backendUpdate:[],
      login:false,
      backend: false,
      myswitch: "home",
      defaultTheme: "default",
      globalTheme: "",
      switchCase:[
        {path:"/", comp:Home, name: "Home", linkIcon:dashboardIcon, }, 
        {path:"/friends", comp:Friend, name: "Friends", linkIcon:dashboardIcon, },//icon: "home.svg"   linkIcon:Cel, notification:2, notifyTheme:"flinnApps"
        // {path:"/managetags", comp:ManageTags, name: "Manage Tags", linkIcon:studentIcon, }, //icon: "home.svg"   linkIcon:Cel, notification:2, notifyTheme:"flinnApps"
        // {path:"/dailygrind", comp:Daily, name:"Daily Grind", linkIcon:calendarIcon}

        // {path:"/", comp:CardsPrac, name: "Product 1", linkIcon:dashboardIcon, notification:2, linkSection: 2}, //icon: "home.svg"   linkIcon:Cel, notification:2, notifyTheme:"flinnApps"
        // {path: "/popups", comp:PopupPrac, name: "Product 2", linkIcon:studentIcon, linkSection: 2},
        // {path:"/nav", comp:NavPrac, name: "Product 3", linkIcon:calendarIcon, linkSection: 2},
        // {path:"/chat", comp:ChatPage, name: "Product 4", linkIcon:chatIcon, linkSection: 2}

        // {path:"/", comp:CardsPrac, name: "Cards"}, //icon: "home.svg"   linkIcon:Cel, notification:2, notifyTheme:"flinnApps"
        // {path: "/popups", comp:PopupPrac, name: "Popups"},
        // {path:"/nav", comp:NavPrac, name: "NavBar"},
        // {path:"/chat", comp:ChatPage, name: "Chat"}
      ]

    }
  }

  async componentDidUpdate(props, state){
    if(this.state.updateRun){
      this.setState({popupSwitch:"", currentComponent:undefined, updateRun:undefined, checkComplete:false})
    }
    if(this.state.formUpdate){
      let update = this.state.formUpdate
      await this.setState({formUpdate:false});
      if(update==="checkbox"){

    }
    }
    if(this.state.backend){
      debugger
      await this.setState({backend: false});
      auth.dispatch(this.state.backendUpdate, this.state.user.getJson()._id);
      
      //   await this.state.componentList.sortSelectedList("tag", "order");
      //   this.setState({})
      
    }
    
    if(this.state.operate!==undefined){
      let operate = this.state.operate;
      let operation= this.state.operation;
      let object= this.state.object;
      await this.setState({operate:undefined, object:undefined, operation:"cleanJsonPrepare"});

      
      let currentComponent = await this.state.componentListInterface.getOperationsFactory().operationsFactoryListener({operate: operate, object:object, operation: operation});
      
      
      let key = await this.state.componentListInterface.getOperationsFactory().getSplice(operate);
      if(currentComponent!==undefined){
        this.setState({currentComponent: currentComponent[key][0]});
      }
    }

    
    
    

  }

  async dispatch(obj){

    await this.setState(obj)
}

handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
        [name]: value,
    })
}

  async componentDidMount(){
    // if(this.state.navFactory){
    //   let f = this.state.navFactory.getNavThemeFactory();
    //   let styles = f["defaultSideNav"];
      
    //   this.setState({navStyles:styles, linkStyleDefault: styles.link});

    // }
  
    if(this.state.themeFactory){
      
      let f = await this.state.themeFactory.getThemeFactory();
      let style = this.state.globalTheme!==""? this.state.globalTheme: this.state.defaultTheme!==""? this.state.defaultTheme: "default"
      let styles = f[style];
      
      this.setState({styles:styles, start:true});
    }
    window.addEventListener("resize", async ()=>{
      let themeFactory = new ThemeFactory();
      let f = await themeFactory.getThemeFactory();
      let style = this.state.globalTheme!==""? this.state.globalTheme: this.state.defaultTheme!==""? this.state.defaultTheme: "default"
      let styles = f[style];
      // if(window.innerWidth<=500){
        navThemeFactory.reloadComponents()
      // }
      
      this.setState({styles:styles, start:true});
    })
    let list;
    if(this.state.componentListInterface && this.state.componentList===undefined){
        list= await this.state.componentListInterface.createComponentList();
        
        await this.setState({
          componentList:list,
          opps: list.getOperationsFactory()
        })
        
        
        let obj = await forFactory();
        for(const key in obj){
          
         await this.state.componentListInterface.getFactory().registerComponents({name:key, component:obj[key]});
        }
        await auth.getKinstoneMaterial(list)

        // await auth.createInitialStages(list);
        debugger
        let user = await auth.getCurrentUser();
        if(user){
          user = JSON.parse(user);
          let email = user.email
          await auth.getuser(user.email, list, this.dispatch);
          await auth.getFriendRequests(email, list, this.dispatch);
          
        //   let changelist = list.getList("tag");
        
          
        //   let startingTag = changelist[0].getJson().name;
        //   this.setState({switchcase:startingTag});
          
        }

        
        
    }

  
    
    
    
  }
  async setPopup(obj, popupSwitch){
    debugger
    await this.dispatch({currentComponent:undefined})
    await this.dispatch(obj);
    await this.dispatch({popupSwitch:popupSwitch})
  }

  //ENTIRE view
  render(){
    let styles = this.state.styles;
  return (
    <div style={{
      width:"100vw", 
      height:"100vh", 
      display:"flex", 
      zIndex:"100",
      flexDirection:"column"}}>
      
      {this.state.start && <Dispatch app={{run:this.run, state:this.state, setPopup:this.setPopup, handlechange:this.handleChange, dispatch:this.dispatch, factory:this.factory}} />}

    </div>
  )}
}
