export default

function Show(props){
  const [hashState, setHash] = React.useState(window.location.hash);

  function doesHashListenerACB(){ 
    setHash(window.location.hash);
  }

  function wasCreatedACB(){
    window.addEventListener("hashchange", doesHashListenerACB); //adding listener, i.e adding a subscription
    function listenerToBeRemovedACB(){
      window.removeEventListener("hashchange", doesHashListenerACB);
    }
    return listenerToBeRemovedACB;
  }
  React.useEffect(wasCreatedACB, []);

  let clas = (hashState === props.hash)? "" : "hidden";
  return <div className={clas}>{props.children}</div>
}