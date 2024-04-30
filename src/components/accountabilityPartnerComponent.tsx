import React from "react";
import Image from "next/image";
import { AccountabilityPartner } from "../models/appUser";
import { Skeleton } from "./ui/skeleton";
import { FaUserCircle } from "react-icons/fa";

export const AccountabilityPartnerComponentLoading = ({
  className,
}: {
  className?: string;
}) => (
  <div
    className={`flex flex-col gap-1 justify-start items-center pr-4 animate-all ${className}`}
  >
    <Skeleton className="w-10 h-10 rounded-lg" />
    <Skeleton className="w-20 h-5 rounded-lg" />
  </div>
);

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
      {partner?.photoURL ? (
        <Image
          src={partner.photoURL}
          alt={"Partner photo"}
          fill
          className="rounded-full !relative !h-10 !w-10"
        />
      ) : (
        <FaUserCircle className="w-10 h-10 rounded-lg fill-gray-500" />
      )}
      <div key={partner.userId} className="truncate">
        {partner.displayName}
      </div>
    </div>
  );
};

export default AccountabilityPartnerComponent;
