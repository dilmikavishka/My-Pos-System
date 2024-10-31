export default class OrderModel {
    constructor(orderNo, items, subTotal, discount, netTotal, cash, balance) {
        this._orderNo = orderNo;
        this._items = items;
        this._subTotal = subTotal;
        this._discount = discount;
        this._netTotal = netTotal;
        this._cash = cash;
        this._balance = balance;
    }


    get orderNo() {
        return this._orderNo;
    }

    get items() {
        return this._items;
    }

    get subTotal() {
        return this._subTotal;
    }

    get discount() {
        return this._discount;
    }

    get netTotal() {
        return this._netTotal;
    }

    get cash() {
        return this._cash;
    }

    get balance() {
        return this._balance;
    }


    set orderNo(value) {
        this._orderNo = value;
    }

    set items(value) {
        this._items = value;
    }

    set subTotal(value) {
        this._subTotal = value;
    }

    set discount(value) {
        this._discount = value;
    }

    set netTotal(value) {
        this._netTotal = value;
    }

    set cash(value) {
        this._cash = value;
    }

    set balance(value) {
        this._balance = value;
    }
}


