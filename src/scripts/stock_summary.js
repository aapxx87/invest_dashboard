const ulTotalBalances = document.querySelector('.portfolio-balances')

export const componentTotalBalances = function (obj) {

    // тут добавлен css класс last balance, так как именно по этому классы забирается значение из html для рассчета доходности портфеля текущего года

    const html = `
           <li class="portfolio-balances-row">
            <p class="balances-item last-balance">${obj.lastAmount} P</p>
            <p class="balances-item">${obj.startAmount} P</p>
            <p class="balances-item">${obj.totalDeltaPercent} %</p>
            <p class="balances-item">${obj.totalDelta} P</p>
          </li>
  `

    ulTotalBalances.insertAdjacentHTML("beforeend", html)

}