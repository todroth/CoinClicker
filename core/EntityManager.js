function EntityManager (coinManager) {
    this.coinManager = coinManager;

    this.listeners = [];

    this.startEntity = new Entity("0", 0, 1, 1, this.coinManager);

    this.entities = [
        new Entity("A", 50, 1, 0, this.coinManager),
        new Entity("B", 500, 7, 0, this.coinManager),
        new Entity("C", 2500, 40, 0, this.coinManager),
        new Entity("E", 15000, 100, 0, this.coinManager),
        new Entity("F", 50000, 400, 0, this.coinManager),
        new Entity("G", 200000, 1000, 0, this.coinManager),
        new Entity("H", 1000000, 4000, 0, this.coinManager),
        new Entity("I", 1666666, 66666, 0, this.coinManager),
        new Entity("J", 1234567890, 987654, 0, this.coinManager),
        new Entity("K", 39999999999, 9999999, 0, this.coinManager),
        new Entity("L", 500000000000, 100000000, 0, this.coinManager),
        new Entity("M", 4213372318008, 9999999999, 0, this.coinManager)
    ];
};

EntityManager.prototype.getState = function () {
    var entityCount = {};
    for (var i = 0; i < this.entities.length; ++i) {
        entityCount[this.entities[i].name] = this.entities[i].count;
    }
    return entityCount;
};

EntityManager.prototype.setState = function (entityCount) {
    for (var key in entityCount) {
        if (entityCount.hasOwnProperty(key)) {
            var entity = this.findEntity(key);
            if (entity.entity != null) {
                entity.entity.setCount(entityCount[key]);
                this.updateListeners(key, entity.index, entityCount[key]);
            }
        }
    }
};

EntityManager.prototype.addEntity = function (index) {
    var entity = this.entities[index];
    if (entity) {
        entity.addEntity();
        this.updateListeners(entity.name, index, entity.count);
    }
};

EntityManager.prototype.removeEntity = function (index) {
    var entity = this.entities[index];
    if (entity) {
        var success = entity.removeEntity();
        this.updateListeners(entity.name, index, entity.count);
        return success;
    }
    return false;
};

EntityManager.prototype.onCall = function () {
    for (var i = 0; i < this.entities.length; ++i) {
        this.entities[i].onCall();
    }
};

EntityManager.prototype.callStartEntity = function () {
    this.startEntity.onCall();
}

EntityManager.prototype.getPrice = function (index) {
    var entity = this.entities[index];
    if (entity) {
        return entity.price;
    }
    return -1;
};

EntityManager.prototype.findEntity = function (entityName) {
    var entity = {
        entity : null,
        index : -1
    };
    for (var i = 0; i < this.entities.length; ++i) {
        if (this.entities[i].name === entityName) {
            entity.entity = this.entities[i];
            entity.index = i;
            break;
        }
    }
    return entity;
}

EntityManager.prototype.addListener = function (fn) {
    this.listeners.push(fn);
};

EntityManager.prototype.updateListeners = function (name, index, count) {
    for (var i = 0; i < this.listeners.length; ++i) {
        this.listeners[i](name, index, count);
    }
};

EntityManager.prototype.callListeners = function () {
    for (var i = 0; i < this.entities.length; ++i) {
        this.updateListeners(this.entities[i].name, i, this.entities[i].count);
    }
};
