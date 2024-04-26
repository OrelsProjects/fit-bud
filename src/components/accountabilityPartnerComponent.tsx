import React from "react";
import { AccountabilityPartner } from "../models/appUser";

const AccountabilityPartnerComponent: React.FC<{
  partner: AccountabilityPartner;
  signed?: boolean;
  onClick?: (partner: AccountabilityPartner) => void;
  className?: string;
}> = ({ partner, signed, onClick, className }) => {
  return (
    <div
      className={`flex flex-col gap-1 justify-start items-center pr-4 animate-all ${!signed && "grayscale"} ${className}`}
      onClick={() => onClick?.(partner)}
    >
      <img
        src={partner?.photoURL ?? ""}
        alt={"Partner photo"}
        className="rounded-lg h-10 w-10 object-cover"
      />
      <div key={partner.userId} className="truncate">
        {partner.displayName}
      </div>
    </div>
  );
};

export default AccountabilityPartnerComponent;