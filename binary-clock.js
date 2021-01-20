const time = new Date('2021-01-19 23:57:32');

const pinH10_1 = "pinH10_1";
const pinH10_2 = "pinH10_2";
const pinH1_1 = "pinH1_1";
const pinH1_2 = "pinH1_2";
const pinH1_4 = "pinH1_4";
const pinH1_8 = "pinH1_8";

const pinM10_1 = "pinM10_1";
const pinM10_2 = "pinM10_2";
const pinM10_4 = "pinM10_4";
const pinM1_1 = "pinM1_1";
const pinM1_2 = "pinM1_2";
const pinM1_4 = "pinM1_4";
const pinM1_8 = "pinM1_8";

const getSplitBits = (number) => Array.from(pad(number.toString(), 2)).map(s => pad(getBin(s), 4));

const pad = (value, num) => ("0".repeat(num) + value).slice(-num);

const getBin = (number) => (number >>> 0).toString(2);

const displayHour10s = (value) => {
    if (value[2] === '1') {
        console.log(pinH10_2);
    }
    if (value[3] === '1') {
        console.log(pinH10_1);
    }
}

const displayHour1s = (value) => {
    if (value[0] === '1') {
        console.log(pinH1_8);
    }
    if (value[1] === '1') {
        console.log(pinH1_4);
    }
    if (value[2] === '1') {
        console.log(pinH1_2);
    }
    if (value[3] === '1') {
        console.log(pinH1_1);
    }
}

const displayMinute10s = (value) => {
    if (value[1] === '1') {
        console.log(pinM10_4);
    }
    if (value[2] === '1') {
        console.log(pinM10_2);
    }
    if (value[3] === '1') {
        console.log(pinM10_1);
    }
}

const displayMinute1s = (value) => {
    if (value[0] === '1') {
        console.log(pinM1_8);
    }
    if (value[1] === '1') {
        console.log(pinM1_4);
    }
    if (value[2] === '1') {
        console.log(pinM1_2);
    }
    if (value[3] === '1') {
        console.log(pinM1_1);
    }
}

const segments = [].concat(
    getSplitBits(time.getHours()),
    getSplitBits(time.getMinutes()),
    getSplitBits(time.getSeconds()),
);

displayHour10s(segments[0]);
displayHour1s(segments[1]);
displayMinute10s(segments[2]);
displayMinute1s(segments[3]);
