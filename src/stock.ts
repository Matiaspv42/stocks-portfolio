export class Stock {
    name: string;
    historicalPrice: { [date: string]: number };
    purchaseData: PurchaseStockData[]; 
  
    constructor(name: string, historicalPrice: { [date: string]: number }) {
        this.name = name;
        this.historicalPrice = historicalPrice;
        this.purchaseData = this.purchaseData;
    }
  
    price(date: string): number {
        // Este try-catch nos ayuda a que si no hay data de la stock para cierta fecha
        // aún así se pueda calcular el profit y no se caiga el método
        try {
            if (!(date in this.historicalPrice)) {
                throw new Error(`[Log][Stocks] Data is not available for ${this.name} on ${date}.`);
            }
            return this.historicalPrice[date];
        } catch (error) {
            // Mandar a reportería de errores tipo DataDog
            console.error(error.message);
            return 0; 
        }
    }

    // Este método nos entrega cuántas stocks tiene el usuario en cierta fecha
    // si no le pasamos fecha nos entrega el total historico
    holding(startDate?: string, endDate?: string): number {
        let totalQuantity = 0;
    
        for (const purchase of this.purchaseData) {
            const purchaseDate = new Date(purchase.date);
            const isWithinRange =
                (!startDate || purchaseDate >= new Date(startDate)) &&
                (!endDate || purchaseDate <= new Date(endDate));
    
            if (isWithinRange) {
                totalQuantity += purchase.quantity;
            }
        }
    
        return totalQuantity;
    }

    totalMoneyInvested(startDate?: string, endDate?:string): number {
        let totalMoneyInvested = 0

        if(startDate && endDate){

            for (const purchase of this.purchaseData){
                const purchaseDate = new Date(purchase.date);
                const isWithinRange =
                (!startDate || purchaseDate >= new Date(startDate)) &&
                (!endDate || purchaseDate <= new Date(endDate));

                if (isWithinRange) {
                    totalMoneyInvested += this.historicalPrice[purchase.date] * purchase.quantity;
                }
            }

            return totalMoneyInvested;
        }

        for (const purchase of this.purchaseData){
            totalMoneyInvested += this.historicalPrice[purchase.date] * purchase.quantity;
        }
    }

    averagePrice(startDate?: string, endDate?: string): number {
        let totalCost = 0;
        let totalQuantity = 0;

        for (const purchase of this.purchaseData) {
            const purchaseDate = new Date(purchase.date);
            const isWithinRange =
                (!startDate || purchaseDate >= new Date(startDate)) &&
                (!endDate || purchaseDate <= new Date(endDate));

            if (isWithinRange) {
                const stockPrice = this.price(purchase.date);
                totalCost += purchase.quantity * stockPrice;
                totalQuantity += purchase.quantity;
            }
        }

        return totalQuantity > 0 ? totalCost / totalQuantity : 0;
    }
}

export interface PurchaseStockData {
    quantity: number;
    date: string;
}
