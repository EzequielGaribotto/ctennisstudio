"use client";

import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import Tooltip from "../tooltip/Tooltip";
import { useTranslation } from "../../context/TranslationContext";
import { EmailButtonProps } from "../../models/interfaces";

export default function EmailButton({ email, className = "" }: EmailButtonProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };
  
  return (
    <Tooltip 
      text={t("tooltips.email")}
      alternateText={t("tooltips.emailCopied")}
      showAlternate={copied}
    >
      <button
        onClick={copyToClipboard}
        className={`p-2 rounded-full transition-all duration-500 ease-in-out ${className}`}
      >
        <FaEnvelope size={20} color="white" />
      </button>
    </Tooltip>
  );
}
