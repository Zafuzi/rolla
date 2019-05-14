var nums = "";
var c1 = new Chance();
var seed = c1.string();
var chance = new Chance(seed);
var total = 0;
var tally = {
    a: 0, b: 0, c: 0, d: 0, e: 0
};

var cost2Roll = 1;
var cash = 10;

document.addEventListener("DOMContentLoaded", dcl => {

    display();
    window.requestAnimationFrame(check);
});

function check() {
    if(cash - cost2Roll < 0) {
        clearInterval(i);
        i = 0;
    }
    window.requestAnimationFrame(check);
}
var i;
function again() {
    i = setInterval(function() {
        run();
    }, 100);
}

function run() {
    if(cash - cost2Roll < 0) return;
    cash -= cost2Roll;
    nums = numberGenerator();
    tally[nums]++;
    total++;
    display();
}

function display() {
    replicate("tpl_display", [{ 
        numbers: "Rolled: " + nums, 
        a: tally["a"],
        b: tally["b"],
        c: tally["c"],
        d: tally["d"],
        e: tally["e"],
        total: total,
        cash: Math.floor(cash),
        cost: cost2Roll.toFixed(2)
    }]);
    let picker = document.querySelector("#number_picker");
    picker.addEventListener("submit", e => {
        e.preventDefault();
        again();
    })
}

function sell(l) {
    let num = tally[l];
    let payout = 0;
    switch(l) {
        case "a": payout = 5 * generatePseudoRandomNumber(num, true); break;
        case "b": payout = 2.5 * generatePseudoRandomNumber(num, true); break;
        case "c": payout = 1.5 * generatePseudoRandomNumber(num, true); break;
        case "d": payout = 1 * generatePseudoRandomNumber(num, true); break;
        case "e": payout = 0.5 * generatePseudoRandomNumber(num, true); break;
    }
    cash += num * payout;
    cost2Roll += generatePseudoRandomNumber(num * payout, false)/50;
    tally[l] = 0;
    display();
}

function numberGenerator() {
    return chance.weighted(['a', 'b', 'c', 'd', "e"], [0.01, 0.04, 0.12, 0.28, 0.55])
}

function arr2String(arr) {
    let s = "";
    for(let a of arr) {
        let a = arr[index];
        if(index < arr.length){
            s += a + ", ";
        }
    }
    return s;
}

function generatePseudoRandomNumber(max, floor) {
    if(floor) {
        return Math.floor(Math.random() * Math.floor(max)) + 1;
    } else {
        return Math.random() * Math.floor(max);
    }
}

function objectifyForm(formArray) {//serialize data function
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
        returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}