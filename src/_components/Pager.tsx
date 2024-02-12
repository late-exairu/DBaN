import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { type ApiResponse, type GameData } from "@/types";

type PagerProps = {
  data: ApiResponse<GameData> | undefined;
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
      <PaginationContent className="flex-wrap">
        {/* prev page */}
        {currentPage - 1 > 0 && (
          <PaginationItem>
            <PaginationPrevious
              className="h-8 w-auto min-w-8 px-2"
              onClick={() => handlePageChange(prevPage)}
              href={{
                pathname: "",
                query: { page: prevPage },
              }}
            />
          </PaginationItem>
        )}

        {/* first page */}
        {currentPage - 2 > 1 && (
          <PaginationItem key={1}>
            <PaginationLink
              className="h-8 w-auto min-w-8 px-2"
              onClick={() => handlePageChange(1)}
              href={{
                pathname: "",
                query: { page: 1 },
              }}
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {/* map all pages */}
        {pagesActualArray.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              className="h-8 w-auto min-w-8 px-2"
              isActive={page === currentPage}
              onClick={() => handlePageChange(page)}
              href={{
                pathname: "",
                query: { page: page },
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* last page */}
        {currentPage + 2 < pagesCount && (
          <PaginationItem>
            <PaginationLink
              className="h-8 w-auto min-w-8 px-2"
              onClick={() => handlePageChange(pagesCount)}
              href={{
                pathname: "",
                query: { page: pagesCount },
              }}
            >
              {pagesCount}
            </PaginationLink>
          </PaginationItem>
        )}

        {/* next page */}
        {currentPage + 1 <= pagesCount && (
          <PaginationItem>
            <PaginationNext
              className="h-8 w-auto min-w-8 px-2"
              onClick={() => handlePageChange(nextPage)}
              href={{
                pathname: "",
                query: { page: nextPage },
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
