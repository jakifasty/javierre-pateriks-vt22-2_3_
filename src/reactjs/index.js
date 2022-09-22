//index.js file
// this is a stub for TW3.5 bootstraping. It helps with a few lab specifics
import React from "react";
import {render, h} from "react-dom";
const X = TEST_PREFIX;

// needed for View JSX. In a Vue project you can use import {h} from "vue"
window.React = React;

import firebase from "firebase/app"; 
import "firebase/database"; //import database of the Firebase
window.firebase = firebase;

const {updateFirebaseFromModel, updateModelFromFirebase, firebaseModelPromise} = require("../firebaseModel.js");

// require() because the lab App loads React/Vue presenters
const App=require("/src/views/app.js").default;

// import DinnerModel, needed for the navigation of the menu
import DinnerModel from "../DinnerModel.js";
// import promiseNoData, you will need it during resolve of firebaseModelPromise
import promiseNoData from "../views/promiseNoData.js"

// render a ReactRoot that resolves firebaseModelPromise, then displays the App (see tw/tw3.5-react.js)
let firebaseModel;
const bigPromise= firebaseModelPromise();

try{
    firebaseModel=require("/src/"+X+"firebaseModel.js");
    if(!firebaseModel.updateFirebaseFromModel)
        throw "not found";
    require("/src/views/"+X+"navigation.js");
}catch(e){
    render(<div>
             Please write /src/firebaseModel.js and updateFirebaseFromModel
           </div>, document.getElementById('root'));
}
if(firebaseModel && firebaseModel.updateFirebaseFromModel){
    const {updateFirebaseFromModel, updateModelFromFirebase} = firebaseModel;
    function ReactRoot(){
        const [model, setModel] = React.useState(new DinnerModel());
        

        React.useEffect(function onStartACB(){
            bigPromise.then(
                function initModelACB(data){
                    setModel(data);
                    updateFirebaseFromModel(data); //this call will be syncronous inside this acb
                    updateModelFromFirebase(data); //this call will be syncronous inside this acb 
                }).catch(
                        function errACB(data){
                            console.log(data);
                        }
                    )

        }, []);
        return  <App model={model}/>;
    }

    render(
        <ReactRoot/>,
        document.getElementById('root')
    );
}