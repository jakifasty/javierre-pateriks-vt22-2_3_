//searchPresenter.js React file
import SearchFormView from "../views/searchFormView.js"
import SearchResultsView from "../views/searchResultsView.js"
import promiseNoData from "../views/promiseNoData.js"
import {knownTypes} from "../utilities"
import {searchDishes, getDishDetails} from "../dishSource.js"
import React from "react"
import {useState, useEffect} from 'react'

export default
function Search(props){ //React state hook, i.e. React Steteful Component

    //initialize state hook
    //declare constants to be used, i.e. [value, setter] = React.useState(initialValue); 
    const [promise, setPromise] = React.useState(); //rerendering and initializing undefined component creation state
    const [qr, setSearchQuery] = React.useState(""); //rerendering and initializing of component creation state
    const [ty, setSearchType] = React.useState(""); //rerendering and initializing of component creation state
    const [data, setData] = React.useState([]); //rerendering and initializing of component creation state
    const [err, setError] = React.useState([]); //rerendering and initializing of component creation state 


    function wasCreatedACB(){
        setPromise(searchDishes({})); //query: setSearchQuery, type: setSearchQuery //promise.then(setData).catch(setError)
    }
    React.useEffect(wasCreatedACB, []); //we copy the properties of the Model to the Component state

    function promiseIsChangedACB(){

        setData(null)   ;
        setError(null);
        let itIsCancelled = false;

        function changedBackACB(){ //
            itIsCancelled = true;
        }

        function savingDataACB(data){
            if(!itIsCancelled)
                setData(data);
        }

        function savingErrorACB(error){
            if(!itIsCancelled)
                setError(error);
        }

        if(promise)
            promise.then(savingDataACB).catch(savingErrorACB);
        return changedBackACB;
    }
    React.useEffect(promiseIsChangedACB, [promise]); //derived state of a React component

    function clickButtonACB(){ //search on click button
        setPromise(searchDishes({query: qr, type: ty}));
        //props.model.doSearch(props.model.searchParams);
    }

    function inputOnChangeACB(qr){ //to look up for a specific dish when inputing a string (1st element)
        setSearchQuery(qr); //setter for query
    }

    function setTypeOnSearchACB(ty){ //set choices from the TypeDish menu
        setSearchType(ty); //setter for type
    }

    function changeDishOnClickACB(dish){ //to look up for another specific dish when inputing a string (1st element)
        //console.log("inside changeDishOnClickACB");
        props.model.setCurrentDish(dish.id);
    }

    //if(!props.model.searchResultsPromiseState.promise){props.model.doSearch({query: "foo", type: "bar"});}
    return (<div>
                <SearchFormView inputOnChange={inputOnChangeACB} typeOnChange={setTypeOnSearchACB} onSearch={clickButtonACB} dishTypeOptions={knownTypes}/>
                {promiseNoData({promise: promise, data: data, error: err}) || <SearchResultsView searchResults={data} chooseDish={changeDishOnClickACB}/>}
            </div>
    );
}