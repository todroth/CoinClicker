function Entity (name, price, gain, count, coinManager) {
    this.name = name;
    this.gain = gain;
    this.price = price;
    this.count = count;
    this.coinManager = coinManager;
}

Entity.prototype.onCall = function () {
    this.coinManager.addCoins(this.gain * this.count);
};

Entity.prototype.setCount = function (count) {
    this.count = count;
};

Entity.prototype.addEntity = function () {
    this.count++;
};

Entity.prototype.removeEntity = function () {
    if (this.count == 0) {
        return false;
    }
    this.count--;
    return true;
};
