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



    // Start 26-002
    for (var i = 10; i <= 136; i++) {
        {
            var col1 = Number(values["CAP1_R" + (i <= 136 ? (+ i) : i) + "_C1"]);
            var col2 = Number(values["CAP1_R" + (i <= 136 ? (+ i) : i) + "_C2"]);
            var col3 = toFloat(values["CAP1_R" + (i <= 136 ? (+ i) : i) + "_C3"]);
            var col2DevCol1 = (Number(values["CAP1_R" + (i <= 136 ? (+ i) : i) + "_C2"])  / Number(values["CAP1_R" + (i <= 136 ? (+ i) : i) + "_C1"])) 
            if (col2DevCol1 !=   col3 ) {
                webform.errors.push({
                    'fieldName': 'CAP1_R' + (i <= 136 ? (+ i) : i) + '_C3',
                    'weight': 1,
                    'msg': Drupal.t('Cod eroare: 26-003 Cap.I, COL3 = COL2/COL1 = (@col2DevCol1) pe  @row', { "@col2DevCol1": col2DevCol1, '@row': i })
                });
            }
        }
    }

 //End 26-002


//--------------------------------------




    // Start 26-024
    for (var i = 111; i <= 137; i++) {
        {
            var col1 = Number(values["CAP2_R" + (i <= 137 ? (+ i) : i) + "_C1"]);
            var col4 = Number(values["CAP2_R" + (i <= 137 ? (+ i) : i) + "_C4"]);

            if (col1 < col4) {
                webform.errors.push({
                    'fieldName': 'CAP2_R' + (i <= 136 ? (+ i) : i) + '_C1',
                    'weight': 4,
                    'msg': Drupal.t('Cod eroare: 26-025 Cap.II, COL4 <= COL1 pe  rindurile. @row', { '@row': i })
                });
            }
        }
    }

 //End 26-024



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
                    'fieldName': 'CAP1_R' + (i <= 136 ? (+ i) : i) + '_C1',
                    'weight': 2,
                    'msg': Drupal.t('Cod eroare: 26-004 Cap.I, daca exista COL1 atunci exista COL2 pe răndul  @row', { '@row': i })
                });
            }

            else if ((col2 > 0 && col1 == 0)) {
                webform.errors.push({
                    'fieldName': 'CAP1_R' + (i <= 136 ? (+ i) : i) + '_C2',
                    'weight': 2,
                    'msg': Drupal.t('Cod eroare: 26-004 Cap.I, daca exista COL2 atunci exista COL1 pe răndul  @row', { '@row': i })
                });
            }
        }
    }

 //End 26-004

    // Start 26-005
    for (var i = 10; i <= 136; i++) {
        {
            var col4 = Number(values["CAP1_R" + (i <= 136 ? (+ i) : i) + "_C4"]);
            var col5 = Number(values["CAP1_R" + (i <= 136 ? (+ i) : i) + "_C5"]);

            if ((col4 > 0 && col5 == 0)) {
                webform.errors.push({
                    'fieldName': 'CAP1_R' + (i <= 136 ? (+ i) : i) + '_C4',
                    'weight': 3,
                    'msg': Drupal.t('Cod eroare: 26-005 Cap.I, daca exista COL4 atunci exista COL5 pe răndul  @row', { '@row': i })
                });
            }

            else if ((col5 > 0 && col4 == 0)) {
                webform.errors.push({
                    'fieldName': 'CAP1_R' + (i <= 136 ? (+ i) : i) + '_C5',
                    'weight': 3,
                    'msg': Drupal.t('Cod eroare: 26-005 Cap.I, daca exista COL5 atunci exista COL4 pe răndul  @row', { '@row': i })
                });
            }
        }
    }

 //End 26-005


    // Start 26-004
    for (var i = 111; i <= 137; i++) {
        {
            var col1 = Number(values["CAP2_R" + (i <= 137 ? (+ i) : i) + "_C1"]);
            var col2 = Number(values["CAP2_R" + (i <= 137 ? (+ i) : i) + "_C2"]);

            if ((col1 > 0 && col2 == 0)) {
                webform.errors.push({
                    'fieldName': 'CAP2_R' + (i <= 137 ? (+ i) : i) + '_C1',
                    'weight': 5,
                    'msg': Drupal.t('Cod eroare: 26-022 Cap.II, daca exista COL1 atunci exista COL2 pe răndul  @row', { '@row': i })
                });
            }

            else if ((col2 > 0 && col1 == 0)) {
                webform.errors.push({
                    'fieldName': 'CAP2_R' + (i <= 137 ? (+ i) : i) + '_C2',
                    'weight': 5,
                    'msg': Drupal.t('Cod eroare: 26-004 Cap.II, daca exista COL2 atunci exista COL1 pe răndul  @row', { '@row': i })
                });
            }
        }
    }
  // End  26-004

    // Start 26-023
    for (var i = 111; i <= 137; i++) {
        {
            var col4 = Number(values["CAP2_R" + (i <= 137 ? (+ i) : i) + "_C4"]);
            var col5 = Number(values["CAP2_R" + (i <= 137 ? (+ i) : i) + "_C5"]);

            if ((col4 > 0 && col5 == 0)) {
                webform.errors.push({
                    'fieldName': 'CAP2_R' + (i <= 137 ? (+ i) : i) + '_C4',
                    'weight': 6,
                    'msg': Drupal.t('Cod eroare: 26-023 Cap.II, daca exista COL4 atunci exista COL5 pe răndul  @row', { '@row': i })
                });
            }

            else if ((col5 > 0 && col4 == 0)) {
                webform.errors.push({
                    'fieldName': 'CAP2_R' + (i <= 137 ? (+ i) : i) + '_C5',
                    'weight': 6,
                    'msg': Drupal.t('Cod eroare: 26-023 Cap.II, daca exista COL5 atunci exista COL4 pe răndul  @row', { '@row': i })
                });
            }
        }
    }
// End 26-023
// Start 26 - 007

    for (var i = 1; i <= 5; i++) {
        var R46_C  = Number(values["CAP1_R46_C" + i]);
        var R47_48 = Decimal(values["CAP1_R47_C" + i] || 0)
            .plus(values["CAP1_R48_C" + i] || 0);
        if (R46_C < R47_48) {
            webform.errors.push({
                'fieldName': 'CAP1_R46_C' + i,
                'weight': 7,
                'msg': Drupal.t('Cod eroare: 26-007. Cap.I, Rind. 46 >= Rind.47+Rind.48.@col', { '@col': i })
            });
        }
    }

    // End 26 - 007

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