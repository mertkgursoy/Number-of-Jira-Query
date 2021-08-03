$("#search-header-view").after('<input type="file" id="the-file-input" /><div id="theContainer"></div>');
console.log("Author: MertKGursoy");
function theReader(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var cont = e.target.result;
    theParsed(cont);
  };
  reader.readAsText(file);
}
function theParsed(cont) {
 const json = cont.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");
  var theText = JSON.stringify(json);
  theText = theText.replace(/\[/g, "");
  theText = theText.replace(/\]/g, "");
  theText = theText.replace(/\\n/g, "");
  theText = theText.replace(/\\r/g, '", "');
  theText = theText.replace(/\\/g, '"');
  var str = theText;
  var str_array = str.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
  var theLength = str_array.length + 1;
  for(var i = 0; i < theLength ; i++) {
            delay(i);
  }
  function delay (i) {
        setTimeout(() => {
            str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
            var jqlQurey = str_array[i];
            var withoutdoublequotes = jqlQurey.replace(/\"/g, '');
            var text = document.getElementById('advanced-search');
            text.value = withoutdoublequotes;
            var jqlValue = document.getElementById("jql").value;
            $(".aui-button-primary").trigger("click");
            if (withoutdoublequotes) {    
                setTimeout(() => {
                    var resultValue = $('.results-count-total').first().text();
                    if (resultValue) {
                        $("#theContainer").append(resultValue  + '<br>');
                    } else {
                        resultValue = "0";
                        $("#theContainer").append(resultValue  + '<br>');  
                    }
                 }, 3000);
            } else {
                setTimeout(() => {
                    resultValue = "-";
                    $("#theContainer").append(resultValue  + '<br>');                      
                }, 3000);         
            }
        },i * 6000);
 }
}
document.getElementById('the-file-input').addEventListener('change', theReader, false);
