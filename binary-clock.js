const Gpio = require('onoff').Gpio;

const newPin = (location) => new Gpio(location, 'out');

const pinH10_1 = newPin(4);
const pinH10_2 = newPin(17);;
const pinH1_1 = newPin(27);
const pinH1_2 = newPin(22);
const pinH1_4 = newPin(5);
const pinH1_8 = newPin(6);

const pinM10_1 = newPin(13);
const pinM10_2 = newPin(19);
const pinM10_4 = newPin(25);
const pinM1_1 = newPin(28);
const pinM1_2 = newPin(24);
const pinM1_4 = newPin(23);
const pinM1_8 = newPin(18);

const turnOn = (pin) => pin.writeSync(1);

const turnOff = (pin) => pin.writeSync(0);

const getSplitBits = (number) => Array.from(pad(number.toString(), 2)).map(s => pad(getBin(s), 4));

const pad = (value, num) => ("0".repeat(num) + value).slice(-num);

const getBin = (number) => (number >>> 0).toString(2);

const displayHour10s = (value) => {
 	turnOff(pinH10_2);
	turnOff(pinH10_1);

    if (value[2] === '1') {
        turnOn(pinH10_2);
    }
    if (value[3] === '1') {
        turnOn(pinH10_1);
    }
}

const displayHour1s = (value) => {
    	turnOff(pinH1_8);
	turnOff(pinH1_4);
	turnOff(pinH1_2);
	turnOff(pinH1_1);

	if (value[0] === '1') {
        turnOn(pinH1_8);
    }
    if (value[1] === '1') {
        turnOn(pinH1_4);
    }
    if (value[2] === '1') {
        turnOn(pinH1_2);
    }
    if (value[3] === '1') {
        turnOn(pinH1_1);
    }
}

const displayMinute10s = (value) => {
    if (value[1] === '1') {
        turnOn(pinM10_4);
    }
    if (value[2] === '1') {
        turnOn(pinM10_2);
    }
    if (value[3] === '1') {
        turnOn(pinM10_1);
    }
}

const displayMinute1s = (value) => {
    if (value[0] === '1') {
        turnOn(pinM1_8);
    }
    if (value[1] === '1') {
        turnOn(pinM1_4);
    }
    if (value[2] === '1') {
        turnOn(pinM1_2);
    }
    if (value[3] === '1') {
        turnOn(pinM1_1);
    }
}


const run = () => {
	const time = new Date();
	console.log(time);
	const segments = [].concat(
    		getSplitBits(time.getHours()),
    		getSplitBits(time.getMinutes()),
    		getSplitBits(time.getSeconds()),
		);

	displayHour10s(segments[0]);
	displayHour1s(segments[1]);
	displayMinute10s(segments[2]);
	displayMinute1s(segments[3]);
}

setInterval(run, 500);
