"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { Suspense } from "react";

const SiteBreadcrumb = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  if (!pathname) return;

  const segments = pathname.split("/").filter((item) => item !== "");

  // TODO: add home and update to use icon
  const items: string[] = segments.map((item, index) => {
    return item;
  });
  items.unshift("home");

  return (
    <Suspense>
      <div className="py-3">
        <Breadcrumbs radius="sm" variant="solid">
          {items.map((item, index) => (
            <BreadcrumbItem key={index}>
              <Link
                key={item}
                href={`/${segments
                  .slice(0, index)
                  .join("/")}?${new URLSearchParams(searchParams?.toString())}`}
                aria-label={`Go to ${item}`}
              >
                {item}
              </Link>
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
      </div>
    </Suspense>
  );
};

export default SiteBreadcrumb;
