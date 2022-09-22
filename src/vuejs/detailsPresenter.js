//detailsPresenter.js file
import DinnerModel from "../DinnerModel.js"
import DetailsView from "../views/detailsView.js"
import promiseNoData from "../views/promiseNoData.js"

export default
function Details(props){

	function sameidCB(dishToCompare) { //this is a CB function
		if(props.model.currentDish === dishToCompare.id) 
			return true;
		else
			return false;
	}

	function addToMenuACB(){
		props.model.addToMenu(props.model.currentDishPromiseState.data);
		window.location.hash="search" //correct ??
	}

	function toCancelACB() {
		window.location.hash = "search"
	}

	return (promiseNoData(props.model.currentDishPromiseState) || <DetailsView dishData={props.model.currentDishPromiseState.data} //dishData, isDIshInMenu and guests are props
			isDishInMenu={props.model.dishes.filter(sameidCB).length>0} guests={props.model.numberOfGuests} onAddToMenu={addToMenuACB}/>) //addToMenu is a custom event
}
