import { useState, useEffect } from 'react';
import { walletService } from '../services/wallet.service';

export function useWallet() {
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWalletData = async () => {
    setIsLoading(true);
    try {
      const [balanceRes, transactionsRes] = await Promise.all([
        walletService.getBalance(),
        walletService.getTransactions(),
      ]);
      if (balanceRes.success) setBalance(balanceRes.data);
      if (transactionsRes.success) setTransactions(transactionsRes.data);
    } catch (err) {
      setError(err.message || 'حدث خطأ في جلب بيانات المحفظة');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  return { balance, transactions, isLoading, error, refetch: fetchWalletData };
}
