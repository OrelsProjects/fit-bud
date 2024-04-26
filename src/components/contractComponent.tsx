import React, { useMemo } from "react";
import { AccountabilityPartner } from "../models/appUser";
import AccountabilityPartnerComponent from "./accountabilityPartnerComponent";
import { useContracts } from "../lib/hooks/useContracts";
import { useAppSelector } from "../lib/hooks/redux";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import ContractViewComponent from "./contractViewComponent";
import Contract from "../models/contract";

interface ContractComponentProps {
  contract: Contract;
}

const ContractComponent: React.FC<ContractComponentProps> = ({ contract }) => {
  const { signContract } = useContracts();
  const { user } = useAppSelector(state => state.auth);

  const isUserSigned = useMemo(
    () =>
      contract.signatures.some(signature => signature.userId === user?.userId),
    [contract.signatures, user],
  );

  const handleSignContract = () => {
    toast.promise(signContract(contract.contractId, user), {
      pending: "Signing contract...",
      success: "Contract signed!",
      error: "Failed to sign contract",
    });
  };

  return (
    <div className="h-full w-full border border-muted-foreground/50 rounded-md flex flex-col justify-between gap-1 p-3">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <h1 className="font-semibold text-lg truncate">{contract.title}</h1>
          {user &&
            (!isUserSigned ? (
              <Button onClick={handleSignContract} className="relative">
                Sign contract
                <div className="shimmer-wrapper"></div>
              </Button>
            ) : (
              <ContractViewComponent contract={contract} />
            ))}
        </div>
        <h3 className="font-normal text-base line-clamp-2">
          {contract.description}
        </h3>
        <h4 className="font-normal text-base text-muted-foreground truncate">
          {new Date(contract.dueDate).toDateString()}
        </h4>
      </div>
      <div className="w-full flex flex-row justify-around gap-1">
        {contract.contractees.map(contractee => (
          <AccountabilityPartnerComponent
            key={contractee.userId}
            partner={contractee}
            signed={contract.signatures.some(
              signature => signature.userId === contractee.userId,
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default ContractComponent;