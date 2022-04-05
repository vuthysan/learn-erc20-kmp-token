import { useState } from "react";
import TxList from "./TxList";

const contract_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function Home() {
  const [txs, setTxs] = useState([]);
  const [_loading, setLoading] = useState(false);
  const [isNotReady, setIsNotReady] = useState(false);

  const [contractInfo, setContractInfo] = useState({
    tokenName: "_",
    tokenSymbol: "_",
    totalSupply: 0,
  });

  if (isNotReady) {
    return (
      <center>
        <p>Loading ...</p>
      </center>
    );
  } else {
    return (
      <div className="KOOMPIApps">
        <div style={{ width: "60%" }}>
          <label htmlFor="">Smart Contract Address</label>
          <input
            type="text"
            placeholder="Address"
            value={contract_address}
            readOnly
          />

          <div className="body-background">
            <center>
              <h2>
                <b>Basic Token Information</b>
              </h2>
              <br />
            </center>
            <div className="token-info">
              <div>
                <h4>Name</h4>
                {contractInfo.tokenName}
              </div>
              <div>
                <h4>Symbol</h4>
                {contractInfo.tokenSymbol}
              </div>
              <div>
                <h4>Total Supply</h4>0
              </div>
            </div>
          </div>

          <div className="body-background">
            <center>
              <h2>
                <b>My Balance</b>
              </h2>
            </center>
            <div className="token-info">
              <div>
                <h4>Address</h4>
                <b> 0xxx...xxxx</b>
              </div>
              <div>
                <h4>Balances</h4>0
              </div>
            </div>
          </div>

          <div className="body-background">
            <center>
              <h2>
                <b>Transfer Coins</b>
              </h2>
            </center>
            <p>Reciever address: </p>
            <input type="text" name="to" placeholder="Address" />
            <p>Send Amount: </p>
            <input type="number" name="amount" placeholder="Amount" />
            <div>
              <button className="connect-btn">
                {_loading ? "Loading..." : "Transfer"}
              </button>
            </div>
          </div>
        </div>
        <div>
          <TxList txs={txs} />
        </div>
      </div>
    );
  }
}
