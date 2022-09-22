/*
   This component uses Vue-specific and React-specific presenters: Sidebar, Summary, Search, Details, Show
   Therefore it needs to import from alternative paths, depending on the framework.
   To achieve that, we use require() with a prefix, instead of import.
*/
const PREFIX = window.location.toString().includes("react")?"reactjs":"vuejs";

const Summary = require("../"+PREFIX+"/summaryPresenter.js").default;
const Sidebar = require("../"+PREFIX+"/sidebarPresenter.js").default;
const Search = require("../"+PREFIX+"/searchPresenter.js").default;
const Details = require("../"+PREFIX+"/detailsPresenter.js").default;
const Show = require("../"+"reactjs"+"/show.js").default;

/*import Summary from "../reactjs/summaryPresenter.js";
import Sidebar from "../reactjs/sidebarPresenter.js";
import Search from "../reactjs/searchPresenter.js";
import Details from "../reactjs/detailsPresenter.js";
import Show from "../reactjs/show.js"*/
//const Show = require("../"+"reactjs"+"/show.js").default;
window.location.hash = "search"

export default
function App(props){
    return (<div className="flexParent">
                <span className="sidebarColumn-left">
                    {<Sidebar model={props.model}/>}
                </span>
                <span className="mainContent">
                    <Show hash="#search">{<Search model={props.model}/>}</Show>
                    <Show hash="#details">{<Details model={props.model}/>}</Show>
                    <Show hash="#summary">{<Summary model={props.model}/>}</Show>
                </span>
            </div>
    );
}
