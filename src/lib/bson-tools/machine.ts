/**
 * Module defines an BSON's ObjectID compatible Machine Type implementation
 *
 * @file: /lib/bson-tools/machine.ts
 * @exports: Machine, iMachine, iMachineModel
 * @author: Kostyantyn Didenko <kdidenko@ito-global.com>
 * @since: version 1.0.0
 */

const os = require('os');
const md5 = require('md5');

//TODO: refactor this classes into 3 different instancess of the same class
//TODO: just wrapping different type ENUMS and merge both arch.ts & platform.ts
//TODO: into types.ts
import { ArchType, Arch } from './arch';
import { OSType, PlatformType, OS, Platform} from './platform';


interface IMachineModel {
	private _name: String;
	private _hostname: String;
	private _ipaddresses: Array<String>;
	private _ostype: OS;
	private _platform: Platform;
	private _archtype: Arch;
}

interface IMachine extends IMachineModel {
	public getName(): String;

	public getHostName(): String;
	public getIpAddresses(): Array<String>;

	public getOsType(): String;
	public getPlatform(): String;
	public getArchitecture(): String;
	public getHashString(): String;

	public toString(): String;
	
}

export class Machine implements IMachine {

	public constructor(name: String = process.title,
						host: String = os.hostname(),
						ip: Array<String> = ['127.0.0.1'],
						os: any = OSType[os.type()],
						platform: any = PlatformType[process.platform],
						arch: any = ArchType[process.arch]): IMachine {

        // prepare the proper IPs Array to collect
		ip = (ip && ip !== ['127.0.0.1']) ? ip : Machine.getIPsFromNIs(os.networkInterfaces());
		// user specified name or node processe's title
		this._name = name;
		// host data
		this._hostname = host;
		this._ipaddresses = this._ipaddresses.concat(ip);
		// platform data
		this._ostype = new OS(os);
		this._platform = new Platform(platform);
		this._archtype = new Arch(arch);
	}

	public getName(): String {
		return this._name;
	}

	public getHostName(): String {
		return this._hostname;
	}

	public getIpAddresses(): Array<String> {
		return this._ipaddresses;
	}

	public getOsType(): String {
		return this._ostype.toString();
	}

	public getPlatform(): String {
		return this._platform.toString();
	}

	public getArchitecture(): String {
		return this._archtype.toString();
	}

	public toString(): String {
		let stringValue = [];
		stringValue.push(this.getName());
		stringValue.push(this.getHostName());
		stringValue.push(this.getIpAddresses().join(';'));
		stringValue.push(this.getOsType());
		stringValue.push(this.getPlatform());
		stringValue.push(this.getArchitecture());
		return stringValue.join('|');
	}
	
	public getHashString(): String {
		return md5(this.toString());
	}

	public static getIPsFromNIs(nis: any = os.networkInterfaces(),
								families: Array<String> = ['IPv4'],
								internal: Boolean = false): Array<String> {
		let interfaces = Object.keys(nis);
		let ips = [];
		for (let i = 0; i < interfaces.length; i++) {
			let ni = nis[interfaces[i]];
			ni.filter(
				entry => (entry.family in families) &&
						 (internal || (!internal && entry.internal == false));
			).reduce((ips, entry) => {
				ips.push(entry.address);
				return ips;
			}, ips);
		}
		return ips;
	}
}