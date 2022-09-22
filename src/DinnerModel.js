import resolvePromise from "./resolvePromise.js";
import {searchDishes, getDishDetails} from "./dishSource.js";
import {isDishInMenu} from "./utilities.js"
    
function isValid(id){
  return (typeof(id) == "number")
}

class DinnerModel{
    constructor(nrGuests=2, dishArray=[], currentDish){
        this.observers = []; //empty array
        this.setNumberOfGuests(nrGuests);
        this.dishes = dishArray;

        this.currentDishPromiseState = {};
        this.searchResultsPromiseState = {} ; //(property). DinnerModel constructor, set model properties to empty objects
        this.searchParams = {}; //{query: "", type: ""}
    }
    setNumberOfGuests(nr){
        if(Number.isInteger(nr) & nr>0){
            if (!(this.numberOfGuests === nr)){
                this.numberOfGuests = nr;
                this.notifyObservers({numberOfGuests: nr}) //first the key (numberOfGuests) and then the value
            }
        }else {
            throw new Error ('number of guests not a positive integer');
        }

        // throw an error if the argument is smaller than 1 or not an integer
        // the error message must be exactly "number of guests not a positive integer"
        // to check for integer: test at the console Number.isInteger(3.14)

        // if the argument is a valid number of guests, store it in this.numberOfGuests

        // when this is done the TW1.1 DinnerModel "can set the number of guests" should pass
        // also "number of guests is a positive integer"
    }
    
    addToMenu(addDish){ //this is an example of payload
        // array spread syntax example. Make sure you understand the code below.
        // It sets this.dishes to a new array [   ] where we spread (...) the previous value
        /*if(!isDishInMenu(this.dishes, addDish.id)){
            this.dishes = [...this.dishes, addDish];
            this.notifyObservers({addDish: addDish});
        }*/

        function hasSameIdCB(dish){
          return addDish.id === dish.id;
            // return true if the id property of dish is _different_ from the dishToRemove's id property
            // This will keep the dish when we filter below.
            // That is, we will not keep the dish that has the same id as dishToRemove (if any)
        }
        let hasDish = [];
        hasDish = this.dishes.filter(hasSameIdCB);
        if(hasDish.length == 0){
          this.dishes= [...this.dishes, addDish];
          this.notifyObservers({dishToAdd: addDish});
        }
    }

    removeFromMenu(dishToRemove){
        // callback exercise! Also return keyword exercise
        function hasSameIdCB(dish){
            return dishToRemove.id !== dish.id;
            // return true if the id property of dish is _different_ from the dishToRemove's id property
            // This will keep the dish when we filter below.
            // That is, we will not keep the dish that has the same id as dishToRemove (if any)
        }
        let toRemove = []
        toRemove = this.dishes.filter(hasSameIdCB);

        /*if(toRemove.length == 0){
            
        }else{
            this.dishes= this.dishes.filter(hasSameIdCB);
            this.notifyObservers({removeDish: dishToRemove});
        }*/

        if(isDishInMenu(this.dishes, dishToRemove.id)){
            this.dishes = this.dishes.filter(hasSameIdCB);
            // the test "can remove dishes" should pass
            this.notifyObservers({removeDish: dishToRemove});
        }

    }

    removeDish(id){
        //callback exercise! Also return keyword exercise
        function hasSameIdCB(dish){
            return id !== dish.id;
            // return true if the id property of dish isDishEqualCB _different_ from the dishToRemove's id property
            // This will keep the dish when we filter below.
            // That is, we will not keep the dish that has the same id as dishToRemove (if any)
        }
        //this.dishes= this.dishes.filter(hasSameIdCB);
        //the test "can remove dishes" should pass

        let toRemove = []
        toRemove = this.dishes.filter(hasSameIdCB);
        if(toRemove.length == 0){

        }else{
            //notifyObservers({removeDish: id});
            this.dishes= this.dishes.filter(function notSameIdCB(dish){return id !== dish.id;});
            this.notifyObservers({toRemoveDish: id});
        }
    }

    /*
       ID of dish currently checked by the user.
       A strict MVC/MVP Model would not keep such data,
       but we take a more relaxed, "Application state" approach.
       So we store also abstract data that will influence the application status.
    */
    setCurrentDish(id){

        let myModel = this;
        
        function notifyACB(){
            myModel.notifyObservers(null); 
        }

        if(!id || id == this.currentDish || !isValid(id)) return;
            
        resolvePromise(getDishDetails(id), this.currentDishPromiseState, notifyACB);

        this.currentDish = id;

        this.notifyObservers({setCurrentDish: id});
    }

    setSearchQuery(q){
        this.searchParams.query = q;
        this.notifyObservers();
    }

    setSearchType(t){
        this.searchParams.type = t;
        this.notifyObservers();
    }

    doSearch(params){
        console.log("Here inside doSearch")
        console.log(params)
        const theModel = this;
        
        function notifyACB(){
            theModel.notifyObservers(); 
        }

        if(!params)
            resolvePromise(searchDishes(this.searchParams), this.searchResultsPromiseState, notifyACB);
        else
            resolvePromise(searchDishes(params), this.searchResultsPromiseState, notifyACB);
    }

    //new methods TW3
    addObserver(callback){
        this.observers = [...this.observers, callback];
    }

    removeObserver(callback){ //to remove observer for 

        /*function hasSameIdCallbackCB(id){
            return callback!==id;
        }
        this.observers = this.observers.filter(hasSameIdCallbackCB)*/

        function removeCB(id){
            (id === callback)? false : true;
        }
        this.observers = this.observers.filter(removeCB);
    }

    //this method will be called every to that notifies the available observers
    notifyObservers(payload){
        try{
            this.observers.forEach(function invokeObserverCB(obs){obs(payload);}) //payload is used for the persistance
        }
        catch(err){
            console.error(err);
        }
    }

}

export default DinnerModel;