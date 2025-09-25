this.ChangeCheckbox_1201 = function (itemId) {
    //alert("Test");
    var isChecked = document.getElementById(itemId).checked;
    //$.messager.alert("Warning", itemId, "warning");

    //Rind 01 ID = 26_1201_77315_01_1;
    //Rind 02 ID = 26_1201_77316_02_1;      
    //Rind 03 ID = 26_1201_77317_03_1;
    //Rind 04 ID = 26_1201_77318_04_1;
    //Rind 05 ID = 26_1201_77319_05_1;
    //Rind 06 ID = 26_1201_77320_06_1;
    //Rind 07 ID = 26_1201_77321_07_1;

    //If Rind 01 is checked, all other Rind should be unchecked 
    //If Rind 02 is checked, all other Rind should be unchecked 
    //And following this logic for all rows add the code
    


    {
        if (itemId == "26_1201_77315_01_1" && isChecked == true) {
            document.getElementById("26_1201_77316_02_1").checked = false;
            document.getElementById("26_1201_77316_03_1").checked = false;
            document.getElementById("26_1201_77316_04_1").checked = false;
            document.getElementById("26_1201_77316_05_1").checked = false;
            document.getElementById("26_1201_77316_06_1").checked = false;
            document.getElementById("26_1201_77316_07_1").checked = false;
        }

       


    }

};