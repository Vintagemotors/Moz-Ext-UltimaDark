


let myPort = browser.runtime.connect({name:"port-from-cs"});

function csOverrideRemoteContent(url,content) {
    myPort.postMessage({overrideRemoteContent:{ source:document.location.href, url:url, content:content }});
};

function resolveIDKVars(data) {
    setTimeout(()=>{
  let ikd_resolved = window.wrappedJSObject.uDark.edit_str(data.chunk,false,false,false,true);
  
//   console.log("In content script, resolving IDK vars: ", ikd_resolved,data.chunk);

  data.chunk = ikd_resolved;
  myPort.postMessage({resolvedIDKVars:data});
//   console.log("In content script, resolved IDK vars: ", data);
  setTimeout(()=>{
    window.wrappedJSObject.uDark.refresh_stylesheet(data.details.url);
},500)
    }
    ,500);
}


myPort.onMessage.addListener(function(m) {
    // console.log("In content script, received message from background script: ",m);
    m.havingIDKVars&& resolveIDKVars(m.havingIDKVars);
});



  
exportFunction(csOverrideRemoteContent , window, { defineAs: "UDarkOverrideRemoteContent" });