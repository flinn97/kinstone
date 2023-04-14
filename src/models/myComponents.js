import BaseClass from "../componentListNPM/baseClass";
import authService from "../services/auth.js";
import moment from 'moment';
class componentBase extends BaseClass {
    constructor(opps) {
        super(opps);

    }
    json;
    startobj = {
        date: "",
        _id: "",
        description: "",
        title: "",
        owner: "",
        user: "",
        type: "",

        collection: "",
    }

    userInfo = {
        about: "",
        picURL: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        phone: "",
        role: "",
        date: "",
        pics: "",

        collection: ""
    }





}



class Kinstone extends componentBase {

    json = {
        ...this.startobj,
        type: "kinstone",
        picURL: "",
        picURLs: {},


    }



}
class Element extends componentBase {

    json = {
        ...this.startobj,
        type: "element",
        picURL: "",
        picURLs: {},


    }



}

class KinstoneComponent extends componentBase {

    json = {
        ...this.startobj,
        type: "kinstoneComponent",
        picURL: "",
        picURLs: {},
        requests:[]


    }



}
class CrowningJewel extends componentBase {

    json = {
        ...this.startobj,
        type: "crowningJewel",
        picURL: "",
        picURLs: {},


    }



}


class UserThings extends componentBase {
    constructor(opps) {
        super(opps);

    }
    json = {
        ...this.userInfo,
        type: "user",
        signUpDate: moment().format('L'),
        friends: {}
    }



}


class FriendRequest extends componentBase {
    json = {
        type: "friendRequest",
        requester: "",
        reciever: ""
    }

}

class Friend extends componentBase {
    json = {
        type:"friend",
        email:"",
    }
}

class MergeRequest extends componentBase {
    json = {
        type:"mergeRequest",
        owner: "",
        sender: "",
        kinstoneHalfid: "",
        senderKinstoneHalfid: "",

    }
}
function forFactory() {
    return { user: UserThings, kinstone: Kinstone, kinstoneComponent: KinstoneComponent, element: Element, chosenElement: Element, friend:Friend, friendRequest: FriendRequest, mergeRequest: MergeRequest, chosenKinstoneComponent: KinstoneComponent, mergeRequestKinstoneHalf:KinstoneComponent, crowningJewel: CrowningJewel, chosenKinstone: Kinstone }
}


export { forFactory }
//kinstone: Kinstone, kinstoneComponent: KinstoneComponent,element: Element, chosenElement:Element, chosenKinstoneComponent:KinstoneComponent  \
/**
 * class Kinstone extends componentBase{
    
    json={
        ...this.startobj,
        type:"kinstone",
        picURL: "",
        picURLs: {},
        

    }
    
    

}
class Element extends componentBase{
    
    json={
        ...this.startobj,
        type:"element",
        picURL: "",
        picURLs: {},
        

    }
    
    

}

class KinstoneComponent extends componentBase{
    
    json={
        ...this.startobj,
        type:"kinstoneComponent",
        picURL: "",
        picURLs: {},
        

    }
    
    

}
 */