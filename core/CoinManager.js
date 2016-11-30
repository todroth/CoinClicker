function CoinManager () {
    this.coins = 0;
    this.listeners = [];
};

CoinManager.prototype.getState = function () {
    return this.coins;
};

CoinManager.prototype.setState = function (state) {
    this.coins = state;
    this.updateListeners(this.coins);
};

CoinManager.prototype.addCoins = function (coins) {
    this.coins += coins;
    this.updateListeners(this.coins);
};

CoinManager.prototype.removeCoins = function (coins) {
    this.coins -= coins;
    if (this.coins < 0) {
        this.coins = 0;
    }
    this.updateListeners(this.coins);
};

CoinManager.prototype.setCoins = function (coins) {
    this.coins = coins;
    this.updateListeners(this.coins);
};

CoinManager.prototype.addListener = function (fn) {
    this.listeners.push(fn);
    this.updateListeners(this.coins);
};

CoinManager.prototype.updateListeners = function (coins) {
    for (var i = 0; i < this.listeners.length; ++i) {
        this.listeners[i](coins);
    }
};

CoinManager.prototype.callListeners = function () {
    this.updateListeners(this.coins);
};
