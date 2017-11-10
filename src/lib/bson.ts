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
const pid = process.pid;

const counter: any = {};

/**
 * Defines IObjectID Interface
 * @TODO: learn: https://www.typescriptlang.org/docs/handbook/interfaces.html
 * @see: https://www.typescriptlang.org/docs/handbook/interfaces.html
 */
interface IObjectID {
	// private properties
	private created: Number;
	private machine: String = machine;
	private process: Number = pid;
	private counter: Number;

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

export class ObjectID implement IObjectID {
	private created: Number;
	private machine: String;
	private process: Number;
	private counter: Number;

	private parseID(id: String): ObjectID {
		//TODO: implement the String to ==> ObjectID parsing method!!!
		return new ObjectID();
	}

	constructor(id: String = null) {
		// check if any ID String was specified
		if(id !== null) {
		  // return the parsed ObjectID instance
		  return this.parseID(id);
		}
		// init local vars
		let now = new Date().getTime();
		let number = 1;
		number = (counter[now] && counter[now] >= number) ? ++counter[now] : number;
		counter[now] = number;

		// create the new ObjectID instance
		this.created = now;
		this.machine = machine;
		this.process = process.pid;
		this.counter = counter[now];

		// return the current ObjectID instance
		return this;
	}

	public toString(): String {
		let objectID = this.created.toString(16);
		objectID += '/' + md5(this.machine).toString(16);
		objectID += '/' + process.pid.toString(16);
		objectID += '/' + this.counter.toString(16);

		return objectID;
	}
}
