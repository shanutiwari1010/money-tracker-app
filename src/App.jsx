/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState(" ");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);
``
  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  async function getTransactions() {
    const url = "http://localhost:4040/api" + "/transactions";
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }
  function addNewTransaction(ev) {
    // this function takes all the states and send it to backend

    ev.preventDefault();
    // eslint-disable-next-line no-undef
    const url = "http://localhost:4040/api" + "/transaction";

    const price = name.split(" ")[0];
    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: name.substring(price.length + 1),
        description,
        datetime,
        price
      }),
    }).then((response) => {
      response.json().then((json) => {
        setName(" ");
        setDatetime(" ");
        setDescription(" ");

        console.log("result", json);
      });
    });
  }

  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price;
  }
  balance = balance.toFixed(2);
  const fraction = balance.split(".")[1];
  balance = balance.split(".")[0];
  return (
    <main>
      <h1>
        $400 <span>{fraction}</span>
        {/* using span so we can make it smaller */}
      </h1>
      {/* creating form for having new transactions and under form ww will have all the transactions that we added
      
      inside form we will have 3 inputes name , description and date&time(when transaction is made)*/}
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder="+200 new samsung tv"
          />

          <input
            type="datetime-local"
            value={datetime}
            onChange={(ev) => setDatetime(ev.target.value)}
          />
        </div>
        <div className="description">
          <input
            type="text"
            placeholder="description"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
        </div>

        <button type="submit">Add new transaction</button>
      </form>

      <div className="transactions">
        {transactions.length > 0 &&
          transactions.map((transaction) => (
            <div className="transaction">
              <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="description">{transaction.description}</div>
              </div>
              <div className="right">
                <div
                  className={
                    "price" + (transaction.price < 0 ? "red" : "green")
                  }
                >
                  {" "}
                  {transaction.price}
                </div>
                <div className="datetime">2023-12-18 14:45</div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}

export default App;
