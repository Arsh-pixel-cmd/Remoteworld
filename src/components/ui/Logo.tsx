import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Logo({
  className = "",
  imgClassName = "h-11 sm:h-13 lg:h-16 w-auto",
}: {
  className?: string;
  textClass?: string;
  imgClassName?: string;
}) {
  return (
    <Link href="/" className={`flex items-center group ${className}`}>
      <Image
        src="/logo.svg"
        alt="RemoteWard Logo"
        width={142}
        height={142}
        priority
        className={`${imgClassName} object-contain transition-transform duration-300 group-hover:scale-95`}
      />
    </Link>
  );
}

