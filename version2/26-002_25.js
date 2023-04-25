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
    
       if (!isNaN(Number(values["CAP1_R10_C1"])) &&
        !isNaN(Number(values["CAP1_R10_C2"]))) {

        var col1 = Number(values["CAP1_R10_C1"]);
        var col2 = Number(values["CAP1_R10_C2"]);
            var col2DevCol1 = Math.round((col2 / col1) * 100) / 100;



    //    // actualizeaza celula cu rezultatul calcululu
    //     document.querySelector("#CAP1 tr:nth-child(" + (1) + ") td:nth-child(5)").innerHTML = col2DevCol1;


    //  // actualizeaza valoarea in array-ul asociativ
    //        values["CAP1_R10_C3"] = col2DevCol1;

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

function sort_errors_warinings(a, b) {
    if (!a.hasOwnProperty('weight')) {
        a.error_code = 9999;
    }

    if (!b.hasOwnProperty('weight')) {
        b.error_code = 9999;
    }

    return toFloat(a.error_code) - toFloat(b.error_code);
}