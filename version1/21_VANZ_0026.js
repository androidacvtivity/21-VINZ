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

    

    // Start 26-024
    for (var i = 10; i <= 136; i++) {
         {
            var col1 = Number(values["CAP1_R" + (i <= 136 ? ( + i) : i) + "_C1"]);
            var col4 = Number(values["CAP1_R" + (i <= 136 ? ( + i) : i) + "_C4"]);

            if (col1 < col4) {
                webform.errors.push({
                    'fieldName': 'CAP1_R' + (i <= 136 ? ( + i) : i) + '_C1',
                    'weight': 1,
                    'msg': Drupal.t('Cod eroare: 26-024 Cap.I, COL4 <= COL1 pe  rindurile. @row', { '@row':  i })
                });
            }
        }
    }

 //End 26-024

    

    // Start 26-004
    for (var i = 10; i <= 136; i++) {
        {
            var col1 = Number(values["CAP1_R" + (i <= 136 ? (+ i) : i) + "_C1"]);
            var col2 = Number(values["CAP1_R" + (i <= 136 ? (+ i) : i) + "_C2"]);

            if ((col1 > 0 && col2 == 0)) {
                webform.errors.push({
                    'fieldName': 'CAP1_R' + (i <= 136 ? (+ i) : i) + '_C2',
                    'weight': 2,
                    'msg': Drupal.t('Cod eroare: 26-004 Cap.I, daca exista COL1 atunci exista COL2 pe răndul  @row', { '@row': i })
                });
            }

            else if ((col2 > 0 && col1 == 0)) {
                webform.errors.push({
                    'fieldName': 'CAP1_R' + (i <= 136 ? (+ i) : i) + '_C1',
                    'weight': 2,
                    'msg': Drupal.t('Cod eroare: 26-004 Cap.I, daca exista COL2 atunci exista COL1 pe răndul  @row', { '@row': i })
                });
            }
        }
    }

 //End 26-004



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