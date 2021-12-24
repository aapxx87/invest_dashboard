import {investmentPortfolio} from "../data_invest";
import {portfolioBalanceEnd2020} from './performing_2020'


const histPerforming2020 = document.querySelector('.balances-item-2021')

export const y = 5



export const newBuyAssets2021StartBalance = function (dataArr) {


    // вычисляем приобретенные в 2021 году активы

    const buy2021StockArr = dataArr.filter(function (el) {
        return el.buyYear === '2021'
    })


    const sum2021BuyStocks = []


    buy2021StockArr.forEach(function (el) {

        if(el.currency === 'usd') {
            sum2021BuyStocks.push(el.buyPrice * el.volume * el.usdRubRateBuyDate)
        } else if (el.currency === 'rub') {
            sum2021BuyStocks.push(el.buyPrice * el.volume)
        }

    })

    const sum2021BuyStocksNumber = sum2021BuyStocks.reduce(function(a, b) {
        return a + b;
    })


    return sum2021BuyStocksNumber

}


const calc2021Performance = function () {

    const totalInvestIn2021 = portfolioBalanceEnd2020(investmentPortfolio) + newBuyAssets2021StartBalance(investmentPortfolio)

    setTimeout(function () {
        const lastBalance = Number(document.querySelector('.last-balance').textContent.slice(0, -5).replace(/\s+/g, ''))

        const res = (lastBalance - totalInvestIn2021) / (totalInvestIn2021 / 100)

        histPerforming2020.textContent = `${res.toFixed(1)} %`

    }, 4000)

}

calc2021Performance()







