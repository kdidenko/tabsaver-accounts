/**
 * Module defines an BSON's ObjectID compatible Architecture Type implementation
 *
 * @file: /lib/bson-tools/platform.ts
 * @exports: OS, Platform
 * @author: Kostyantyn Didenko <kdidenko@ito-global.com>
 * @since: version 1.0.0
 */
const os = require('os');

/**
* Defines the enumeration of supported platform architecture types
* @enum: ArchType
*/
export enum OSType {
	aix: 'aix',
	darwin: 'darwin',
	freebsd: 'freebsd',
	linux: 'linux',
	openbsd: 'openbsd',
	sunos: 'sunos',
	win32: 'win32',
	unknown: 'unknown'
}

export enum PlatformType {
	aix: 'aix',
	darwin: 'darwin',
	freebsd: 'freebsd',
	linux: 'linux',
	openbsd: 'openbsd',
	sunos: 'sunos',
	win32: 'win32',
	unknown: 'unknown'
}

export interface IOS {
	private _type: OSType;
	public constructor(type: OSType): IOS;
	public static isValidType(type: OSType): Boolean;
	public toString(): String;
	public toHexString(): String;
}

export interface IPlatform {
	private _type: PlatformType;
	public constructor(type: PlatformType): IPlatform;
	public static isValidType(type: PlatformType): Boolean;
	public toString(): String;
	public toHexString(): String;
}

export class OS implements IOS {
	
	public constructor(type: OSType): IOS {
		//TODO: think about `process.arch` Polyfill for browser
		if (!OS.isValidType(type)) {
			let ostype = os.type().toLowerCase();
			type = OS.isValidType(ostype) ? OSType[ostype] : OSType.unknown;
		}
		this._type = type;
		return this;
	}

	public static isValidType(type: any): Boolean {
		//TODO: check agains the keys as well as is now checked for values
		return (type && type in OSType);
	}

	public toString(): String {
		return OSType[this._type].toString();
	}

	public toHexString(): String {
		return OSType[this._type].toString(16);
	}
}

export class Platform implements IPlatform {
	
	public constructor(type: PlatformType): IPlatform {
		//TODO: think about `process.arch` Polyfill for browser
		if (!Platform.isValidType(type)) {
			let platform = process.platform().toLowerCase();
			type = Platform.isValidType(platform) ? PlatformType[platform] : PlatformType.unknown;
		}
		this._type = type;
		return this;
	}

	public static isValidType(type: any): Boolean {
		//TODO: check agains the keys as well as is now checked for values
		return (type && type in PlatformType);
	}

	public toString(): String {
		return PlatformType[this._type].toString();
	}

	public toHexString(): String {
		return PlatformType[this._type].toString(16);
	}
}