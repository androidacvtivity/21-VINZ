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
    // 26-003
    // Cap.I: R.46 >= R.47 + R.48, pe col.1 si col.2
    // ============================================================
    function validate_26_003(values) {
        for (var col = 1; col <= 2; col++) {
            var row46 = toNumber(values['CAP1_R46_C' + col]);
            var row47 = toNumber(values['CAP1_R47_C' + col]);
            var row48 = toNumber(values['CAP1_R48_C' + col]);
            var sumRows47_48 = row47 + row48;

            if (row46 < sumRows47_48) {
                webform.errors.push({
                    'fieldName': 'CAP1_R46_C' + col,
                    'weight': 3,
                    'msg': Drupal.t(
                        'Cod eroare: 26-003 - Cap.I: Rândul 46 col.@col trebuie să fie mai mare sau egal cu suma rândurilor 47 și 48. -> [@row46] >= [@sum]',
                        {
                            '@col': col,
                            '@row46': row46,
                            '@sum': sumRows47_48
                        }
                    )
                });
            }
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
    // 26-005
    // Cap.I: R.103 >= R.136 + R.104 + R.105 + R.106 + R.107 + R.108
    // pe col.1 si col.2
    // ============================================================
    function validate_26_005(values) {
        for (var col = 1; col <= 2; col++) {
            var row103 = toNumber(values['CAP1_R103_C' + col]);

            var sumRows =
                toNumber(values['CAP1_R136_C' + col]) +
                toNumber(values['CAP1_R104_C' + col]) +
                toNumber(values['CAP1_R105_C' + col]) +
                toNumber(values['CAP1_R106_C' + col]) +
                toNumber(values['CAP1_R107_C' + col]) +
                toNumber(values['CAP1_R108_C' + col]);

            if (row103 < sumRows) {
                webform.errors.push({
                    'fieldName': 'CAP1_R103_C' + col,
                    'weight': 5,
                    'msg': Drupal.t(
                        'Cod eroare: 26-005 - Cap.I: Rândul 103 col.@col trebuie să fie mai mare sau egal cu suma rândurilor 136, 104, 105, 106, 107 și 108. -> [@row103] >= [@sum]',
                        {
                            '@col': col,
                            '@row103': row103,
                            '@sum': sumRows
                        }
                    )
                });
            }
        }
    }



    // ============================================================
    // Funcții generale pentru validările de autosumă
    // ============================================================
    function getValue(values, cap, row, col) {
        return toNumber(values[cap + '_R' + row + '_C' + col]);
    }

    function sumRows(values, cap, rows, col) {
        var sum = 0;
        for (var i = 0; i < rows.length; i++) {
            sum += getValue(values, cap, rows[i], col);
        }
        return sum;
    }

    function validateEqualSum(values, code, weight, capLabel, capKey, targetRow, rows, cols) {
        for (var i = 0; i < cols.length; i++) {
            var col = cols[i];
            var targetValue = getValue(values, capKey, targetRow, col);
            var sumValue = sumRows(values, capKey, rows, col);

            if (targetValue !== sumValue) {
                webform.errors.push({
                    'fieldName': capKey + '_R' + targetRow + '_C' + col,
                    'weight': weight,
                    'msg': Drupal.t(
                        'Cod eroare: @code - @cap: Rândul @targetRow col.@col trebuie să fie egal cu suma rândurilor @rows col.@col. -> [@target] = [@sum]',
                        {
                            '@code': code,
                            '@cap': capLabel,
                            '@targetRow': targetRow,
                            '@col': col,
                            '@rows': rows.join(', '),
                            '@target': targetValue,
                            '@sum': sumValue
                        }
                    )
                });
            }
        }
    }

    function validateGreaterOrEqualSum(values, code, weight, capLabel, capKey, targetRow, rows, cols) {
        for (var i = 0; i < cols.length; i++) {
            var col = cols[i];
            var targetValue = getValue(values, capKey, targetRow, col);
            var sumValue = sumRows(values, capKey, rows, col);

            if (targetValue < sumValue) {
                webform.errors.push({
                    'fieldName': capKey + '_R' + targetRow + '_C' + col,
                    'weight': weight,
                    'msg': Drupal.t(
                        'Cod eroare: @code - @cap: Rândul @targetRow col.@col trebuie să fie mai mare sau egal cu suma rândurilor @rows col.@col. -> [@target] >= [@sum]',
                        {
                            '@code': code,
                            '@cap': capLabel,
                            '@targetRow': targetRow,
                            '@col': col,
                            '@rows': rows.join(', '),
                            '@target': targetValue,
                            '@sum': sumValue
                        }
                    )
                });
            }
        }
    }

    // ============================================================
    // 26-006
    // Cap.I: R.34 = SUM(R.35 ... R.40), pe col.1 si col.2
    // ============================================================
    function validate_26_006(values) {
        validateEqualSum(values, '26-006', 6, 'Cap.I', 'CAP1', 34, [35, 36, 37, 38, 39, 40], [1, 2]);
    }

    // ============================================================
    // 26-007
    // Cap.I: R.50 = SUM(R.51 ... R.65), pe col.1 si col.2
    // ============================================================
    function validate_26_007(values) {
        validateEqualSum(values, '26-007', 7, 'Cap.I', 'CAP1', 50, [51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65], [1, 2]);
    }

    // ============================================================
    // 26-008
    // Cap.I: R.66 = SUM(R.67 + R.68 + R.69), pe col.1 si col.2
    // ============================================================
    function validate_26_008(values) {
        validateEqualSum(values, '26-008', 8, 'Cap.I', 'CAP1', 66, [67, 68, 69], [1, 2]);
    }

    // ============================================================
    // 26-009
    // Cap.I: R.70 = SUM(R.71 + R.72), pe col.1 si col.2
    // ============================================================
    function validate_26_009(values) {
        validateEqualSum(values, '26-009', 9, 'Cap.I', 'CAP1', 70, [71, 72], [1, 2]);
    }

    // ============================================================
    // 26-010
    // Cap.I: R.87 = SUM(R.88 ... R.93), pe col.1 si col.2
    // ============================================================
    function validate_26_010(values) {
        validateEqualSum(values, '26-010', 10, 'Cap.I', 'CAP1', 87, [88, 89, 90, 91, 92, 93], [1, 2]);
    }

    // ============================================================
    // 26-011
    // Cap.I: R.94 = SUM(R.95 + R.96 + R.97 + R.98), pe col.1 si col.2
    // ============================================================
    function validate_26_011(values) {
        validateEqualSum(values, '26-011', 11, 'Cap.I', 'CAP1', 94, [95, 96, 97, 98], [1, 2]);
    }

    // ============================================================
    // 26-012
    // Cap.I: R.99 = SUM(R.132 + R.133 + R.134), pe col.1 si col.2
    // ============================================================
    function validate_26_012(values) {
        validateEqualSum(values, '26-012', 12, 'Cap.I', 'CAP1', 99, [132, 133, 134], [1, 2]);
    }

    // ============================================================
    // 26-013
    // Cap.I: R.86 = SUM(R.87 + R.94 + R.99), pe col.1 si col.2
    // ============================================================
    function validate_26_013(values) {
        validateEqualSum(values, '26-013', 13, 'Cap.I', 'CAP1', 86, [87, 94, 99], [1, 2]);
    }

    // ============================================================
    // 26-014
    // Cap.I: R.100 = SUM(R.101 + R.102), pe col.1 si col.2
    // ============================================================
    function validate_26_014(values) {
        validateEqualSum(values, '26-014', 14, 'Cap.I', 'CAP1', 100, [101, 102], [1, 2]);
    }

    // ============================================================
    // 26-015
    // Cap.I: R.110 >= R.139, pe col.1 si col.2
    // ============================================================
    function validate_26_015(values) {
        validateGreaterOrEqualSum(values, '26-015', 15, 'Cap.I', 'CAP1', 110, [139], [1, 2]);
    }

    // ============================================================
    // 26-021
    // Cap.II: R.111 = SUM(R.112 + R.113 + R.114 + R.115 + R.116), pe col.1 si col.2
    // ============================================================
    function validate_26_021(values) {
        validateEqualSum(values, '26-021', 21, 'Cap.II', 'CAP2', 111, [112, 113, 114, 115, 116], [1, 2]);
    }

    // ============================================================
    // 26-023
    // Cap.II: R.117 = SUM(R.118 + R.119), pe col.1 si col.2
    // ============================================================
    function validate_26_023(values) {
        validateEqualSum(values, '26-023', 23, 'Cap.II', 'CAP2', 117, [118, 119], [1, 2]);
    }

    // ============================================================
    // 26-024
    // Cap.II: R.120 = SUM(R.121 + R.122), pe col.1 si col.2
    // ============================================================
    function validate_26_024(values) {
        validateEqualSum(values, '26-024', 24, 'Cap.II', 'CAP2', 120, [121, 122], [1, 2]);
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
    validate_26_003(values);
    validate_26_004(values);
    validate_26_005(values);
    validate_26_006(values);
    validate_26_007(values);
    validate_26_008(values);
    validate_26_009(values);
    validate_26_010(values);
    validate_26_011(values);
    validate_26_012(values);
    validate_26_013(values);
    validate_26_014(values);
    validate_26_015(values);
    validate_26_021(values);
    validate_26_022(values);
    validate_26_023(values);
    validate_26_024(values);
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
