(function ($) {
    var activity_options_default_value = '';
      Drupal.behaviors.vanz21 = {
        attach: function (context, settings) {
            jQuery('input.numeric').on('keypress', function (event) {
                if (isNumberPressed(this, event) === false) {
                    event.preventDefault();
                }
            });

            jQuery('input.float').on('keypress', function (event) {
                if (isNumberPressed(this, event) === false) {
                    event.preventDefault();
                }
            });
        }
    }


})(jQuery)

webform.validators.vanz21 = function (v, allowOverpass) {
    var values = Drupal.settings.mywebform.values;
    
    //Start 26-002
    for (var i = 10; i <= 136; i++) {
        {
            if (1) {
            if (!isNaN(Number(values["CAP1_R" + i + "_C1"])) 
                && !isNaN(Number(values["CAP1_R" + i + "_C2"]))
                && !isNaN(Number(values["CAP1_R" + i + "_C3"]))
                && !isNaN((Number(values["CAP1_R" + i + "_C2"]) / Number(values["CAP1_R" + i + "_C1"])))
            ){
           var col1 = Number(values["CAP1_R" + i + "_C1"]);
           var col2 = Number(values["CAP1_R" + i + "_C2"]);
           var col3 = toFloat(values["CAP1_R" + i + "_C3"]).toPrecision(3);



                if (col1 > 0 && col2 > 0){

                var col2DevCol1 = Math.round((col2 / col1) * 100) / 100; }


                // actualizeaza valoarea in array-ul asociativ
                 values["CAP1_R" + i + "_C3"] = col2DevCol1;

                // actualizeaza celula cu rezultatul calculului

                //
                  document.querySelector("#CAP1 tr:nth-child(" + (i - 9) + ") td:nth-child(5)").innerHTML = col2DevCol1;

                  document.querySelector("#CAP1_R" + i + "_C3").innerHTML = col2DevCol1;



                if (col2DevCol1 != col3  && col1 > 0 && col2 > 0 ) {
                webform.errors.push({
                    'fieldName': 'CAP1_R' + i + '_C3',
                    'weight': 9,
                    'msg': Drupal.t('Cod eroare: 26-003 Cap.I, COL3 = COL2/COL1 - @col3 <>  @col2DevCol1 ', { "@col3": col3,  "@col2DevCol1": col2DevCol1 })
                });
            }
            }
        }
    }
    







}



 //End 26-002
   
 



 
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

function sort_errors_warinings(a, b) {
    if (!a.hasOwnProperty('weight')) {
        a.error_code = 9999;
    }

    if (!b.hasOwnProperty('weight')) {
        b.error_code = 9999;
    }

    return toFloat(a.error_code) - toFloat(b.error_code);
}