import {investmentPortfolio} from "../data_invest";

const histPerforming2020 = document.querySelector('.balances-item-2020')

export const x = 5





const portfolioBalanceStart2020 = function (dataArr) {

    const buy2020StockArr = dataArr.filter(function (el) {
        return el.buyYear === '2020'
    })

    const sumStart2020Arr = []

    console.log(buy2020StockArr)

    buy2020StockArr.forEach(function (el) {

        if(el.currency === 'usd') {
            sumStart2020Arr.push(el.buyPrice * el.volume * el.usdRubRateBuyDate)
        }

        sumStart2020Arr.push(el.buyPrice * el.volume)
    })

    const sumStart2020Number = sumStart2020Arr.reduce(function(a, b) {
        return a + b;
    })

    return sumStart2020Number

}








export const portfolioBalanceEnd2020 = function (dataArr) {

    const buy2020StockArr = dataArr.filter(function (el) {
        return el.buyYear === '2020'
    })

    const sumEnd2020Arr = []

    buy2020StockArr.forEach(function (el) {

        if(el.currency === 'usd') {
            sumEnd2020Arr.push(el.end2020Price * el.volume * el.usdRubRateBuyDate)
        }
        else if(el.currency === 'rub') {
            sumEnd2020Arr.push(el.end2020Price * el.volume)
        }

    })


    const sumEnd2020Number = sumEnd2020Arr.reduce(function(a, b) {
        return a + b;
    })

    return sumEnd2020Number

}




const calc2020performance = function () {

    return (portfolioBalanceEnd2020(investmentPortfolio) - portfolioBalanceStart2020(investmentPortfolio)) / (portfolioBalanceStart2020(investmentPortfolio)/100)

}



histPerforming2020.textContent = `${calc2020performance().toFixed(1)} %`



