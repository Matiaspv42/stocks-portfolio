import { Stock, PurchaseStockData } from './stock.js';
import { Portfolio } from './portfolio.js'

// Create sample historical prices for two stocks
const historicalPricesStockA = {
    "2020-01-01": 90,
    "2020-01-02": 100,
    "2021-01-03": 110,
    "2022-01-04": 120,
    "2023-01-05": 130,
};

const historicalPricesStockB = {
    "2020-01-01": 90,
    "2020-01-02": 200,
    "2021-01-03": 210,
    "2022-01-04": 220,
    "2023-01-05": 230,
};

// Create purchase data for each stock
const purchasesStockA: PurchaseStockData[] = [
    { quantity: 5, date: "2020-01-01" }, // Purchased 5 shares on 2020-01-01
    { quantity: 10, date: "2022-01-04" }, // Purchased 10 shares on 2021-01-01
];

const purchasesStockB: PurchaseStockData[] = [
    { quantity: 3, date: "2020-01-02" }, // Purchased 3 shares on 2020-01-01
    { quantity: 4, date: "2023-01-05" }, // Purchased 4 shares on 2021-01-01
];

// Create stock instances
const stockA = new Stock("Stock A", historicalPricesStockA);
stockA.purchaseData = purchasesStockA; // Assign purchase data

const stockB = new Stock("Stock B", historicalPricesStockB);
stockB.purchaseData = purchasesStockB; // Assign purchase data

// Create a portfolio with the stocks
const portfolio = new Portfolio([stockA, stockB]);

// Test profit per stock for a given date range
const startDate = "2020-01-01";
const endDate = "2023-01-05";
const profitPerStock = portfolio.profitPerStock(startDate, endDate);
console.log("Profit per stock:", profitPerStock);

// Test total profit of the portfolio for the same date range
const totalProfit = portfolio.profit(startDate, endDate);
console.log("Total profit:", totalProfit);

// Test annualized return for the entire portfolio
const annualizedReturn = portfolio.annualizedReturn(startDate, endDate);
console.log("Annualized return:", annualizedReturn);

// Test average price for Stock A over a date range
const averagePriceStockA = stockA.averagePrice(startDate, endDate);
console.log("Average price of Stock A:", averagePriceStockA);

// Test total money invested in Stock B over a date range
const totalInvestedStockB = stockB.totalMoneyInvested(startDate, endDate);
console.log("Total money invested in Stock B:", totalInvestedStockB);

// Test holdings for both stocks
const holdingStockA = stockA.holding(startDate, endDate);
console.log("Holdings of Stock A:", holdingStockA);

const holdingStockB = stockB.holding(startDate, endDate);
console.log("Holdings of Stock B:", holdingStockB);

