/**
 * Module defines basic BSON compatible Types
 *
 * @file: /lib/bson/bson.ts
 * @exports: ObjectID
 * @author: Kostyantyn Didenko <kdidenko@ito-global.com>
 */

//TODO: @see: https://www.npmjs.com/package/bson-objectid for implementation requirements and details!
//TODO:
//TODO: @see: https://docs.mongodb.com/manual/reference/bson-types/#objectid - must be 100% compatible!
//TODO: @see: https://github.com/mongodb/js-bson/blob/master/lib/bson/objectid.js - implemetation example

const process = require('process');
const os = require('os');
const md5 = require("md5");

const machine: String = `${os.hostname()}/${os.type()}/${os.platform()}[${os.arch()}]`;
/** @see https://nodejs.org/api/process.html#process_process_pid */
const pid = process.pid;

const counter: any = {};

interface IObjectIDModel {
	private created: Number;
	private machine: String = machine;
	private process: Number = pid;
	private number: Number;
}

/**
 * Defines IObjectID Interface
 * @TODO: learn: https://www.typescriptlang.org/docs/handbook/interfaces.html
 * @see: https://www.typescriptlang.org/docs/handbook/interfaces.html
 */
interface IObjectID extends IObjectIDModel {
	// private methods
	private parseID(id: String): IObjectID;
	// public methods
	public toString(): String;
	public toHexString(): String;
	public getTimestamp(): Number;
	public equals(id: IObjectID): Boolean;
	// static methods
	public static createFromTime(time: Number): IObjectID;
	public static createFromHexString(hex: String): IObjectID;
	public static generate(): IObjectID;
	public static generate(time: Number): IObjectID;
	public static getMachineID(): Number
	public static isValid(id: ObjectID): Boolean;
	public static setMachineID(id: Number): void
	public static setMachineID(id: String): void
}


export class ObjectID implements IObjectID {

	private parseID(id: String): ObjectID {
		//TODO: implement the String to ==> ObjectID parsing method!!!
		return new ObjectID();
	}

	private init(): ObjectID {
		// init local vars
		let now = new Date().getTime();
		let number = 1;
		number = (counter[now] && counter[now] >= number) ? ++counter[now] : number;
		counter[now] = number;
		// create the new ObjectID instance
		this.created = now;
		this.machine = machine;
		this.process = process.pid;
		this.number = counter[now];
		// return the current ObjectID instance
		return this;
	}

	constructor(id: String = null) {
		// check if any ID String was specified
		if (null !== id) {
		  return this.parseID(id); // return the parsed ObjectID instance
		} else {
			return this.init(); // return the new ObjectID instance
		}
	}

	/**
	 * Returns the timestamp of ObjectID instance creation time
	 * @see: https://mongodb.github.io/node-mongodb-native/api-bson-generated/objectid.html
	 * @return {Number} timestamp
	 */
	public getTimestamp(): Number {
		return Math.floor (this.created / 1000);
	}

	public toString(): String {
		let c, m, p, n = '';
		c = this.created.toString(16);
		m = md5(this.machine).toString(16);
		p = this.process.toString(16);
		n = this.number.toString(16);

		//TODO: for test purpose only!
		objectID = `Created: ${c} Length: ${c.length}\n
		Machine md5: [${m}] Length: ${m.length}\n
		Process ID: [${p}] Length: ${p.length}\n
		Number: [${n}] Length: ${n.length}`;

		//TODO: must return:
		//TODO: a 4-byte value representing the seconds since the Unix epoch,
		//TODO: a 3-byte machine identifier,
		//TODO: a 2-byte process id, and
		//TODO: a 3-byte counter, starting with a random value.
		return objectID;
	}
}
