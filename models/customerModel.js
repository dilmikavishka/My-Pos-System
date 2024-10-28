export default class CustomerModel{
    constructor(id,name,address,email,mobile){
        this._id=id;
        this._name=name;
        this._address=address;
        this._email=email;
        this._mobile=mobile;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get mobile() {
        return this._mobile;
    }

    set mobile(value) {
        this._mobile = value;
    }
}