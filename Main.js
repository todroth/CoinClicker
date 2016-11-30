window.onload = function () {
    new Main();
};

function Main () {

    this.tiles = [
        document.getElementById("one"),
        document.getElementById("two"),
        document.getElementById("three"),
        document.getElementById("four"),
        document.getElementById("five"),
        document.getElementById("six"),
        document.getElementById("seven"),
        document.getElementById("eight"),
        document.getElementById("nine"),
        document.getElementById("ten"),
        document.getElementById("eleven"),
        document.getElementById("twelve")
    ];

    this.centerElement = document.getElementById("center");
    this.coinsElement = document.getElementById("coins");
    this.gainElement = document.getElementById("gain");

    this.unit = '&#1192';

    this.coinClicker = new CoinClicker();

    this.setupTiles();
    this.setupStartEntity();
    this.setupListeners();
    this.setAvailabilityClasses([]);
}

Main.prototype.setupTiles = function () {
    var self = this;
    for (var i = 0; i < this.tiles.length; ++i) {
        this.tiles[i].addEventListener('click', function () {
            self.coinClicker.purchase(self.getIndexForId(this.id));
        });
    }
};

Main.prototype.setupStartEntity = function () {
    var self = this;
    this.centerElement.addEventListener('click', function () {
        self.coinClicker.callStartEntity();
    });
};

Main.prototype.setupListeners = function () {
    var self = this;

    this.coinClicker.on('coin', function (coins) {
        var coinString = self.formatNumber(coins);
        self.coinsElement.innerHTML = coinString + ' ' + self.unit;
        document.title = "CoinClicker (" + coinString + ")";
    });

    this.coinClicker.on('entityCount', function (name, index, count) {
        if (self.coinClicker.isUnlocked(index)) {
            self.tiles[index].getElementsByClassName('entityCount')[0].innerHTML = self.formatNumber(count);
        }
    });

    this.coinClicker.on('availabilityChange', function (availableEntities) {
        self.setAvailabilityClasses(availableEntities);
    });

    this.coinClicker.on('unlock', function (unlockedEntities) {
        self.setUnlockedEntities(unlockedEntities);
    });

    this.coinClicker.on('gainChange', function (gain) {
        self.gainElement.innerHTML = self.formatNumber(gain) + ' ' + self.unit + '/s';
    });

};


Main.prototype.setAvailabilityClasses = function (availableEntities) {
    var i = 0;
    for (; i < availableEntities.length; ++i) {
        if (this.tiles[i]) {
            if (this.tiles[i].classList.contains('unavailable')) {
                this.tiles[i].classList.remove('unavailable');
            }
            if (!this.tiles[i].classList.contains('available')) {
                this.tiles[i].classList.add('available');
            }
            if (!this.tiles[i].classList.contains('clickable')) {
                this.tiles[i].classList.add('clickable');
            }
        }
    }
    for (var j = i; j < this.tiles.length; ++j) {
        if (this.tiles[j].classList.contains('available')) {
            this.tiles[j].classList.remove('available');
        }
        if (this.tiles[j].classList.contains('clickable')) {
            this.tiles[j].classList.remove('clickable');
        }
        if (!this.tiles[j].classList.contains('unavailable')) {
            this.tiles[j].classList.add('unavailable');
        }
    }
};

Main.prototype.setUnlockedEntities = function (unlockedEntities) {
    for (var i = 0; i < unlockedEntities.length; ++i) {
        if (this.tiles[i]) {
            this.tiles[i].getElementsByClassName('entityName')[0].innerHTML = unlockedEntities[i].name;
            this.tiles[i].getElementsByClassName('entityCount')[0].innerHTML = this.formatNumber(unlockedEntities[i].count);
            this.tiles[i].getElementsByClassName('entityPrice')[0].innerHTML = this.formatNumber(unlockedEntities[i].price) + ' ' + this.unit;
            this.tiles[i].getElementsByClassName('entityGain')[0].innerHTML = this.formatNumber(unlockedEntities[i].gain) + ' ' + this.unit + '/s';
        }
    }
};

Main.prototype.getIndexForId = function (id) {
    switch (id) {
        case 'one':
            return 0;
        case 'two':
            return 1;
        case 'three':
            return 2;
        case 'four':
            return 3;
        case 'five':
            return 4;
        case 'six':
            return 5;
        case 'seven':
            return 6;
        case 'eight':
            return 7;
        case 'nine':
            return 8;
        case 'ten':
            return 9;
        case 'eleven':
            return 10;
        case 'twelve':
            return 11;
    }
    return -1;
};

Main.prototype.formatNumber = function (number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
