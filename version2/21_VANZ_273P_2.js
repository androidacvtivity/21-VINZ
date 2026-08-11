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
    };

})(jQuery);


webform.validators.vanz21 = function (v, allowOverpass) {
    var values = Drupal.settings.mywebform.values;

    // ============================================================
    // Listele de rânduri existente în noul raport 21-VÂNZ
    // ============================================================

    var cap1Rows = [
        10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
        27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
        44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
        61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77,
        78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94,
        95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109,
        110, 130, 131, 132, 133, 134, 135, 136, 139
    ];

    var cap2Rows = [
        111, 112, 113, 114, 115, 116, 117, 118,
        119, 120, 121, 122, 123, 124, 125, 137
    ];

    function toNumber(value) {
        var number = Number(value);
        return isNaN(number) ? 0 : number;
    }

    // ============================================================
    // 26-001
    // Cap.I: R.10 C1 = SUM(R.11 ... R.26 C1)
    // ============================================================
    function validate_26_001(values) {
        var sumCol1 = 0;

        for (var row = 11; row <= 26; row++) {
            sumCol1 += toNumber(values['CAP1_R' + row + '_C1']);
        }

        var row10Col1 = toNumber(values.CAP1_R10_C1);

        if (row10Col1 !== sumCol1) {
            webform.errors.push({
                'fieldName': 'CAP1_R10_C1',
                'weight': 1,
                'msg': Drupal.t(
                    'Cod eroare: 26-001 - Cap.I: Rândul 10 col.1 trebuie să fie egal cu suma rândurilor 11-26 col.1. -> [@row10] = [@sum]',
                    {
                        '@row10': row10Col1,
                        '@sum': sumCol1
                    }
                )
            });
        }
    }

    // ============================================================
    // 26-002
    // Cap.I: R.10 C2 = SUM(R.11 ... R.26 C2)
    // ============================================================
    function validate_26_002(values) {
        var sumCol2 = 0;

        for (var row = 11; row <= 26; row++) {
            sumCol2 += toNumber(values['CAP1_R' + row + '_C2']);
        }

        var row10Col2 = toNumber(values.CAP1_R10_C2);

        if (row10Col2 !== sumCol2) {
            webform.errors.push({
                'fieldName': 'CAP1_R10_C2',
                'weight': 2,
                'msg': Drupal.t(
                    'Cod eroare: 26-002 - Cap.I: Rândul 10 col.2 trebuie să fie egal cu suma rândurilor 11-26 col.2. -> [@row10] = [@sum]',
                    {
                        '@row10': row10Col2,
                        '@sum': sumCol2
                    }
                )
            });
        }
    }

    // ============================================================
    // 26-004
    // Cap.I: dacă există C1 trebuie să existe C2 și invers
    // pentru fiecare rând al capitolului
    // ============================================================
    function validate_26_004(values) {
        for (var i = 0; i < cap1Rows.length; i++) {
            var row = cap1Rows[i];

            var col1 = toNumber(values['CAP1_R' + row + '_C1']);
            var col2 = toNumber(values['CAP1_R' + row + '_C2']);

            if (col1 > 0 && col2 === 0) {
                webform.errors.push({
                    'fieldName': 'CAP1_R' + row + '_C2',
                    'weight': 4,
                    'msg': Drupal.t(
                        'Cod eroare: 26-004 - Cap.I, rândul @row: dacă există date în col.1, trebuie să existe date și în col.2. -> [@col1] / [@col2]',
                        {
                            '@row': row,
                            '@col1': col1,
                            '@col2': col2
                        }
                    )
                });
            }

            if (col2 > 0 && col1 === 0) {
                webform.errors.push({
                    'fieldName': 'CAP1_R' + row + '_C1',
                    'weight': 4,
                    'msg': Drupal.t(
                        'Cod eroare: 26-004 - Cap.I, rândul @row: dacă există date în col.2, trebuie să existe date și în col.1. -> [@col2] / [@col1]',
                        {
                            '@row': row,
                            '@col1': col1,
                            '@col2': col2
                        }
                    )
                });
            }
        }
    }

    // ============================================================
    // 26-022
    // Cap.II: dacă există C1 trebuie să existe C2 și invers
    // pentru fiecare rând al capitolului
    // ============================================================
    function validate_26_022(values) {
        for (var i = 0; i < cap2Rows.length; i++) {
            var row = cap2Rows[i];

            var col1 = toNumber(values['CAP2_R' + row + '_C1']);
            var col2 = toNumber(values['CAP2_R' + row + '_C2']);

            if (col1 > 0 && col2 === 0) {
                webform.errors.push({
                    'fieldName': 'CAP2_R' + row + '_C2',
                    'weight': 22,
                    'msg': Drupal.t(
                        'Cod eroare: 26-022 - Cap.II, rândul @row: dacă există date în col.1, trebuie să existe date și în col.2. -> [@col1] / [@col2]',
                        {
                            '@row': row,
                            '@col1': col1,
                            '@col2': col2
                        }
                    )
                });
            }

            if (col2 > 0 && col1 === 0) {
                webform.errors.push({
                    'fieldName': 'CAP2_R' + row + '_C1',
                    'weight': 22,
                    'msg': Drupal.t(
                        'Cod eroare: 26-022 - Cap.II, rândul @row: dacă există date în col.2, trebuie să existe date și în col.1. -> [@col2] / [@col1]',
                        {
                            '@row': row,
                            '@col1': col1,
                            '@col2': col2
                        }
                    )
                });
            }
        }
    }

    // ============================================================
    // A.09
    // Numărul de telefon trebuie să aibă exact 9 cifre
    // și să înceapă cu 0.
    // ============================================================
    function validate_A_09(values) {
        if (!values.PHONE || !/^[0-9]{9}$/.test(values.PHONE)) {
            webform.errors.push({
                'fieldName': 'PHONE',
                'weight': 90,
                'msg': Drupal.t(
                    'Cod eroare: A.09 - Introduceți doar un număr de telefon format din 9 cifre.'
                )
            });
        }

        if (values.PHONE && values.PHONE[0] !== '0') {
            webform.errors.push({
                'fieldName': 'PHONE',
                'weight': 90,
                'msg': Drupal.t(
                    'Cod eroare: A.09 - Prima cifră a numărului de telefon trebuie să fie 0.'
                )
            });
        }
    }

    // ============================================================
    // Apelarea validărilor
    // Fiecare validare este o funcție separată.
    // ============================================================

    validate_26_001(values);
    validate_26_002(values);
    validate_26_004(values);
    validate_26_022(values);
    validate_A_09(values);

    // Sort warnings & errors
    webform.warnings.sort(function (a, b) {
        return sort_errors_warinings(a, b);
    });

    webform.errors.sort(function (a, b) {
        return sort_errors_warinings(a, b);
    });

    webform.validatorsStatus['vanz21'] = 1;
    validateWebform();
};


function sort_errors_warinings(a, b) {
    var weightA = a.hasOwnProperty('weight') ? toFloat(a.weight) : 9999;
    var weightB = b.hasOwnProperty('weight') ? toFloat(b.weight) : 9999;

    return weightA - weightB;
}
