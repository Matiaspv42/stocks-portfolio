"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Portfolio = exports.Stock = void 0;
var Stock = /** @class */ (function () {
    function Stock(name, holding, prices) {
        this.name = name;
        this.prices = prices;
        this.holding = holding;
    }
    Stock.prototype.price = function (date) {
        // Este try-catch nos ayuda a que si no hay data de la stock para cierta fecha
        // aún así se pueda calcular el profit y no se caiga el método
        try {
            if (!(date in this.prices)) {
                throw new Error("[Log][Stocks] Data is not available for ".concat(this.name, " on ").concat(date, "."));
            }
            return this.prices[date];
        }
        catch (error) {
            // Mandar a reportería de errores tipo DataDog
            console.error(error.message);
            return 0;
        }
    };
    return Stock;
}());
exports.Stock = Stock;
var Portfolio = /** @class */ (function () {
    function Portfolio(stocks) {
        this.stocks = stocks;
    }
    // Agregué método opcional stockName porque el nombre del método podría dar
    // para pensar que uno puede preguntar por una stock especifica
    Portfolio.prototype.profitPerStock = function (startDate, endDate, stockName) {
        if (stockName != null) {
            var stockData = this.stocks.find(function (stock) { return stock.name == stockName; });
            if (!stockData) {
                // Mandar a reportería de errores tipo DataDog
                console.error("[Log][Portfolio] Stock ".concat(stockName, " not found in portfolio"));
                return { stockName: 0 };
            }
            var initialPrice = stockData.price(startDate);
            var finalPrice = stockData.price(endDate);
            return { stockName: (finalPrice - initialPrice) * stockData.holding };
        }
        var profitsPerStock = {};
        for (var _i = 0, _a = this.stocks; _i < _a.length; _i++) {
            var stock = _a[_i];
            var initialPrice = stock.price(startDate);
            var finalPrice = stock.price(endDate);
            profitsPerStock[stock.name] = (finalPrice - initialPrice) * stock.holding;
        }
        return profitsPerStock;
    };
    Portfolio.prototype.profit = function (startDate, endDate) {
        return Object.values(this.profitPerStock(startDate, endDate)).reduce(function (a, b) { return a + b; });
    };
    return Portfolio;
}());
exports.Portfolio = Portfolio;
