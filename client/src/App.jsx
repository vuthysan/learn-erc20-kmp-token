import { useState, useEffect } from "react";
import { ethers } from "ethers";

import { abi } from "./LuyPoint.json";
import toCurrency from "../libs/toCurrency";
import TxList from "./TxList";
import shortenAddress from "../libs/shortenAddress";

const private_key =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const contract_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [txs, setTxs] = useState([]);
  const [contract, setContract] = useState(null);
  const [_loading, setLoading] = useState(false);
  const [isNotReady, setIsNotReady] = useState(false);
  const [transfer, setTransfer] = useState({
    to: "",
    amount: 0,
  });

  const [contractInfo, setContractInfo] = useState({
    tokenName: "",
    tokenSymbol: "",
    totalSupply: 0,
  });

  const [balanceInfo, setBalanceInfo] = useState({
    address: "-",
    balance: "-",
  });

  const [wallet, setWallet] = useState("");

  async function connect() {
    setIsNotReady(true);
    const _provider = new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/"
    );

    const _wallet = new ethers.Wallet(private_key, _provider);
    const _contract = new ethers.Contract(contract_address, abi, _provider);
    setContract(_contract);
    setWallet(_wallet);

    console.log("_wallet", _wallet);
    setIsNotReady(false);

    return () => {
      contract.removeAllListeners();
    };
  }

  async function getTokenInfo() {
    let totalSupply = await contract.totalSupply();
    let _balance = parseFloat(ethers.utils.formatEther(totalSupply));

    const tokenName = await contract.name();
    const tokenSymbol = await contract.symbol();
    // const walletBalnace = await contract.balanceOf(wallet.address);

    // let _walletBalnace = parseFloat(ethers.utils.formatEther(walletBalnace));

    setContractInfo({
      tokenName,
      tokenSymbol,
      totalSupply: _balance,
    });
  }

  async function getMyBalance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const erc20 = new ethers.Contract(contract_address, abi, provider);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const balance = await erc20.balanceOf(signerAddress);

    setBalanceInfo({
      address: signerAddress,
      balance: parseFloat(ethers.utils.formatEther(balance)),
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setTransfer({ ...transfer, [name]: value });
  }

  async function handleSendToken() {
    setLoading(true);
    const { to, amount } = transfer;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const erc20 = new ethers.Contract(contract_address, abi, signer);

    const _amount = ethers.utils.parseEther(amount);
    const wei = _amount.toString();
    await erc20
      .transfer(to, wei)
      .then((res) => {
        setLoading(false);
        getTokenInfo();
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }

  useEffect(async () => {
    if (contract_address) {
      await connect();
    }
  }, []);

  // useEffect(async () => {
  //   if (contract.address) {
  //     await getTokenInfo();
  //     await getMyBalance();
  //     await contract.on("Transfer", (from, to, amount, event) => {
  //       setTxs((currentTxs) => [
  //         ...currentTxs,
  //         {
  //           txHash: event.transactionHash,
  //           from,
  //           to,
  //           amount: String(amount),
  //         },
  //       ]);
  //     });
  //   }
  // }, [contract]);

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
          {/* <pre>{JSON.stringify(transaction, 0, 4)}</pre> */}

          <label htmlFor="">Smart Contract Address</label>
          <input
            type="text"
            placeholder="Address"
            value={contract_address}
            readOnly
          />
          {/* <button className="connect-btn" onClick={handleConnectWallet}>
          Connect Wallet
        </button> */}

          {/* <button onClick={getTokenInfo}>Get Balance</button> */}

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
                <h4>Total Supply</h4>
                {toCurrency(contractInfo.totalSupply, contractInfo.tokenSymbol)}
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
                <b> {shortenAddress(wallet && balanceInfo.address)}</b>
              </div>
              <div>
                <h4>Balances</h4>
                {toCurrency(balanceInfo.balance, contractInfo.tokenSymbol)}
                {/* {ethers.utils.formatUnits(_balance, 18)} */}
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
            <input
              type="text"
              name="to"
              placeholder="Address"
              onChange={handleChange}
            />
            <p>Send Amount: </p>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              onChange={handleChange}
            />
            <div>
              <button className="connect-btn" onClick={handleSendToken}>
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
