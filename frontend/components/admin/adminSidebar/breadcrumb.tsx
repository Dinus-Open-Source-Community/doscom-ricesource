'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbItems = ["home", ...segments];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((segment, index) => {
          const href = index === 0 ? "/" : "/" + segments.slice(0, index).join("/");
          const isLast = index === breadcrumbItems.length - 1;
          const label = segment === "home"
            ? "Home"
            : segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

          return (
            <div key={href} className="flex items-center">
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
