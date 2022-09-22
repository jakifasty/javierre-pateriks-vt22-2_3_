//searchPresenter.js Vue file
import SearchFormView from "../views/searchFormView.js"
import SearchResultsView from "../views/searchResultsView.js"
import promiseNoData from "../views/promiseNoData.js"
import {shoppingList, knownTypes} from "../utilities.js"
import {searchDishes, getDishDetails} from "../dishSource.js"


export default
function SearchFormViewRender(props){

    function clickButtonACB(){ //search on click button
        props.model.doSearch(props.model.searchParams);
    }

    function inputOnChangeACB(inputString){ //to look up for a specific dish when inputing a string (1st element)
        props.model.setSearchQuery(inputString);
    }

    function setTypeOnSearchACB(value){ //set choices from the TypeDish menu
        props.model.setSearchType(value);
        //props.model.setSearchType(knownTypes[2]);
    }

    function changeDishOnClickACB(dish){ //to look up for another specific dish when inputing a string (1st element)
        props.model.setCurrentDish(dish.id);
    }

    if(!props.model.searchResultsPromiseState.promise) {props.model.doSearch({promise: "foo", data: "bar"});}
    return  <div>
                <SearchFormView dishTypeOptions={knownTypes} onSearch={clickButtonACB} inputOnChange={inputOnChangeACB} typeOnChange={setTypeOnSearchACB} />
                {promiseNoData(props.model.searchResultsPromiseState) || 
                <SearchResultsView searchResults = {props.model.searchResultsPromiseState.data} chooseDish={changeDishOnClickACB}/>}
            </div>
}