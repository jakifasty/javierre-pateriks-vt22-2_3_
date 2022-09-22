//promiseNoData.js file

function promiseNoData(promiseState){

	//Initially none of them have a pending promise so they should show “no data”
	if((!promiseState.promise)) //test 1 TW2.4
		return <div>No data</div>

	//After 1s the promise properties of both promise states become truthy (so they get imaginary “promises”),
	//so they should start showing “loading images”

	if((!promiseState.data) && (!promiseState.error)){ //test 2 TW2.4
		return <img src={"https://i.stack.imgur.com/kOnzy.gif"} height="100" class="imageGIF"></img>
	}

	//After 2s, the first promise state data becomes truthy (this simulates that the promise resolves), 
	//so it should show the result

	if(promiseState.error) //test 3 TW2.4: returning error text
		return <div>{promiseState.error}</div>

	//After 3s, the second promise state error becomes truthy (this simulates promise rejection), 
	//so it should show the error message

	return false;
}

export default promiseNoData;