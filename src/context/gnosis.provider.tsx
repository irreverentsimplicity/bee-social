import React, {createContext, useContext, PropsWithChildren} from 'react';
import {Account} from 'web3-core';
import {useBalance} from '../hooks/useBalance';
import {useTransactionHistory} from '../hooks/useTransactionHistory';
import {CurrencyTypes, useConfig} from '../hooks/useConfig';
import {useAccount} from '../hooks/useAccount';
import {Transaction} from '../libs/scan';

export interface GnosisAccountContext {
  account: Account | null;
  balance: string | null;
  isBalanceLoading: boolean;
  history: Transaction[];
  isHistoryLoading: boolean;
  currencyPostfix: string | undefined;
  loadWallet: (privateKey: string | null) => void;
  resetAccount: () => void;
}

// Ignoring missing initialValue, because there's always a provider and value is provided
//
// @ts-ignore - value is provided in index.tsx
export const GnosisAccountState = createContext<CurrencyAccountContext>();

export const useGnosisAccountState = () => useContext(GnosisAccountState);

export type GnosisAccountProviderProps = {
  //
};

export const GnosisAccountProvider = ({
  children,
}: PropsWithChildren<GnosisAccountProviderProps>) => {
  const type = CurrencyTypes.xdai;
  const {account, loadWallet, resetAccount} = useAccount(type);
  const {currencyPostfix} = useConfig(type);

  const {balance, isLoading: isBalanceLoading} = useBalance(
    account?.address,
    type,
  );

  const {history, isLoading: isHistoryLoading} = useTransactionHistory(
    account?.address,
    type,
  );

  const state: GnosisAccountContext = {
    account,
    balance,
    isBalanceLoading,
    history,
    isHistoryLoading,
    currencyPostfix,
    loadWallet,
    resetAccount,
  };

  return (
    <GnosisAccountState.Provider value={state}>
      {children}
    </GnosisAccountState.Provider>
  );
};
