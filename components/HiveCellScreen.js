import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
//import { INFURA_PROJECT_ID } from '@env';

const HiveCellScreen = () => {
    

const web3 = new Web3(`https://rpc.chiadochain.net`);


  const [account, setAccount] = useState(null);

  useEffect(() => {
    const createAccount = async () => {
      const newAccount = await web3.eth.accounts.create();
      setAccount(newAccount);
    };

    createAccount();
  }, []);

  const sendTransaction = async (contractAddress, abi, method, params) => {
    if (!account) {
      console.error('Account not available');
      return;
    }

    const contract = new web3.eth.Contract(abi, contractAddress);
    const data = contract.methods[method](...params).encodeABI();

    const transaction = {
      from: account.address,
      to: contractAddress,
      gas: 1000000,
      data
    };

    const signedTransaction = await web3.eth.accounts.signTransaction(transaction, account.privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
    console.log('Transaction receipt', receipt);
  };

  return (
    // Replace with your actual home screen UI
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Hive Cell Screen</Text>
    </View>
  );
};

export default HiveCellScreen;
