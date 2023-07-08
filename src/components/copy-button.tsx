import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import { copyToClipboard } from "@utils/copy-to-clipboard";

import type { ButtonProps } from "@components/basic/button";

interface CopyButtonProps extends ButtonProps {
  text: string;
}

export const CopyButton = ({ text }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const onCopyText = () => {
    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={onCopyText}
      className="hover rounded-btn flex w-12 flex-col items-center justify-center border border-base-content p-2 hover:bg-base-content/20"
    >
      {copied ? (
        <CheckIcon className="h-6 w-6" />
      ) : (
        <DocumentDuplicateIcon className="h-6 w-6" />
      )}
    </button>
  );
};
