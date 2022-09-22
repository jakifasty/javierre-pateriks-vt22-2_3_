//resolvePromise.js file

function resolvePromise(promise, promiseState, notifyACB){ //in this function, promise = promiseToResolve

	if(!promise)
		return; //Point 1 TW2.4: tests resolvePromise with a simple promise that resolves after 2s and returns a dummy result.
	//if(!promiseState.promise && !promiseState.data && !promiseState.error)
		
	promiseState.promise = promise;
	promiseState.data = null;           // UI update! The user does not keep seeing results from previous search
	promiseState.error = null;
	if(notifyACB) notifyACB();    // notify every time promise, data, or error change

	function saveDataACB(result){
		if(promiseState.promise !== promise)
			return;
		promiseState.data = result;
		if(notifyACB) notifyACB();	
	}  // triggers UI update because of changing state

	function saveErrorACB(err){
		if(promiseState.promise !== promise)
			return;
		promiseState.error = err;
		if(notifyACB) notifyACB();
	}    // triggers UI update because of changing state 

	promise.then(saveDataACB).catch(saveErrorACB); //Point 2 TW2.4: resolvePromise is tested with another promise. 
	//data and error should be reset to null by resolvePromise until that promise resolves or rejects.

	//Two more promises are initiated at 1s interval, but the first promise resolves after the second, which happens often e.g. when accessing a remote API.
}

export default resolvePromise;