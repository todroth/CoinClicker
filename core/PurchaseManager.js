function PurchaseManager (coinManager, entityManager) {
    this.coinManager = coinManager;
    this.entityManager = entityManager;
}

PurchaseManager.prototype.purchase = function (entityIndex) {
    var price = this.entityManager.getPrice(entityIndex);
    if (price > -1 && this.coinManager.coins >= price) {
        this.entityManager.addEntity(entityIndex);
        this.coinManager.removeCoins(price);
        return true;
    }
    return false;
};
