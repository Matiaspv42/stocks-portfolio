"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var portfolio_js_1 = require("./portfolio.js");
// Ejemplos de datos de precios
var applePrices = { "2023-01-01": 150, "2023-06-01": 170, "2024-01-01": 200 };
var googlePrices = { "2023-01-01": 100, "2023-06-01": 110, "2024-01-01": 120 };
var amazonPrices = { "2023-01-01": 90, "2023-06-01": 95 }; // Sin datos para 2024-01-01
// Crear objetos Stock con nombres, cantidades y precios
var appleStock = new portfolio_js_1.Stock("AAPL", 10, applePrices);
var googleStock = new portfolio_js_1.Stock("GOOGL", 5, googlePrices);
var amazonStock = new portfolio_js_1.Stock("AMZN", 8, amazonPrices);
// Crear el portafolio con las acciones
var portfolio = new portfolio_js_1.Portfolio([appleStock, googleStock, amazonStock]);
// Pruebas para calcular el profit de cada stock y el total del portafolio
console.log("Profit de cada stock entre 2023-01-01 y 2024-01-01:");
console.log(portfolio.profitPerStock("2023-01-01", "2024-01-01"));
// Esperado: { AAPL: 500, GOOGL: 100, AMZN: -720 }
// Nota: AMZN muestra -720 porque no tiene precio para "2024-01-01", así que toma 0 en su cálculo.
console.log("\nProfit de cada stock entre 2023-01-01 y 2023-06-01:");
console.log(portfolio.profitPerStock("2023-01-01", "2023-06-01"));
// Esperado: { AAPL: 200, GOOGL: 50, AMZN: 40 }
console.log("\nProfit de una acción específica (AAPL) entre 2023-01-01 y 2024-01-01:");
console.log(portfolio.profitPerStock("2023-01-01", "2024-01-01", "AAPL"));
// Esperado: { AAPL: 500 }
console.log("\nProfit de una acción específica (AMZN) entre 2023-01-01 y 2024-01-01 (sin dato de fin):");
console.log(portfolio.profitPerStock("2023-01-01", "2024-01-01", "AMZN"));
// Esperado: error y { AMZN: -720 }
console.log("\nProfit total del portafolio entre 2023-01-01 y 2024-01-01:");
console.log(portfolio.profit("2023-01-01", "2024-01-01"));
// Esperado: -120
