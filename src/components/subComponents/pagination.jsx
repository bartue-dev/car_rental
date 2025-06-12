import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function VehiclePagination({currentPage, totalPage, itemsRender}) {

  //previous button function
  const handlePrev = async () => {
    if (currentPage > 1) {
      itemsRender(currentPage - 1)
    }
  };

  //next button function
  const handleNext = async () => {
    if (currentPage < totalPage) {
      itemsRender(currentPage + 1)
    }
  }

  //page number function
  const handlePageClick = async (page) => {
    itemsRender(page)
  }

  return (
    <Pagination>
      <PaginationContent>
        {/* previous button */}
        <PaginationItem>
          <PaginationPrevious 
            onClick={handlePrev}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>

        {/* pagination page */}
        {Array.from({length: totalPage}, (_, i) => i + 1).map(page => {
          return (
              <PaginationItem key={page}>
                <PaginationLink 
                  onClick={() => handlePageClick(page)}
                  isActive={currentPage === page}
                >
                  {page}

                </PaginationLink>
              </PaginationItem>
          )
        })}
      
        {/* next button */}
        <PaginationItem>
          <PaginationNext 
            onClick={handleNext}
            className={currentPage === totalPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
