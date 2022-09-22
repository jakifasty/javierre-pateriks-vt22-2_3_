//detailsView.js file

function DetailsView(props) {

	function clickAddToMenuCB(dish){
		window.location.hash="#search";
		return props.onAddToMenu(dish);
	}

	function clickRemoveFromMenuCB(dish){
		return props.searchDishes(dish);
	}

	function setSearchHashACB(event){
		window.location.hash="search"
	}

	function setToCancelACB(event){
		window.location.hash = "search"
	}

	function listIngredientsCB(item){
		return <p>{item.name}: {item.amount} {item.unit}</p>;
	}

	//? true : false
	return(
		<div>
	    	<div className="detailsRow">
	    		<div className="detailsColumn">
		    		<span><h1>{props.dishData.title}</h1></span>
			    		<div>
			                <button type="button" onClick={clickAddToMenuCB} disabled={props.isDishInMenu}>Add to menu</button>
			                <button onClick={setToCancelACB}>Cancel</button>
			    		</div>
		    			<tr>
			    			<th><img src={props.dishData.image} height="100"></img></th>
			    			<table className="border">
				    			<tr>
						    		<th>Price: {props.dishData.pricePerServing}</th>
					    			<th>for {props.guests} guests: {((props.dishData.pricePerServing)*(props.guests)).toFixed(2)}</th>
				    			</tr>
			    			</table>
		    			</tr>
		    			<tr> 
		    			</tr>
		    		<table className="border">
		    			<span>{props.dishData.extendedIngredients.map(listIngredientsCB)}</span>
		    		</table>
		    		<tr>
	    			</tr>
		    		<table className="border">
		    			<span >{props.dishData.instructions}</span>
	    			</table>
					<p><a href={props.dishData.sourceUrl}>More information</a></p>

	    		</div>    		
			</div>
		</div>
	);
}

export default DetailsView;

	

