"use client";

import { useLanguage } from "@/context/language-context";
import React from "react";

interface TranslationWrapperProps {
    translationKey: string;
    as?: React.ElementType;
    className?: string;
}

export function TranslationWrapper({ translationKey, as: Component = "span", className }: TranslationWrapperProps) {
    const { t } = useLanguage();
    return <Component className={className}>{t(translationKey)}</Component>
}
