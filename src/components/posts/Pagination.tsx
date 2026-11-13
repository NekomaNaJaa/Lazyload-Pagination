"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { usePagination } from "@/hooks/use-pagination";

const ITEMS_TO_DISPLAY = 5;

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage: page,
    totalPages,
    paginationItemsToDisplay: ITEMS_TO_DISPLAY,
  });

  if (totalPages <= 1) return null;

  const renderPage = (p: number) => (
    <PaginationItem key={p}>
      <Button
        variant={p === page ? "default" : "outline"}
        size="icon"
        aria-label={`Go to page ${p}`}
        aria-current={p === page ? "page" : undefined}
        onClick={() => onPageChange(p)}
      >
        {p}
      </Button>
    </PaginationItem>
  );

  return (
    <div className="mt-8 space-y-2">
      <PaginationRoot>
        <PaginationContent className="flex-wrap justify-center">
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              aria-label="Previous page"
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeftIcon />
            </Button>
          </PaginationItem>

          {showLeftEllipsis && (
            <>
              {renderPage(1)}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}

          {pages.map(renderPage)}

          {showRightEllipsis && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              {renderPage(totalPages)}
            </>
          )}

          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              aria-label="Next page"
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages}
            >
              <ChevronRightIcon />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </PaginationRoot>

      <p className="text-center text-sm text-muted-foreground">
        หน้า {page} จาก {totalPages}
      </p>
    </div>
  );
}
