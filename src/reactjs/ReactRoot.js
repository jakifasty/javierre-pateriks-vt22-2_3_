//ReactRoot.js file

import DinnerModel from "../DinnerModel.js";
import App from "../views/app.js";

let proxyModel;
const ReactRoot = {
    data(){
        return {rootModel: new DinnerModel()} ;
    } ,
    render(){
        return <App model={this.rootModel} />;
    },

    // We export the VueRoot model to other packages for lab purposes
    created(){
        proxyModel=this.rootModel;
    },
};

export default ReactRoot;

export {proxyModel};
