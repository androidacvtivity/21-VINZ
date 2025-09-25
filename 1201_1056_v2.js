this.ChangeCheckbox_1201 = function (itemId) {
    const ids = [
        "26_1201_77315_01_1",
        "26_1201_77316_02_1",
        "26_1201_77317_03_1",
        "26_1201_77318_04_1",
        "26_1201_77319_05_1",
        "26_1201_77320_06_1",
        "26_1201_77321_07_1"
    ];

    const target = document.getElementById(itemId);
    if (!target) return;

    // acționăm doar când o casetă a fost bifată
    if (!target.checked) return;

    // debifează toate celelalte
    for (const id of ids) {
        if (id === itemId) continue;
        const el = document.getElementById(id);
        if (el) el.checked = false;
    }
};
