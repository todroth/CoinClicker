function AvailabilityManager (coinManager, entityManager) {
    this.coinManager = coinManager;
    this.entityManager = entityManager;
    this.listeners = [];

    this.lastCount = 0;

    var self = this;
    this.coinManager.addListener(function (coins) {
        self.checkNewAvailableEntities(self.getAvailableEntities(coins));
    });
};

AvailabilityManager.prototype.getAvailableEntities = function (coins) {
    var entities = this.entityManager.entities;
    var availableEntities = [];

    for (var i = 0; i < entities.length; ++i) {
        if (coins >= entities[i].price) {
            availableEntities.push(entities[i]);
        }
    }

    return availableEntities;
};

AvailabilityManager.prototype.isAvailable = function (entityIndex) {
    return this.getAvailableEntities(this.coinManager.coins).length > entityIndex;
};

AvailabilityManager.prototype.checkNewAvailableEntities = function (availableEntities) {
    if (availableEntities.length != this.lastCount) {
        this.lastCount = availableEntities.length;
        this.updateListeners(availableEntities);
    }
};

AvailabilityManager.prototype.addListener = function (fn) {
    this.listeners.push(fn);
};

AvailabilityManager.prototype.updateListeners = function (availableEntities) {
    for (var i = 0; i < this.listeners.length; ++i) {
        this.listeners[i](availableEntities);
    }
};

AvailabilityManager.prototype.callListeners = function () {
    this.updateListeners(this.getAvailableEntities());
};
