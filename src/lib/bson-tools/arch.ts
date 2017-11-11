/**
 * Module defines an BSON's ObjectID compatible Architecture Type implementation
 *
 * @file: /lib/bson-tools/arch.ts
 * @exports: ArchType, IArch, Arch
 * @author: Kostyantyn Didenko <kdidenko@ito-global.com>
 * @since: version 1.0.0
 */


/**
* Defines the enumeration of supported platform architecture types
* @enum: ArchType
*/
export enum ArchType {
	arm: 'arm',
	arm64: 'arm64',
	ia32: 'ia32',
	mips: 'mips',
	mipsel: 'mipsel',
	ppc: 'ppc',
	ppc64: 'ppc64',
	s390: 's390',
	s390x: 's390x',
	x32: 'x32',
	x64: 'x64',
	x86: 'x86',
	x86_32: 'x86-32',
	x86_64: 'x86-64',
	unknown: 'unknown'
}

export interface IArch {
	private _type: ArchType;
	public constructor(type: ArchType): IArch;
	public static isValidType(type: ArchType): Boolean;
	public toString(): String;
	public toHexString(): String;
}

export class Arch implements IArch {
	
	public constructor(type: ArchType) {
		//TODO: think about `process.arch` Polyfill for browser
		if (!Arch.isValidType(type)) {
			let arch = process.arch.toLowerCase();
			type = Arch.isValidType(arch) ? ArchType[arch] : ArchType.unknown;
		}
		this._type = type;
		return this;
	}

	public static isValidType(type: any): Boolean {
		//TODO: check agains the keys as well as is now checked for values
		return (type && type in ArchType);
	}

	public toString(): String {
		return ArchType[this._type].toString();
	}

	public toHexString(): String {
		return ArchType[this._type].toString(16);
	}
}