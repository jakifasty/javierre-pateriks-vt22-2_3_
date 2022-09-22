//summaryPresenter.js React

import SummaryView from "../views/summaryView.js"
import {shoppingList} from "../utilities"

export default
function Summary(props){
	const [, setNumberOfGuests] = React.useState(null); //Custom components render and re-render by executing a function
	const [, setDishes] = React.useState(null); //Custom components render and re-render by executing a function

	function observerACB(){ //call observer for the two props 
		setNumberOfGuests(props.model.numberOfGuests);
		setDishes(props.model.dishes);
	}

	function observerWasCreatedACB(){
		observerACB();
		props.model.addObserver(observerACB);
		
		return function isPutDownACB(){
			props.model.removeObserver(observerACB);
		}
	}
	React.useEffect(observerWasCreatedACB, []); //callback checklist

	return <SummaryView people={props.model.numberOfGuests} ingredients={shoppingList(props.model.dishes)}/>;

}