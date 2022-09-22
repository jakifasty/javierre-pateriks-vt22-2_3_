//firebaseModel.js file
import firebaseConfig from '/src/firebaseConfig.js';
import DinnerModel from "./DinnerModel.js"
import { searchDishes, getDishDetails } from './dishSource.js';

firebase.initializeApp(firebaseConfig);

//REF is the “root” Firebase path. NN is your TW2_TW3 group number
const REF="dinnerModel35";

//firebase.database().ref(REF+"/test").set("dummy1"); //first dummy test

function updateFirebaseFromModel(model) { //Model --> Persistance

	function observerACB(payload) {

		if(payload){
			if(payload.numberOfGuests){
				firebase.database().ref(REF+"/numberOfGuests").set(payload.numberOfGuests);
			}
			if(payload.setCurrentDish){
				firebase.database().ref(REF+"/setCurrentDish").set(payload.setCurrentDish); //or "setCurrentDish"
			}
			if(payload.dishToAdd && payload.dishToAdd.id){
				firebase.database().ref(REF+"/menuDishes/"+payload.dishToAdd.id).set(payload.dishToAdd);
			}
			if(payload.removeDish && payload.removeDish.id){
				firebase.database().ref(REF+"/menuDishes/"+payload.removeDish.id).set(null);
			}
		}
	}
	model.addObserver(observerACB);
}

function updateModelFromFirebase(model) { //Persistance --> Model

	firebase.database().ref(REF+"/numberOfGuests").on("value", //this "value" is the persistence
		function guestsChangedInFirebaseACB(firebaseData){ 
			model.setNumberOfGuests(firebaseData.val());
		});

	firebase.database().ref(REF+"/setCurrentDish").on("value",
		function cdChangedInFirebaseACB(firebaseData) {
			model.setCurrentDish(firebaseData.val());
		});

	firebase.database().ref(REF+"/menuDishes").on("child_added", //or "on"
		function dishesChangedInFirebaseACB(firebaseData){
			function hasSameIdCB(dish) {
				return +firebaseData.key == dish.id;
			}
			let hasDish = [];
			hasDish = model.dishes.filter(hasSameIdCB);
			if(hasDish.length == 0){
				getDishDetails(+firebaseData.key).then(function addToMenuACB(dish){model.addToMenu(dish)})
			}
		}
	);
	firebase.database().ref(REF+"/menuDishes").on("child_removed",
		function dishesChangedInFirebaseACB(firebaseData) {
			model.removeFromMenu(+firebaseData.key);
		});
}	

function firebaseModelPromise() { //initial persistance promise
	function bigPromiseToMakeACB(firebaseData){
		function modelToCreateCB(dishes) {
			let numberOfGuests;
			try{
				numberOfGuests = firebaseData.val().numberOfGuests? firebaseData.val().numberOfGuests : 2;
			}catch(e){
				console.log(e)
			}
			return new DinnerModel(numberOfGuests, dishes);
		}
		function dishPromiseToMakeCB(dishId) {
			return getDishDetails(dishId);
		}

		let mD = [];
		try{
			mD = firebaseData.val().menuDishes? firebaseData.val().menuDishes : [];
		}catch(e){
			console.log(e) //throw "not found value for firebaseData.";
		}
		const dishPromiseArray = Object.keys(mD).map(dishPromiseToMakeCB);
		return Promise.all(dishPromiseArray).then(modelToCreateCB);

		/*if(!firebaseData.val().menuDishes){
			const dishPromiseArray = Object.keys(firebaseData.val().menuDishes).map(dishPromiseToMakeACB);
			return Promise.all(dishPromiseArray).then(modelToCreateACB)
		}
		else{
			return new DinnerModel();
		}*/
		
	}
	return firebase.database().ref(REF).once("value").then(bigPromiseToMakeACB);
}

export {updateFirebaseFromModel, updateModelFromFirebase, firebaseModelPromise};