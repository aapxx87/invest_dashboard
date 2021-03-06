import {investmentPortfolio} from './data_invest'
import {b} from './graph'
import {componentTotalBalances} from './stock_summary'
import {renderSpinner} from './spinner'
import {component_row_stock} from "./row-stock";
import {x} from './performing_history/performing_2020'
import {calc2021Performance} from './performing_history/performing_2021'
import {addStockBoxToGraph} from './graph'

import '../styles/style.css'


const containerPortfolioQuotes = document.querySelector('.container-portfolio-quotes')


// нужно для рассчета всего суммарного значнеия инвестиций на текущий момент
const portfolioSumArr = []

const portfolioSumStartArr = []

// тикеры для получения котировок по ним через API + рубль
const tickerArr = ['nvda', 'rblx', 'aapl', 'fxit.me', 'yndx.me', 'tcsg.me', 'mtch', 'fb', 'u', 'orcl', 'RUB=X']




// создаем строку из тикеров массива tickerArr, которая будет вставляться в запрос АПИ по получению котировок
const create_StocksStringForAPI = function (arr) {

    // апдейтнули тикеры в формат для запроса
    const arrForFetchString = arr.map(function (el) {
        return el + '%2C'
    })

    //склеили аргументы в строку для запроса котировок
    const forFetchStocksString = arrForFetchString.join('')

    return forFetchStocksString

}





// получаем курсы котировок единым запросом (акции + курс рубля)
const get_API_StocksQuotes = async function (formattedQuotesString) {

    console.log('Start fetch API stock data')


    const response = await fetch(`https://yh-finance.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=${formattedQuotesString}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "yh-finance.p.rapidapi.com",
            "x-rapidapi-key": "8caa20872cmsh50a9c8ee420964ep1ae65ejsne134ec66d0a1"
        }
    })

    const data = await response.json()

    // получили массив с данными по акциям из массива аргументов
    const stockQuotesArr = data.quoteResponse.result;

    return stockQuotesArr

}




// вытягиваем текущее значение бенчмарка
const get_BenchmarkLastPrice = function(arr) {

    const benchMarkData = arr.filter(function(el) {
        return el.symbol === 'FXIT.ME'
    })

    const lastBMPrice = benchMarkData[0].regularMarketPrice

    return lastBMPrice
}








const calculate_StocksData = async function () {

    renderSpinner(containerPortfolioQuotes)

    // получаем актуальные курсы котировок (акции + рубль - последний элемент)
    const stocksPlusRubQuotes = await get_API_StocksQuotes(tickerArr)

    // оставляем только массив с курсами котирвок, отрезали последний элемент - курс рубля
    const stockQuotesArr = stocksPlusRubQuotes.slice(0, -1)

    // получаем только данные по рублю
    const rubUsdRate = stocksPlusRubQuotes.pop().regularMarketPrice

    // переменная для формироания объекта с данными по балансам
    let totalDataObj


    // текущая цена бенчмарка (вытягиваем из всего списка котировок полученных через АПИ по всем инструментам)
    const lastBMPrice = get_BenchmarkLastPrice(stocksPlusRubQuotes)


    const stockCalcDataArr = []



    // проходимся по массиву данных стартовых условий портфеля и матчим их с полученными котировками по АПИ, чтобы вытянуть нужные данные
    investmentPortfolio.forEach(function (el) {



        // вытягиваем последнюю актуальную цену акции из объекта полученного по АПИ проходимся по массиву с полученными через API котировками и сравниваем с текущим элементом в массиве с тикерами (передаем как аргумент в функцию). Когда находим соответствие сохраняем последнюю цену в переменную  lastStockPrice
        let lastStockPrice

        stockQuotesArr.forEach(function (elApi) {
            if (elApi.symbol === el.stockTicker.toUpperCase()) {
                lastStockPrice = elApi.regularMarketPrice
            }
        })



        const pnl = lastStockPrice - el.buyPrice


        if (el.currency === 'usd') {
            portfolioSumArr.push(+(el.volume * lastStockPrice) * rubUsdRate).toFixed(2)
            portfolioSumStartArr.push(el.buyPrice * el.volume * el.usdRubRateBuyDate)
        }


        if (el.currency === 'rub') {
            portfolioSumArr.push(+(el.volume * lastStockPrice).toFixed(2))
            portfolioSumStartArr.push(el.buyPrice * el.volume)
        }

        const totalInvestmentsSum = portfolioSumArr.reduce(function (acc, cur) {
            return acc + cur
        }, 0).toFixed(2)

        const totalInvestmentsSumStart = portfolioSumStartArr.reduce(function (acc, cur) {
            return acc + cur
        }, 0).toFixed(2)


        // считаем процентное изменение бенчмарка
        const benchmarkLastPrice = (lastBMPrice - el.benchMarkStartPrice)/(el.benchMarkStartPrice/100)


        // формируем объект с данными, которые передадим в компоненту для формирвования HTML по каждой акции
        const stockDataObj = {
            pnl: pnl,
            buyDate: el.buyDate,
            buyYear: el.buyYear,
            currency: el.currency,
            ticker: el.stockTicker.toUpperCase(),
            volume: el.volume,
            buyPrice: new Intl.NumberFormat('ru-RU').format(el.buyPrice),
            lastPrice: new Intl.NumberFormat('ru-RU').format(lastStockPrice.toFixed(2)),
            totalVolumePrice: new Intl.NumberFormat('ru-RU').format((el.volume * lastStockPrice).toFixed(2)),
            deltaMoney: new Intl.NumberFormat('ru-RU').format((pnl * el.volume).toFixed(2)),
            deltaPercent: ((lastStockPrice - el.buyPrice) / (el.buyPrice / 100)).toFixed(2),
            benchMarkDeltaPercent: benchmarkLastPrice.toFixed(0),
            benchMarkName: "FXIT.ME",
        }


        stockCalcDataArr.push(stockDataObj)

        // формируем объект с данными, которые передадим в компоненту для формирвования итоговых балансов
        totalDataObj = {
            startAmount: new Intl.NumberFormat('ru-RU').format(totalInvestmentsSumStart),
            lastAmount: new Intl.NumberFormat('ru-RU').format(totalInvestmentsSum),
            totalDelta: new Intl.NumberFormat('ru-RU').format(totalInvestmentsSum - totalInvestmentsSumStart),
            totalDeltaPercent: ((totalInvestmentsSum - totalInvestmentsSumStart) / (totalInvestmentsSumStart / 100)).toFixed(0)
        }

        const elem = document.querySelector('.spinner');

        elem.style.display = 'none'



        component_row_stock(stockDataObj)

    })


    addStockBoxToGraph(stockCalcDataArr)


    // всавляем компоненту с балансами тотальными
    componentTotalBalances(totalDataObj)



}





// получаем по АПИ объекты с кучей данных по интересующему списку инструментов
get_API_StocksQuotes(create_StocksStringForAPI(tickerArr))


// вычисляем на основне полученных данных по АПИ и данных из массива с акциями + рендерим компоненты в интерфейс
calculate_StocksData()















































































