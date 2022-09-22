import { sortIngredients, sortDishes } from "../utilities.js"
/* Functional JSX component. Name starts with capital letter */
function SummaryView(props){
    return (
            <div className="debug">
                Summary for <span title="nr guests">{props.people}</span> persons:

                { renderIngredients(props.ingredients, props.people)
                   /* uncomment this at TW1.5, it won't work before because props.ingredinets is not set.
                       renderIngredients(props.ingredients, props.people) */
                }
                <button onClick={function(event) {window.location.hash="#search"}}>Back to search</button>
            </div>
    );
}

/* For TW1.5. If you are at TW1.2, wait :) */
/* This is an ordinary JS function, not a component. It will be invoked from the component above */
function renderIngredients(ingredientArray, people){
    function ingredientTableRowCB(ingr){
      //window.location.hash="summary"; //if uncomment this line, it goes from #search to #summary without any action
      return <tr key={ingr.id}><td>{ingr.name}</td> <td>{ingr.aisle}</td> 
             <td className="right">{(ingr.amount*people).toFixed(2)/* multiply by number of people! Display with 2 decimals, use a CSS classs to align right */}</td>
             <td> {ingr.unit} </td></tr>;
    } 


    return <table>
        <thead>
        <tr><th>Name</th><th>Aisle</th><th>Quantity</th><th>unit</th></tr>
        </thead>
        <tbody>

            { sortIngredients(ingredientArray).map(ingredientTableRowCB)
             // sort the ingredients. Import the needed function from utilities.js
            }

        </tbody>
        </table>;
}

export default SummaryView;
export {renderIngredients};   // we export so that tests can analyze the source code
