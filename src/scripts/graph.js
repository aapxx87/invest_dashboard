import {investmentPortfolio} from './data_invest'
export const b = 5

const stocks = document.querySelector('.stocks')


export const addStockBoxToGraph = function (arr) {



    investmentPortfolio.forEach(function (el, idx) {

        let currentStock

        arr.forEach(function (item) {

            if(el.stockTicker.toUpperCase() === item.ticker && el.buyDate === item.buyDate) {
                currentStock = item
            }

        })


        let preHeight = (+currentStock.deltaPercent * 0.7).toFixed(0)



        const html_Div = document.createElement("div")
        html_Div.classList.add('box-stock')
        html_Div.style.backgroundColor = '#80E5A4'

        let sum = 0

        if (el.currency === 'usd') {
            sum = el.volume * el.buyPrice * el.usdRubRateBuyDate
        } else if(el.currency === 'rub') {
            sum = el.volume * el.buyPrice
        }

        const px = (sum / 300).toFixed(0)

        html_Div.style.width = px + 'px'

        if(preHeight > 0) {

            html_Div.style.height = preHeight + 'px'
            html_Div.innerHTML = `<p class="box-stock-ticker" style="transform: translateY(-${25}px) ;">${el.stockTicker}</p>`
        } else {
            const newHeight = (preHeight.toString()).substring(1)
            html_Div.style.height = newHeight + 'px'
            html_Div.style.transform = `translateY(${newHeight}px)`
            html_Div.style.backgroundColor = 'rgb(243, 109, 109)'
            html_Div.innerHTML = `<p class="box-stock-ticker" style="transform: translateY(-${30}px) ;">${el.stockTicker}</p>`
        }



        stocks.append(html_Div)

    })

}








