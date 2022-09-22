import { menuPrice, dishType, sortDishes} from "../utilities.js"

function sidebarView(props){
    return (
            <div>
                <div>
                Number of guests
                </div>
                <div>
                    <button type="button" onClick={function clickACB(event){props.onNumberChange(props.number-1)}} disabled={props.number<=1? true : false}>-</button>
                    <span title="nr guests">{props.number}</span>
                    <button type="button" onClick={function clickACB(event){props.onNumberChange(props.number+1)}}>+</button>
                </div>
                {renderDishes(props.onCurrentDish, props.onRemove, props.dishes, props.number)}
            </div>
    );
}

function renderDishes(onCurrentDish, onRemove, dishes, number){
    function dishesTableRowCB(dish){
        //window.location.hash="sidebar";
        return     <tr key={dish.id}>
                    <td>
                      <button onClick= {function setClickACB(e){onRemove(dish);}}>x</button>
                    </td>
                    <td>
                      <a onClick={function setClickACB(e){onCurrentDish(dish);}} href="#details">{dish.title}</a>
                    </td>
                    <td>
                      {dishType(dish)}
                    </td>
                    <td className="right">
                      {(dish.pricePerServing*number).toFixed(2)}
                    </td>
                  </tr>
    }

    return <table>
        <thead>
        </thead>
        <tbody>

          {  //  <---- we are in JSX, with this curly brace, we go back to JavaScript
             sortDishes(dishes).map(dishesTableRowCB)
             // TODO sort the ingredients. Import the needed function from utilities.js
          }

                    <tr>
                      <td>
                      </td>
                      <td>
                        Total:
                      </td>
                      <td>
                      </td>
                      <td className="right">
                        {(menuPrice(dishes)*number).toFixed(2)}
                      </td>
                    </tr>
        </tbody>
        </table>;
}

export default sidebarView;
