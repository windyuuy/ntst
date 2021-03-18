
namespace ntst {
	export type CondStatement<T> = (a?: any) => T

	export class TCondEnd<T>{
		constructor(v: T) {
			this.end = v
		}

		elif(cond: any): (call: CondStatement<T>) => TCondNext<T> {
			return () => {
				return this;
			};
		}

		nor(call: CondStatement<T>): TCondNext<T> {
			return this;
		}

		end: T
	}

	export class TCondNext<T> {
		constructor(v: T) {
			this.end = v
		}

		elif(cond: any): (call: CondStatement<T>) => TCondNext<T> {
			if (cond) {
				return (call: CondStatement<T>) => {
					let v = call(cond);
					return new TCondEnd(v);
				}
			} else {
				return () => {
					return this;
				};
			}
		}

		nor(call: CondStatement<T>): TCondNext<T> {
			let v = call();
			return new TCondEnd(v);
		}

		end: T
	}

	export function iff<T>(cond: any): (call: CondStatement<T>) => TCondNext<T> {
		if (cond) {
			return (call: CondStatement<T>) => {
				let v = call(cond);
				return new TCondEnd(v);
			}
		} else {
			return () => {
				return new TCondNext(undefined);
			};
		}
	}

	export function st<T>(call: (a?: any) => T) {
		return call();
	}

	global.ntst = ntst;
}
