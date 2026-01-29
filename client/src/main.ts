const app = document.getElementById("app")!;

app.innerHTML = `
<nav>
  <button id="tradeBtn">Trade</button>
  <button id="historyBtn">History</button>
  <button id="adminBtn">Admin</button>
</nav>
<section id="view"></section>
`;

const view = document.getElementById("view")!;
let trades: any[] = [];

function tradeView() {
  view.innerHTML = `
    <h2>📈 Trade</h2>
    <div id="price">---</div>
    <button id="buy">Buy 0.01</button>
    <button id="sell">Sell 0.01</button>
    <pre id="account"></pre>
  `;
}

function historyView() {
  view.innerHTML = `
    <h2>📜 Trade History</h2>
    <pre>${JSON.stringify(trades, null, 2)}</pre>
  `;
}

function adminView() {
  view.innerHTML = `
    <h2>🛡 Admin</h2>
    <p>Status: LIVE</p>
    <p>Mode: PAPER</p>
  `;
}

tradeView();

document.getElementById("tradeBtn")!.onclick = tradeView;
document.getElementById("historyBtn")!.onclick = historyView;
document.getElementById("adminBtn")!.onclick = adminView;

const ws = new WebSocket("ws://localhost:3000");

ws.onmessage = e => {
  const data = JSON.parse(e.data);

  if (data.type === "price") {
    const p = document.getElementById("price");
    if (p) p.textContent = `BTC: $${data.price}`;
  }

  if (data.type === "account") {
    const a = document.getElementById("account");
    if (a) a.textContent = JSON.stringify(data.account, null, 2);
  }

  if (data.type === "trades") {
    trades = data.trades;
  }
};

document.addEventListener("click", e => {
  const t = e.target as HTMLElement;

  if (t.id === "buy") {
    fetch("http://localhost:3000/api/buy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qty: 0.01 })
    });
  }

  if (t.id === "sell") {
    fetch("http://localhost:3000/api/sell", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qty: 0.01 })
    });
  }
});
