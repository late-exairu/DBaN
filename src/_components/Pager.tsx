import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { type ResponseData } from "@/types";

type PagerProps = {
  data: ResponseData | undefined;
  currentPage: number;
  handlePageChange: (page: number) => void;
};

export default function Pager(props: PagerProps) {
  const { data, currentPage, handlePageChange } = props;

  const pagesCount = Math.ceil((data?.count ?? 0) / 20);

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const pagesArray = Array.from(Array(pagesCount).keys()).map((i) => i + 1);
  const pagesActualArray = pagesArray.filter(
    (page) => page >= currentPage - 2 && page <= currentPage + 2,
  );

  if (!data) return null;

  // console.log({ currentPage });
  // console.log({ pagesCount });
  // console.log({ pagesArray });

  return (
    <Pagination className="mt-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(prevPage)}
            href={{
              pathname: "./",
              query: { page: prevPage },
            }}
          />
        </PaginationItem>
        {currentPage - 2 > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pagesActualArray.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => handlePageChange(page)}
              href={{
                pathname: "./",
                query: { page: page },
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentPage + 2 < pagesCount && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(nextPage)}
            href={{
              pathname: "./",
              query: { page: nextPage },
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
