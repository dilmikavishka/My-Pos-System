export default class ItemModel{
    constructor(itemId,itemName,itemQty,itemPrice) {
        this._itemId = itemId;
        this._itemName = itemName;
        this._itemQty = itemQty;
        this._itemPrice = itemPrice;
    }

    get itemId() {
        return this._itemId;
    }

    set itemId(value) {
        this._itemId = value;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(value) {
        this._itemName = value;
    }

    get itemQty() {
        return this._itemQty;
    }

    set itemQty(value) {
        this._itemQty = value;
    }

    get itemPrice() {
        return this._itemPrice;
    }

    set itemPrice(value) {
        this._itemPrice = value;
    }
}