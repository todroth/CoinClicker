function CoinClicker () {
    this.coinManager = new CoinManager();
    this.entityManager = new EntityManager(this.coinManager);
    this.purchaseManager = new PurchaseManager(this.coinManager, this.entityManager);
    this.availabilityManager = new AvailabilityManager(this.coinManager, this.entityManager);
    this.unlockManager = new UnlockManager(this.coinManager, this.entityManager);
    this.gainManager = new GainManager(this.coinManager, this.entityManager);

    this.listeners = {
        coin : [],
        entityCount : [],
        availabilityChange : [],
        unlock : [],
        gainChange : []
    };

    this.setupListeners();

    var self = this;
    setInterval(function () {
        self.entityManager.onCall();
    }, 1000);

}

CoinClicker.prototype.setupListeners = function () {
    var self = this;

    this.coinManager.addListener(function (coins) {
        for (var i = 0; i < self.listeners.coin.length; ++i) {
            self.listeners.coin[i](coins);
        }
    });

    this.entityManager.addListener(function (name, index, count) {
        for (var i = 0; i < self.listeners.entityCount.length; ++i) {
            self.listeners.entityCount[i](name, index, count);
        }
    });

    this.availabilityManager.addListener(function (availableEntities) {
        for (var i = 0; i < self.listeners.availabilityChange.length; ++i) {
            self.listeners.availabilityChange[i](availableEntities);
        }
    });

    this.unlockManager.addListener(function (unlockedEntities) {
        for (var i = 0; i < self.listeners.unlock.length; ++i) {
            self.listeners.unlock[i](unlockedEntities);
        }
    });

    this.gainManager.addListener(function (gain) {
        for (var i = 0; i < self.listeners.gainChange.length; ++i) {
            self.listeners.gainChange[i](gain);
        }
    });

};

CoinClicker.prototype.getState = function () {
    return {
        entityManager : this.entityManager.getState(),
        coinManager : this.coinManager.getState()
    };
};

CoinClicker.prototype.setState = function (state) {
    this.entityManager.setState(state.entityManager);
    this.coinManager.setState(state.coinManager);
};

CoinClicker.prototype.isUnlocked = function (entityIndex) {
    return this.unlockManager.isUnlocked(entityIndex);
};

CoinClicker.prototype.isAvailable = function (entityIndex) {
    return this.availabilityManager.isAvailable(entityIndex);
};

CoinClicker.prototype.purchase = function (entityIndex) {
    this.purchaseManager.purchase(entityIndex);
};

CoinClicker.prototype.callStartEntity = function () {
    this.entityManager.callStartEntity();
};

CoinClicker.prototype.on = function (eventName, fn) {
    if (this.listeners[eventName]) {
        this.listeners[eventName].push(fn);
    }

    switch (eventName) {
        case 'coin':
            this.coinManager.callListeners();
            break;

        case 'entityCount':
            this.entityManager.callListeners();
            break;

        case 'availabilityChange':
            this.availabilityManager.callListeners();
            break;

        case 'unlock':
            this.unlockManager.callListeners();
            break;

        case 'gainChange':
            this.gainManager.callListeners();
            break;
    }

};
