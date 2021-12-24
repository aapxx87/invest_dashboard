const ulTotalBalances = document.querySelector('.portfolio-balances')

export const componentTotalBalances = function (obj) {

    const html = `
       
           <li class="item-row">
            <p class="balances-item last-balance">${obj.lastAmount} P</p>
            <p class="balances-item">${obj.startAmount} P</p>
            <p class="balances-item">${obj.totalDeltaPercent} %</p>
            <p class="balances-item">${obj.totalDelta} P</p>
          </li>
  `

    ulTotalBalances.insertAdjacentHTML("beforeend", html)

}