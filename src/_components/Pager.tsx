import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PagerProps = {
  itemsCount: number | undefined;
  currentPage: number;
  pageSize?: number;
  handlePageChange: (page: number) => void;
};

export default function Pager(props: PagerProps) {
  const { itemsCount, currentPage, handlePageChange, pageSize = 24 } = props;
  const pagesCount = Math.ceil((itemsCount ?? 0) / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const pagesArray = Array.from(Array(pagesCount).keys()).map((i) => i + 1);
  const pagesActualArray = pagesArray.filter(
    (page) => page >= currentPage - 2 && page <= currentPage + 2,
  );

  if (!itemsCount) return null;
  if (pagesCount <= 1) return null;

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
