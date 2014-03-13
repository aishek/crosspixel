function execute_script(name) {
  chrome.tabs.executeScript(null, {file: name + ".js"});
}

var crosspixel_enabled = {};
function crosspixel_is_enabled_for(id) {
  return crosspixel_enabled[id] === true;
}

function set_title(title) {
  chrome.browserAction.setTitle({title: title});
}

function set_icon(icon) {
  chrome.browserAction.setIcon({path: "images/" + icon + ".png"});
}

function update_icon(tab_id) {
  if (crosspixel_is_enabled_for(tab_id)) {
    set_icon('enabled');
    set_title('Disable crosspixel');
  }
  else {
    set_icon('disabled');
    set_title('Enable crosspixel');
  }
}

chrome.browserAction.onClicked.addListener(function(tab) {
  var tab_id = tab.id;

  if (crosspixel_is_enabled_for(tab_id)) {
    execute_script('cleanup_crosspixel');
    delete crosspixel_enabled[tab_id];
  } else {
    execute_script('crosspixel');
    crosspixel_enabled[tab_id] = true;
  }

  update_icon(tab_id);
});

chrome.tabs.onActivated.addListener(function(activeInfo){
  var tab_id = activeInfo.tabId;
  update_icon(tab_id);
});