class PrPayload {
    constructor(targetStrategy, payload) {
        this._payload = payload
        this._converter = targetStrategy
    }

    get converted() {
        const converter = new this._converter()
        return converter.convert(this._payload)
    }
}

module.exports = PrPayload