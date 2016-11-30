function UnlockManager (coinManager, entityManager) {
    this.coinManager = coinManager;
    this.entityManager = entityManager;

    this.unlockedEntities = [this.entityManager.entities[0]];

    this.listeners = [];

    var self = this;
    this.coinManager.addListener(function (coins) {
        self.checkUnlocked(coins);
    });
}

UnlockManager.prototype.isUnlocked = function (entityIndex) {
    return this.unlockedEntities.length > entityIndex;
};

UnlockManager.prototype.checkUnlocked = function (coins) {
    var count = this.unlockedEntities.length;
    var lastEntity = this.unlockedEntities[count - 1];
    var nextEntity = this.entityManager.entities[count];
    if (nextEntity && coins >= lastEntity.price && this.unlockedEntities.indexOf(nextEntity) == -1) {
        this.unlockedEntities.push(nextEntity);
        this.updateListeners(this.unlockedEntities);
    }
};

UnlockManager.prototype.addListener = function (fn) {
    this.listeners.push(fn);
    this.updateListeners(this.unlockedEntities);
};

UnlockManager.prototype.updateListeners = function (unlockedEntities) {
    for (var i = 0; i < this.listeners.length; ++i) {
        this.listeners[i](unlockedEntities);
    }
};

UnlockManager.prototype.callListeners = function () {
    this.updateListeners(this.unlockedEntities);
};
