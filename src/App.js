import React, { useState } from "react";
import Web3 from "web3";
import Nav from "./components/Nav.js";
import { simpleStorage } from "./abi/abi";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import './App.css';

const web3 = new Web3(Web3.givenProvider);
const contractAddress = "0x3CC583d276B548f644D47f95fe170C8DeE71C39c";
const storageContract = new web3.eth.Contract(simpleStorage, contractAddress);

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
 }));

function App() {
  const classes = useStyles();
  const [number, setUint] = useState(0);
  const [getNumber, setGet] = useState("0");

  const numberSet = async (t) => {
    t.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await storageContract.methods.set(number).estimateGas();
    const post = await storageContract.methods.set(number).send({
      from: account,
      gas,
    });
  };

  const numberGet = async (t) => {
    t.preventDefault();
    const post = await storageContract.methods.get().call();
    setGet(post);

  };

  return (
    <div className={classes.root}>
      <Nav />
      <div className="main">
        <div className="card">
          <TextField
            id="outlined-basic"
            label="Set your uint256:"
            onChange={(t) => setUint(t.target.value)}
            variant="outlined"
          />
          <form className="form" onSubmit={numberSet}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              value="Confirm"
            >
              Confirm
            </Button>
            <br />
            <Button
              variant="contained"
              color="secondary"
              onClick={numberGet}
              type="button"
            >
              Get your uint256
            </Button>
            {getNumber}
          </form>
        </div>
      </div>
    </div>
  );
 }

export default App;
