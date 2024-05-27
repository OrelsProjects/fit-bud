import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import Contract, {
  ContractWithExtras,
  CreateContract,
  UpdateContract,
} from "../../models/contract";
import { setError } from "../features/auth/authSlice";
import {
  setContracts as setContractsAction,
  addContract as addContractAction,
  updateContract as updateContractAction,
  deleteContract as deleteContractAction,
  signContract as signContractAction,
  setLoadingData as setLoadingDataAction,
  setLoading,
} from "../features/contracts/contractsSlice";
import { AccountabilityPartner } from "../../models/appUser";
import { Logger } from "../../logger";
import { useObligations } from "./useObligations";

export function useContracts() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { fetchNextUpObligations } = useObligations();
  const { contracts, error, loading, loadingData } = useAppSelector(
    state => state.contracts,
  );

  const fetchContracts = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get("/api/contract");
      dispatch(setContractsAction(response.data.result));
      dispatch(setError(null));
    } catch (err: any) {
      dispatch(setError(err.message || "Error fetching contracts"));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const createContract = async (contractData: CreateContract) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post<ContractWithExtras>(
        "/api/contract",
        contractData,
      );
      await fetchNextUpObligations();
      dispatch(addContractAction(response.data));
      dispatch(setError(null));
      const otherUser = contractData.contractees.find(
        contractee => contractee.userId !== user?.userId,
      );
      axios
        .post("/api/notifications", {
          title: "Put your pinky in!",
          body: `${otherUser?.displayName} sent you a new contract!`,
          userId: otherUser?.userId,
        })
        .catch(err => {
          Logger.error("Error sending notification", err);
        });
    } catch (err: any) {
      dispatch(setError(err.message || "Error creating contract"));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const setLoadingData = (loading: boolean = true) => {
    dispatch(setLoadingDataAction(loading));
  };

  const setContracts = (contracts: ContractWithExtras[]) => {
    dispatch(setContractsAction(contracts));
  };

  // const updateContract = async (contractData: Contract) => {
  //   dispatch(setLoading(true));
  //   try {
  //     const response = await axios.patch<Contract>(
  //       `/api/contract/${contractData.contractId}`,
  //       contractData,
  //     );
  //     dispatch(updateContractAction(response.data));
  //     dispatch(setError(null));
  //   } catch (err: any) {
  //     dispatch(setError(err.message || "Error updating contract"));
  //     throw err;
  //   } finally {
  //     dispatch(setLoading(false));
  //   }
  // };

  const deleteContract = async (contractId: string) => {
    dispatch(setLoading(true));
    try {
      await axios.delete(`/api/contract/${contractId}`);
      dispatch(deleteContractAction(contractId));
      dispatch(setError(null));
    } catch (err: any) {
      dispatch(setError(err.message || "Error deleting contract"));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const signContract = async (
    contractId: string,
    accountabilityPartner?: AccountabilityPartner | null,
  ) => {
    dispatch(setLoading(true));
    try {
      if (!accountabilityPartner) {
        throw new Error("Accountability partner is required");
      }
      await axios.post(`/api/contract/${contractId}/sign`);

      dispatch(signContractAction({ contractId, user: accountabilityPartner }));
      dispatch(setError(null));
      await fetchNextUpObligations();
    } catch (err: any) {
      dispatch(setError(err.message || "Error signing contract"));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateContract = async (
    contract: ContractWithExtras,
    values: UpdateContract,
  ) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.patch(
        `/api/contract/${contract.contractId}`,
        values,
      );
      const newContract = { ...contract, ...values };
      dispatch(updateContractAction(newContract));
      dispatch(setError(null));
    } catch (err: any) {
      dispatch(setError(err.message || "Error updating contract"));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const optOut = async (contractId: string) => {
    dispatch(setLoading(true));
    try {
      const contract = contracts.find(
        contract => contract.contractId === contractId,
      );
      const otherUser = contract?.signatures.find(
        signedContractee => signedContractee.userId !== user?.userId,
      );

      await axios.post(`/api/contract/${contractId}/opt-out`);
      dispatch(deleteContractAction(contractId));
      dispatch(setError(null));
      await fetchNextUpObligations();

      if (otherUser) {
        axios
          .post(`/api/notifications`, {
            title: `${user?.displayName?.split(" ")?.[0]} left. 😢`,
            body: `${user?.displayName} has left ${contract?.title}.`,
            userId: otherUser?.userId,
          })
          .catch(err => {
            Logger.error("Error sending notification", err);
          });
      }
    } catch (err: any) {
      dispatch(setError(err.message || "Error signing contract"));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    error,
    optOut,
    loading,
    contracts,
    loadingData,
    setContracts,
    signContract,
    fetchContracts,
    setLoadingData,
    createContract,
    updateContract,
    deleteContract,
  };
}
