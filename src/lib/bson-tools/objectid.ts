/**
 * Module defines an BSON compatible ObjectID Type implementation
 *
 * @file: /lib/bson-tools/objectid.ts
 * @exports: ObjectID, iObjectID, iIDModel
 * @author: Kostyantyn Didenko <kdidenko@ito-global.com>
 * @since: version 1.0.0
 */

//TODO: @see: https://www.npmjs.com/package/bson-objectid for implementation requirements and details!
//TODO:
//TODO: @see: https://docs.mongodb.com/manual/reference/bson-types/#objectid - must be 100% compatible!
//TODO: @see: https://github.com/mongodb/js-bson/blob/master/lib/bson/objectid.js - implemetation example

const process = require('process');
const os = require('os');
const md5 = require("md5");

const machine: String = `${os.hostname()}/${os.type()}/${os.platform()}[${os.arch()}]`;
import { Machine } from './machine';

/** @see https://nodejs.org/api/process.html#process_process_pid */
const pid = process.pid;

const counter: any = {};

export interface IIDModel {
	private _created: Number;
	private _machine: String = machine;
	private _process: Number = pid;
	private _index: Number;
}

/**
 * Defines IObjectID Interface
 * @TODO: learn: https://www.typescriptlang.org/docs/handbook/interfaces.html
 */
export interface IObjectID extends IIDModel {
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

export class ObjectID implements iObjectID {

	private parseID(id: String): ObjectID {
		//TODO: implement the String to ==> ObjectID parsing method!!!
		return new ObjectID();
	}

	private init(): ObjectID {
		// init local vars
		let now = new Date().getTime(),
			sec = Math.floor(now / 1000),
			index = 1;
		index = (counter[sec] && counter[sec] >= index) ? ++counter[sec] : index;
		counter[sec] = index;
		// create the new ObjectID instance
		this._created = now;
		this._machine = new Machine().getHashString();
		this._process = process.pid;
		this._index = index;
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
		return Math.floor (this._created / 1000);
	}

	/**
	* Returns a 4-byte value representing the seconds the {ObjectID}
	* was created since the Unix epoch
	* @returns {Buffer}
	*/
	private getTimeBytes(): Buffer {
		let seconds = this.getTimestamp();
		return Buffer.from(seconds.toString(16), 'hex');
	}
	
	/**
	* Returns a 3-byte value representing the machine ID the {ObjectID}
	* was senerated
	* @returns {Buffer}
	*/
	private getMachineBytes(): Buffer {
		let machine = this._machine;
		return Buffer.from(machine, 'hex');
	}
	
	
	public toString(): String {
			//TODO: a 4-byte value representing the seconds since the Unix epoch,
		let time: any = this.getTimeBytes(),
			//TODO: a 3-byte machine identifier,
			machine: any = this.getMachineBytes(), = md5(this.machine).toString(16),
			//TODO: a 2-byte process id, and
			p = this.process.toString(16),
			//TODO: a 3-byte counter, starting with a random value.
			i = this.number.toString(16);

		//TODO: for test purpose only!
		objectID = `Created: ${c} Length: ${c.length}\n
		Machine md5: [${m}] Length: ${m.length}\n
		Process ID: [${p}] Length: ${p.length}\n
		Number: [${n}] Length: ${n.length}`;

		return objectID;
	}
}
