function GainManager (coinManager, entityManager) {
    this.coinManager = coinManager;
    this.entityManager = entityManager;
    this.gain = 0;
    this.listeners = [];

    var self = this;
    this.entityManager.addListener(function () {
        self.onEntityChange();
    });
};

GainManager.prototype.onEntityChange = function () {
    var newGain = 0;
    var entities = this.entityManager.entities;
    for (var i = 0; i < entities.length; ++i) {
        newGain += (entities[i].count * entities[i].gain);
    }
    if (newGain != this.gain) {
        this.gain = newGain;
        this.updateListeners(newGain);
    }
};

GainManager.prototype.addListener = function (fn) {
    this.listeners.push(fn);
};

GainManager.prototype.updateListeners = function (gain) {
    for (var i = 0; i < this.listeners.length; ++i) {
        this.listeners[i](gain);
    }
};

GainManager.prototype.callListeners = function () {
    this.updateListeners(this.gain);
};
