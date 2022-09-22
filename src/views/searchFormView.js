//searchFormView.js file
//Component SearchFormView
import {menuPrice, dishType, sortDishes} from "../utilities"
import {treatHTTPResponseACB, transformResultACB, getDishDetails, searchDishes} from "../dishSource.js"

function SearchFormView(props) {

	function dishOptions2JSX_CB(option, index){
		window.location.hash="search";
		return <option key={index} value={option}>{option}</option>;
	}

			/*<div>
				<div>
					<table>
					<tbody>
					<tr>
					<td>
						<input type="text" onChange={function (event){props.inputOnChange(event.target.value)}} placeholder={"Input what you want..."}></input>
					</td>
					<td>
						<select onChange={function (event){props.typeOnChange(event.target.value)}}>
						<option key={0} value="default">
							Choose:
						</option>
							{props.dishTypeOptions.map(dishOptions2JSX_CB)}
						</select>
					</td>
					<td>
						<button onClick={function (event){props. }}>Search!</button>
					</td>
					<td>
						<button onClick={function (event){window.location.hash="summary"}}>Summary</button>
					</td>
					</tr>
					</tbody>
					</table>
				</div>
			</div>
			*/

	return ( <div className="debug">
				<input type="text" onChange={function setTypeOnChange(event){props.inputOnChange(event.target.value)}} placeholder={"Set search dish type..."}></input>
				<select onChange={function setTypeOnChange(event){props.typeOnChange(event.target.value)}}>
					<option>
						Choose:
					</option>
						{props.dishTypeOptions.map(dishOptions2JSX_CB)}
				</select> 
				<button onClick = {function setOnSearch(){props.onSearch()}}>Search!</button>
                <button onClick = {function(event){window.location.hash="summary"}}>Summary</button>
			</div>
	);
}

export default SearchFormView;