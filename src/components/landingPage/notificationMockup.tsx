import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { cn } from "../../lib/utils";

export interface NotificationMockupProps {
  title: string;
  body: string;
  image?: string;
  state?: "show" | "hide" | "idle";
  className?: string;
}

const NotificationMockup: React.FC<NotificationMockupProps> = ({
  title,
  body,
  image,
  state,
  className,
}) => {
  return (
    // Make it appear like a notification, with animation from top to bottom and shadow
    <AnimatePresence>
      {state === "show" && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "relative w-11/12 h-48 flex flex-col gap-0 justify-center items-center rounded-xl bg-background notification-shadow px-2 pt-2 select-none",
            className,
          )}
        >
          <div className="w-full text-white/40 text-[10px] font-medium text-end mt-1.5">
            now
          </div>
          <div className="w-full h-full flex flex-row items-start ">
            {image && (
              <Image
                src={image}
                alt="notification"
                fill
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className="rounded-[1.75rem] z-0 !relative !h-8 !w-8"
              />
            )}
            <div className="w-fit flex-shrink h-16 flex flex-col gap-0 px-2 pt-0.5">
              <span className="text-xs font-semibold truncate">{title}</span>
              <span className="text-xs">{body}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationMockup;