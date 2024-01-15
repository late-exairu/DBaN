"use client";

import React, { type ReactNode } from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";

type TBreadCrumbProps = {
  id: number;
  gameName: string;
  homeElement: ReactNode;
  separator: ReactNode;
  className?: string;
  listClasses?: string;
  activeClasses?: string;
};

const Breadcrumb = ({
  id,
  gameName,
  homeElement,
  separator,
  className,
  listClasses,
  activeClasses,
}: TBreadCrumbProps) => {
  const paths = usePathname();
  const pathLinks = paths.split("/").filter((path) => path);
  const pathNames = pathLinks.map((path) => {
    return path === id.toString() ? gameName : path;
  });

  return (
    <div>
      <ul className={`${className} flex-wrap`}>
        <li className={listClasses}>
          <Link href={"/"}>{homeElement}</Link>
        </li>
        {pathLinks.length > 0 && separator}
        {pathLinks.map((link, index) => {
          const href = `/${pathLinks.slice(0, index + 1).join("/")}`;
          const itemClasses =
            paths === href ? `${listClasses} ${activeClasses}` : listClasses;
          return (
            <React.Fragment key={index}>
              <li className={itemClasses}>
                <Link href={href}>{pathNames[index]}</Link>
              </li>
              {pathLinks.length !== index + 1 && separator}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumb;
