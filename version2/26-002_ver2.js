webform.validators.vanz21 = function (v, allowOverpass) {
    var values = Drupal.settings.mywebform.values;
    
   
    for (var i = 10; i <= 138; i++) {
        if (!isNaN(Number(values["CAP1_R" + i + "_C1"])) &&
            !isNaN(Number(values["CAP1_R" + i + "_C2"]))) {

            var col1 = Number(values["CAP1_R" + i + "_C1"]);
            var col2 = Number(values["CAP1_R" + i + "_C2"]);
            var col2DevCol1 = Math.round((col2 / col1) * 100) / 100;



            // actualizeaza celula cu rezultatul calculului
             document.querySelector("#CAP1 tr:nth-child(" + (i - 9) + ") td:nth-child(5)").innerHTML = col2DevCol1;

            // actualizeaza valoarea in array-ul asociativ
             values["CAP1_R" + i + "_C3"] = col2DevCol1;

            

          
        }
    }
 



 
    //Sort warnings & errors
    webform.warnings.sort(function (a, b) {
        return sort_errors_warinings(a, b);
    });

    webform.errors.sort(function (a, b) {
        return sort_errors_warinings(a, b);
    });

    webform.validatorsStatus['vanz21'] = 1;
    validateWebform();

}