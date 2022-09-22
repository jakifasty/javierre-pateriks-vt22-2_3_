//searchResultsView.js file
//Component SearchFormView

function SearchResultsView(props){

	function chooseDishACB(event){
		props.chooseDish(props.dish);
	}

	function viewResultImages2JSX_CB(dish){
		return (<span key={dish.id} onClick={function (event){window.location.hash="#details"; props.chooseDish(dish);}} className="searchResults"> 
					<img src={"https://spoonacular.com/recipeImages/" + dish.image} height="100"></img>
					<div className="left">
						{dish.title}
					</div>
				</span>
		);
	}

	return(
			<div>
				{props.searchResults.map(viewResultImages2JSX_CB)}
			</div>
			);
}

export default SearchResultsView;