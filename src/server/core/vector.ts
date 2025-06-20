export class Vector {
	public static nullify(vector: Vector): void {
		vector.x = 0;
		vector.y = 0;
	}

	private _dirtyLength: boolean = true;
	private _length: number = 0;
	private _dirtyDirection: boolean = true;
	private _direction: number = 0;
	private _x: number;
	private _y: number;
	constructor(x: number, y: number) {
		this._x = x;
		this._y = y;
	}

	public get x(): number {
		return this._x;
	}

	public set x(value: number) {
		this._x = value;
		if (!this._dirtyLength) {
			this._dirtyLength = true;
		}
		if (!this._dirtyDirection) {
			this._dirtyDirection = true;
		}
	}

	public get y(): number {
		return this._y;
	}

	public set y(value: number) {
		this._y = value;
		if (!this._dirtyLength) {
			this._dirtyLength = true;
		}
		if (!this._dirtyDirection) {
			this._dirtyDirection = true;
		}
	}

	public get length(): number {
		if (this._dirtyLength) {
			this._dirtyLength = false;
			this._length = Math.sqrt(this._x * this._x + this._y * this._y);
		}
		return this._length;
	}

	public get direction(): number {
		if (this._dirtyDirection) {
			this._dirtyDirection = false;
			this._direction = Math.atan2(this._y, this._x);
		}
		return this._direction;
	}
}