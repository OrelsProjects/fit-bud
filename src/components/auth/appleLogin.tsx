import React from "react";
import useAuth from "../../lib/hooks/useAuth";
import { FaApple } from "react-icons/fa";

interface AppleLoginProps {
  className?: string;
  signInTextPrefix?: string;
  referralCode?: string;
}

export default function AppleLogin({
  className,
  signInTextPrefix,
  referralCode,
}: AppleLoginProps) {
  const { signInWithApple } = useAuth();

  const handleAppleLogin = async () => {
    await signInWithApple({ referralCode });
  };

  return (
    <div
      className={`w-full h-12 flex flex-row gap-2 justify-center hover:cursor-pointer items-center bg-black rounded-lg text-white ${className}`}
      onClick={handleAppleLogin}
    >
      <FaApple className="w-7 h-7" />
      <h1 className="uppercase">{signInTextPrefix} Apple</h1>
    </div>
  );
}