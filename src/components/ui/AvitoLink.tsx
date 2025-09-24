'use client';

import React from 'react';
import { createSmartAvitoLink, handleAvitoClick } from '@/lib/avito-utils';

interface AvitoLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export default function AvitoLink({ 
  href, 
  children, 
  className = '', 
  target = '_blank',
  rel = 'noopener noreferrer',
  onClick,
  ...props 
}: AvitoLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    // Сначала вызываем пользовательский onClick если есть
    if (onClick) {
      onClick(e);
    }
    
    // Затем обрабатываем переход на Авито
    handleAvitoClick(href, e);
  };

  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}

// Компонент для простых ссылок без дополнительной обработки
export function SimpleAvitoLink({ 
  href, 
  children, 
  className = '', 
  target = '_blank',
  rel = 'noopener noreferrer',
  ...props 
}: AvitoLinkProps) {
  const smartHref = createSmartAvitoLink(href);
  
  return (
    <a
      href={smartHref}
      className={className}
      target={target}
      rel={rel}
      {...props}
    >
      {children}
    </a>
  );
}
