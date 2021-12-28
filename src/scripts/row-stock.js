const ul2021 = document.querySelector('.year_2021')
const ul2020 = document.querySelector('.year_2020')

export const component_row_stock = function (obj) {

    let html

    if (obj.buyYear === '2020') {

        html = `
         <li class="item-row row-investments ${obj.pnl > 0 ? "profit" : "loss"}">
          <p class="balances-item2 ticker">${obj.ticker}</p>
          <p class="balances-item">${obj.deltaPercent} %</p>
          <p class="balances-item2">${obj.benchMarkDeltaPercent} %</p>
          <p class="balances-item">${obj.lastPrice} ${obj.currency === 'usd' ? '$' : 'P'}</p>
          <p class="balances-item2 small-number">${obj.buyPrice} ${obj.currency === 'usd' ? '$' : 'P'}</p>
          <p class="balances-item2 small-number">${obj.buyDate}</p>
          <p class="balances-item2 small-number">${obj.volume}</p>
          <p class="balances-item2 small-number">${obj.totalVolumePrice} ${obj.currency === 'usd' ? '$' : 'P'}</p>
         </li>
        `

        ul2020.insertAdjacentHTML("beforeend", html)

    }


    if (obj.buyYear === '2021') {

        html = `
         <li class="item-row row-investments ${obj.pnl > 0 ? "profit" : "loss"}">
          <p class="balances-item2 ticker">${obj.ticker}</p>
          <p class="balances-item">${obj.deltaPercent} %</p>
          <p class="balances-item2">${obj.benchMarkDeltaPercent} %</p>
          <p class="balances-item">${obj.lastPrice} ${obj.currency === 'usd' ? '$' : 'P'}</p>
          <p class="balances-item2 small-number">${obj.buyPrice} ${obj.currency === 'usd' ? '$' : 'P'}</p>
          <p class="balances-item2 small-number">${obj.buyDate}</p>
          <p class="balances-item2 small-number">${obj.volume}</p>
          <p class="balances-item2 small-number">${obj.totalVolumePrice} ${obj.currency === 'usd' ? '$' : 'P'}</p>
         </li>
        `

        ul2021.insertAdjacentHTML("beforeend", html)

    }

}