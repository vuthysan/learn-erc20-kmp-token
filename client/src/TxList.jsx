import { ethers } from "ethers";

export default function TxList({ txs }) {
  if (txs.length === 0) return null;
  return (
    <div className="container">
      <h2>History</h2>
      {txs.map((item) => (
        <div>
          <div key={item.txHash}>
            <div>
              <p>From: {item.from}</p>
              <p>To: {item.to}</p>
              <p>
                Amount: <b>{ethers.utils.formatUnits(item.amount, 18)}</b>
              </p>
              <a href={`https://rinkeby.etherscan.io/tx/${item.txHash}`}>
                Check in block explorer
              </a>
            </div>
          </div>
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}
