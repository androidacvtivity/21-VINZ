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

    function fun_row_26_024(row) {
        var i;
        i = row;
        if (

            10 == i || 11 == i || 12 == i || 13 == i || 14 == i || 15 == i || 16 == i
            || 17 == i || 18 == i || 19 == i || 20 == i || 21 == i
            || 22 == i || 23 == i || 24 == i || 25 == i
            || 26 == i || 27 == i || 28 == i || 29 == i || 30 == i || 31 == i || 32 == i || 33 == i || 34 == i
            || 35 == i || 36 == i || 37 == i || 38 == i || 39 == i || 40 == i || 41 == i || 42 == i || 43 == i
            || 44 == i || 45 == i || 46 == i || 47 == i || 48 == i || 49 == i || 50 == i || 51 == i || 52 == i
            || 53 == i || 54 == i || 55 == i || 56 == i || 57 == i || 58 == i || 59 == i || 60 == i || 61 == i || 62 == i
            || 63 == i || 64 == i || 65 == i || 66 == i || 67 == i || 68 == i || 69 == i || 70 == i || 71 == i
            || 72 == i || 73 == i || 74 == i || 75 == i || 76 == i || 77 == i || 78 == i || 79 == i || 80 == i
            || 81 == i || 82 == i || 83 == i || 84 == i || 85 == i || 86 == i || 87 == i || 88 == i || 89 == i
            || 90 == i || 91 == i || 92 == i || 93 == i || 94 == i || 95 == i || 96 == i || 97 == i || 98 == i
            || 99 == i || 100 == i || 101 == i || 102 == i || 103 == i || 104 == i || 105 == i || 106 == i || 107 == i
            || 108 == i || 109 == i || 110 == i || 135 == i || 134 == i || 133 == i || 132 == i || 131 == i || 130 == i
            || 136 == i




        )
            return true;

    }

    //Start Rind 10-33 COL1, COL2, COL3
    //Start 26-002
    for (var i = 10; i <= 135; i++) {
        {
            if (fun_row_26_024(i)) {


                if (!isNaN(Number(values["CAP1_R" + i + "_C1"]))) {
                    var col1 = Number(values["CAP1_R" + i + "_C1"]);
                }



                if (!isNaN(Number(values["CAP1_R" + i + "_C2"]))) {
                    var col2 = Number(values["CAP1_R" + i + "_C2"]);
                }


                if (col1 > 0 && col2 > 0) {

                    var col2DevCol1 = Math.round((col2 / col1) * 100) / 100;

                    col2DevCol1 = parseFloat(col2DevCol1).toFixed(2);

                    col2DevCol1 = Number(col2DevCol1);

                    document.getElementById("CAP1_R" + i + "_C3").value = col2DevCol1;

                    var col3 = Number(values["CAP1_R" + i + "_C3"]).toFixed(2);

                    col3 = Number(col3);

                    if (!col2DevCol1 === col3) {
                        webform.errors.push({
                            'fieldName': 'CAP1_R' + i + '_C3',
                            'weight': 9,
                            'msg': Drupal.t('Cod eroare: 26-003 Cap.I, COL3 = COL2/COL1 - @col3 <>  @col2DevCol1 ', { "@col3": col3, "@col2DevCol1": col2DevCol1 })
                        });
                    }
                }
                if ((col1 > 0 && col2 === 0) || (col1 === 0 && col2 === 0)) {
                    
                    values["CAP1_R" + i + "_C3"] = "";
                    document.getElementById("CAP1_R" + i + "_C3").value = "";
                }


                if (col1 === 0 && col2 > 0) {
                    values["CAP1_R" + i + "_C3"] = "";
                    document.getElementById("CAP1_R" + i + "_C3").value = "";

                }

            }
        }
    }
    // End 26-002
    // Start 26-001
    var sumCol1 = 0;

    for (var i = 11; i <= 26; i++) {

        if (!isNaN(Number(values["CAP1_R" + i + "_C1"]))) {
            sumCol1 += Number(values["CAP1_R" + i + "_C1"]);
        }
    }

    if (!isNaN(Number(values["CAP1_R" + 10 + "_C1"]))) {
        var col1 = Number(values["CAP1_R" + 10 + "_C1"]);
    }

    if (Number(col1) !== Number(sumCol1)) {
        webform.errors.push({
            'fieldName': 'CAP1_R10_C1',
            'weight': 1,
            'msg': Drupal.t('Cod eroare: 26-001  Cap.I, Rind. 10 = Rind.11 +...+ Rind.26 col1 = @col1, sumCol1 = @sumCol1', { '@col1': col1, '@sumCol1': sumCol1 })
        });
    }
    //  End  26-001
    //  Start 26-002
    var sumCol2 = 0;

    for (var i = 11; i <= 26; i++) {
        if (!isNaN(Number(values["CAP1_R" + i + "_C2"]))) {
            sumCol2 += Number(values["CAP1_R" + i + "_C2"]);
        }
    }

    if (!isNaN(Number(values["CAP1_R" + 10 + "_C2"]))) {
        var col1 = Number(values["CAP1_R" + 10 + "_C2"]);
    }

    if (Number(col1) !== Number(sumCol2)) {
        webform.errors.push({
            'fieldName': 'CAP1_R10_C2',
            'weight': 1,
            'msg': Drupal.t('Cod eroare: 26-002  Cap.I, Rind. 10 = Rind.11 +...+ Rind.26 col2 = @col1, sumCol2 = @sumCol2', { '@col1': col1, '@sumCol2': sumCol2 })
        });
    }
    // End  26-002
    // End Rind 10-33 COL1, COL2, COL3




    //Start Rind 10-33 COL4, COL5, COL6

    //Start 26-002
    for (var i = 10; i <= 135; i++) {
        {
            if (fun_row_26_024(i)) {


                if (!isNaN(Number(values["CAP1_R" + i + "_C4"]))) {
                    var col1 = Number(values["CAP1_R" + i + "_C4"]);
                }



                if (!isNaN(Number(values["CAP1_R" + i + "_C5"]))) {
                    var col2 = Number(values["CAP1_R" + i + "_C5"]);
                }


                if (col1 > 0 && col2 > 0) {

                    var col2DevCol1 = Math.round((col2 / col1) * 100) / 100;

                    col2DevCol1 = parseFloat(col2DevCol1).toFixed(2);

                    col2DevCol1 = Number(col2DevCol1);

                    document.getElementById("CAP1_R" + i + "_C6").value = col2DevCol1;

                    var col3 = Number(values["CAP1_R" + i + "_C6"]).toFixed(2);

                    col3 = Number(col3);

                    if (!col2DevCol1 === col3) {
                        webform.errors.push({
                            'fieldName': 'CAP1_R' + i + '_C6',
                            'weight': 9,
                            'msg': Drupal.t('Cod eroare: 26-003 Cap.I, COL6 = COL5/COL4 - @col3 <>  @col2DevCol1 ', { "@col3": col3, "@col2DevCol1": col2DevCol1 })
                        });
                    }
                }
                if ((col1 > 0 && col2 === 0) || (col1 === 0 && col2 === 0)) {

                    values["CAP1_R" + i + "_C3"] = "";
                    document.getElementById("CAP1_R" + i + "_C6").value = "";
                }


                if (col1 === 0 && col2 > 0) {

                    values["CAP1_R" + i + "_C3"] = "";
                    document.getElementById("CAP1_R" + i + "_C6").value = "";
                }

            }
        }
    }
    // End 26-002
    // Start 26-001
    var sumCol1 = 0;

    for (var i = 11; i <= 26; i++) {

        if (!isNaN(Number(values["CAP1_R" + i + "_C4"]))) {
            sumCol1 += Number(values["CAP1_R" + i + "_C4"]);
        }
    }

    if (!isNaN(Number(values["CAP1_R" + 10 + "_C4"]))) {
        var col1 = Number(values["CAP1_R" + 10 + "_C4"]);
    }

    if (Number(col1) !== Number(sumCol1)) {
        webform.errors.push({
            'fieldName': 'CAP1_R10_C4',
            'weight': 1,
            'msg': Drupal.t('Cod eroare: 26-001  Cap.I, Rind. 10 = Rind.11 +...+ Rind.26 col4 = @col1, sumCol1 = @sumCol1', { '@col1': col1, '@sumCol1': sumCol1 })
        });
    }
    //  End  26-001
    //  Start 26-002
    var sumCol2 = 0;

    for (var i = 11; i <= 26; i++) {
        if (!isNaN(Number(values["CAP1_R" + i + "_C5"]))) {
            sumCol2 += Number(values["CAP1_R" + i + "_C5"]);
        }
    }

    if (!isNaN(Number(values["CAP1_R" + 10 + "_C5"]))) {
        var col1 = Number(values["CAP1_R" + 10 + "_C5"]);
    }

    if (Number(col1) !== Number(sumCol2)) {
        webform.errors.push({
            'fieldName': 'CAP1_R10_C5',
            'weight': 1,
            'msg': Drupal.t('Cod eroare: 26-002  Cap.I, Rind. 10 = Rind.11 +...+ Rind.26 col5 = @col1, sumCol2 = @sumCol2', { '@col1': col1, '@sumCol2': sumCol2 })
        });
    }
    // End  26-002
    //End   Rind 10-33 COL4, COL5, COL6



    //--------------------------------------




    // Start 26-024


    function fun_row_26_025(row) {
        var i;
        i = row;
        if (

            111 == i || 112 == i || 113 == i || 114 == i || 115 == i || 116 == i || 117 == i
            || 118 == i || 119 == i || 120 == i || 121 == i || 122 == i
            || 123 == i || 124 == i || 125 == i || 137 == i


        )
            return true;

    }

    for (var i = 111; i <= 137; i++) {
        {
            if (fun_row_26_025(i)) {

                if (!isNaN(Number(values["CAP2_R" + i + "_C1"]))) {
                    var col1 = Number(values["CAP2_R" + i + "_C1"]);
                }

                if (!isNaN(Number(values["CAP2_R" + i + "_C4"]))) {
                    var col4 = Number(values["CAP2_R" + i + "_C4"]);
                }
                if (col1 < col4) {
                    webform.errors.push({
                        'fieldName': 'CAP2_R' + i + '_C1',
                        'weight': 25,
                        'msg': Drupal.t('Cod eroare: 26-025 Cap.II COL4 <= COL1 -  @col4 > @col1 ', { ' @col4': col4, '@col1': col1 })
                    });
                }
            }
        }
    }

    //End 26-024



    //  Start 26-024


    for (var i = 10; i <= 136; i++) {
        {
            if (fun_row_26_024(i)) {

                if (!isNaN(Number(values["CAP1_R" + i + "_C1"]))) {
                    var col1 = Number(values["CAP1_R" + i + "_C1"]);
                }

                if (!isNaN(Number(values["CAP1_R" + i + "_C4"]))) {
                    var col4 = Number(values["CAP1_R" + i + "_C4"]);
                }
                if (col1 < col4) {
                    webform.errors.push({
                        'fieldName': 'CAP1_R' + i + '_C1',
                        'weight': 24,
                        'msg': Drupal.t('Cod eroare: 26-024 Cap.I COL4 <= COL1 -  @col4 > @col1 ', { ' @col4': col4, '@col1': col1 })
                    });
                }
            }
        }
    }

    //End 26-024



    // Start 26-004
    for (var i = 10; i <= 136; i++) {
        {
            if (fun_row_26_024(i)) {


                if (!isNaN(Number(values["CAP1_R" + i + "_C1"]))) {
                    var col1 = Number(values["CAP1_R" + i + "_C1"]);
                }

                if (!isNaN(Number(values["CAP1_R" + i + "_C2"]))) {
                    var col2 = Number(values["CAP1_R" + i + "_C2"]);
                }

                if ((col1 > 0 && col2 == 0)) {
                    webform.errors.push({
                        'fieldName': 'CAP1_R' + i + '_C1',
                        'weight': 4,
                        'msg': Drupal.t('Cod eroare: 26-004 Cap.I, daca exista COL1 atunci exista COL2  &col1, -  &col2', { '&col1': col1, '&col2': col2 })
                    });
                }
                else
                    if ((col2 > 0 && col1 == 0)) {
                        webform.errors.push({
                            'fieldName': 'CAP1_R' + i + '_C2',
                            'weight': 4,
                            'msg': Drupal.t('Cod eroare: 26-004 Cap.I, daca exista COL2 atunci exista COL1  &col2, -  &col1', { '&col1': col1, '&col2': col2 })
                        });
                    }
            }
        }
    }

    //End 26-004

    //  Start 26-005
    for (var i = 10; i <= 136; i++) {
        {
            if (fun_row_26_024(i)) {


                if (!isNaN(Number(values["CAP1_R" + i + "_C4"]))) {
                    var col1 = Number(values["CAP1_R" + i + "_C4"]);
                }

                if (!isNaN(Number(values["CAP1_R" + i + "_C5"]))) {
                    var col2 = Number(values["CAP1_R" + i + "_C5"]);
                }

                if ((col1 > 0 && col2 == 0)) {
                    webform.errors.push({
                        'fieldName': 'CAP1_R' + i + '_C4',
                        'weight': 4,
                        'msg': Drupal.t('Cod eroare: 26-005 Cap.I, daca exista COL4 atunci exista COL5  &col1, -  &col2', { '&col1': col1, '&col2': col2 })
                    });
                }
                else
                    if ((col2 > 0 && col1 == 0)) {
                        webform.errors.push({
                            'fieldName': 'CAP1_R' + i + '_C5',
                            'weight': 4,
                            'msg': Drupal.t('Cod eroare: 26-005 Cap.I, daca exista COL5 atunci exista COL4  &col2, -  &col1', { '&col1': col1, '&col2': col2 })
                        });
                    }
            }
        }
    }

    //End 26-005


    // Start 26-022
    for (var i = 10; i <= 137; i++) {
        {
            if (fun_row_26_025(i)) {


                if (!isNaN(Number(values["CAP2_R" + i + "_C1"]))) {
                    var col1 = Number(values["CAP2_R" + i + "_C1"]);
                }

                if (!isNaN(Number(values["CAP2_R" + i + "_C2"]))) {
                    var col2 = Number(values["CAP2_R" + i + "_C2"]);
                }

                if ((col1 > 0 && col2 == 0)) {
                    webform.errors.push({
                        'fieldName': 'CAP2_R' + i + '_C1',
                        'weight': 22,
                        'msg': Drupal.t('Cod eroare: 26-022 Cap.II, daca exista COL1 atunci exista COL2  &col1, -  &col2', { '&col1': col1, '&col2': col2 })
                    });
                }
                else
                    if ((col2 > 0 && col1 == 0)) {
                        webform.errors.push({
                            'fieldName': 'CAP2_R' + i + '_C2',
                            'weight': 22,
                            'msg': Drupal.t('Cod eroare: 26-022 Cap.II, daca exista COL2 atunci exista COL1  &col2, -  &col1', { '&col1': col1, '&col2': col2 })
                        });
                    }
            }
        }
    }
    // End  26-022

    // Start 26-023
    for (var i = 10; i <= 137; i++) {
        {
            if (fun_row_26_025(i)) {


                if (!isNaN(Number(values["CAP2_R" + i + "_C4"]))) {
                    var col1 = Number(values["CAP2_R" + i + "_C4"]);
                }

                if (!isNaN(Number(values["CAP2_R" + i + "_C5"]))) {
                    var col2 = Number(values["CAP2_R" + i + "_C5"]);
                }

                if ((col1 > 0 && col2 == 0)) {
                    webform.errors.push({
                        'fieldName': 'CAP2_R' + i + '_C4',
                        'weight': 23,
                        'msg': Drupal.t('Cod eroare: 26-023 Cap.II, daca exista COL4 atunci exista COL5  &col1, -  &col2', { '&col1': col1, '&col2': col2 })
                    });
                }
                else
                    if ((col2 > 0 && col1 == 0)) {
                        webform.errors.push({
                            'fieldName': 'CAP2_R' + i + '_C5',
                            'weight': 23,
                            'msg': Drupal.t('Cod eroare: 26-023 Cap.II, daca exista COL5 atunci exista COL4  &col2, -  &col1', { '&col1': col1, '&col2': col2 })
                        });
                    }
            }
        }
    }
    // End 26-023
    // Start 26 - 007

    // for (var i = 1; i <= 5; i++) {

    //     if (i =! 3) {
    //     if (!isNaN(Number(values["CAP1_R46_C" + i]))){
    //     var R46_C  = Number(values["CAP1_R46_C" + i]);}


    //     if (!isNaN(Decimal(values["CAP1_R47_C" + i] || 0)
    //         .plus(values["CAP1_R48_C" + i] || 0)))
    //      {   
    //     var R47_48 = Decimal(values["CAP1_R47_C" + i] || 0)
    //         .plus(values["CAP1_R48_C" + i] || 0);}


    //     if (R46_C < R47_48) {
    //         webform.errors.push({
    //             'fieldName': 'CAP1_R46_C' + i,
    //             'weight': 7,
    //             'msg': Drupal.t('Cod eroare: 26-007. Cap.I, Rind. 46 >= Rind.47 + Rind.48 - @R46_C < @R47_48', { '@R46_C': R46_C, '@R47_48': R47_48, })
    //         });
    //     }
    // }


    // }

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