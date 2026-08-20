import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
};

export default function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
    .filter(
      (page) =>
        page === 1 ||
        page === totalPages ||
        Math.abs(page - currentPage) <= 1
    );

  function pageHref(page: number) {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    params.set("page", String(page));
    return `?${params.toString()}`;
  }

  return (
    <nav className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <PageLink
        href={pageHref(Math.max(currentPage - 1, 1))}
        disabled={currentPage <= 1}
        label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </PageLink>

      {pages.map((page, index) => {
        const previousPage = pages[index - 1];
        const showGap = previousPage && page - previousPage > 1;

        return (
          <span key={page} className="flex items-center gap-2">
            {showGap && <span className="px-1 text-gray-400">...</span>}
            <Link
              href={pageHref(page)}
              className={`min-w-10 border px-3 py-2 text-center text-sm font-bold ${
                page === currentPage
                  ? "border-orange-600 bg-orange-600 text-white"
                  : "border-gray-200 text-gray-700 hover:border-orange-300 hover:text-orange-600"
              }`}
            >
              {page}
            </Link>
          </span>
        );
      })}

      <PageLink
        href={pageHref(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage >= totalPages}
        label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </PageLink>
    </nav>
  );
}

function PageLink({
  href,
  disabled,
  label,
  children,
}: {
  href: string;
  disabled: boolean;
  label: string;
  children: React.ReactNode;
}) {
  if (disabled) {
    return (
      <span
        aria-label={label}
        className="inline-flex h-10 w-10 items-center justify-center border border-gray-100 text-gray-300"
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      aria-label={label}
      href={href}
      className="inline-flex h-10 w-10 items-center justify-center border border-gray-200 text-gray-700 hover:border-orange-300 hover:text-orange-600"
    >
      {children}
    </Link>
  );
}
