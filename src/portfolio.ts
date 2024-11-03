import { Stock } from "./stock.js";
  
export class Portfolio {
    stocks: Stock[];

    constructor(stocks: Stock[]) {
        this.stocks = stocks;
    }

    // Agregué parametro opcional stockName porque el nombre del método podría dar
    // para pensar que uno puede preguntar por una stock especifica
    profitPerStock(startDate: string, endDate: string, stockName?: string): { [stockName: string]: number } {
        if (stockName != null) {
            const stockData = this.stocks.find(stock => stock.name === stockName);

            if (!stockData) {
                console.error(`[Log][Portfolio] Stock ${stockName} not found in portfolio`);
                return { stockName: 0 };
            }

            let totalProfit = 0;
            for(const purchase of stockData.purchaseData){
                const purchaseDate = new Date(purchase.date);
                const isWithinRange =
                    (!startDate || purchaseDate >= new Date(startDate)) &&
                    (!endDate || purchaseDate <= new Date(endDate));
               
                if(isWithinRange){
                    const initialCost = stockData.historicalPrice[purchase.date] * purchase.quantity;
                    const profit = (stockData.historicalPrice[Date.now()] * purchase.quantity) - initialCost
                    totalProfit += profit;
                }
            }
        
            return { stockName: totalProfit };
        }

        const profitsPerStock: { [key: string]: number } = {};
    
        for (const stock of this.stocks) {
            let totalProfit = 0;
            for(const purchase of stock.purchaseData){
                const purchaseDate = new Date(purchase.date);
                const isWithinRange =
                    (!startDate || purchaseDate >= new Date(startDate)) &&
                    (!endDate || purchaseDate <= new Date(endDate));
               
                if(isWithinRange){
                    const initialCost = stock.historicalPrice[purchase.date] * purchase.quantity;
                    const profit = (stock.historicalPrice[endDate] * purchase.quantity) - initialCost
                    totalProfit += profit;
                }
            }
            profitsPerStock[stock.name] = totalProfit;
        }

        return profitsPerStock;
    }

    profit(startDate: string, endDate: string): number {
        return Object.values(this.profitPerStock(startDate, endDate)).reduce((a,b) => a+b);
    }


    annualizedReturn(startDate: string, endDate: string): number {
        let totalInitialInvestment = 0;
        let totalEndingValue = 0;

        for (const stock of this.stocks) {
            totalInitialInvestment += stock.totalMoneyInvested(startDate, startDate);
            totalEndingValue += stock.holding(endDate) * stock.price(endDate);
        }

        const years = this.calculateYearsDifference(startDate, endDate);

        if (totalInitialInvestment === 0 || years === 0) {
            return 0;
        }

        return (totalEndingValue / totalInitialInvestment) ** (1 / years) - 1;
    }


    private calculateYearsDifference(startDate: string, endDate: string): number {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        return diffTime / (1000 * 60 * 60 * 24 * 365.25);
    }
}