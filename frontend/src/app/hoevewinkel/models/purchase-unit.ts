export enum UnitType {
    Kilogram,
    Liter,
    Stuk
}

export class PurchaseUnit {
    constructor(private _unit: UnitType, private _price: Number, private _alowDecimal: Boolean, private _stackable: Boolean){

    }
    get unit(): UnitType {return this._unit; }
    get price(): Number {return this.price; }
    get allowDecimal(): Boolean {return this._alowDecimal; }
    get stackable(): Boolean {return this.stackable; }
}
