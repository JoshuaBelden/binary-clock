/**
 * Binary Clock object controls a configured set of LEDs to display
 *  the current time in binary. The clock displays Hours, Minutes,
 *  and Seconds using a bank of LEDs for the 1s place and the 10s 
 *  place.
 */
const Gpio = require('onoff').Gpio;

/**
 * Generates a new pin reference for output at the specified location.
 */
const newPin = (location) => new Gpio(location, 'out');

/**
 * Turns on the specified pin by writing a binary true to the location.
 * @param {any} pin The pin to turn on.
 */
const turnOn = (pin) => pin.writeSync(1);

/**
 * Turns off the specified pin by writing a binary false to the location.
 * @param {any} pin The pin to turn off.
 */
const turnOff = (pin) => pin.writeSync(0);

/**
 * Given a number, returns an array of 2 dimensions each with the binary
 * representation of the number. The first element of the array represents
 * the 10s value of the number and the second element, the 1s value.
 * @param {int} number The number to return the binary representation for.
 */
const getSplitBits = (number) => Array.from(pad(number.toString(), 2)).map(s => pad(getBin(s), 4));

/**
 * 
 * @param {String} value The value to pad.
 * @param {int} num The number of 0s to prepend to the value.
 */
const pad = (value, num) => ("0".repeat(num) + value).slice(-num);

/**
 * Turns the specified number to a binary string representation.
 * @param {int} number The number to convert to binary.
 */
const getBin = (number) => (number >>> 0).toString(2);

/**
 * Given an hour value, displays the 10s value by turning on
 *  the appropriate pins.
 * @param {int} value The 10s value of the hour to display
 */
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

// Generate pin references based on the breadboard that's being
//  targetd.
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


const run = () => {
    // TODO: Pins are not being updated with each tick.
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

// Loop for ever running the `run` method every 1/2 second.
setInterval(run, 500);
