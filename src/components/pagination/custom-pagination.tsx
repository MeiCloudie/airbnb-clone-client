import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

interface PaginationProps {
  pageIndex: number
  setPageIndex: (index: number) => void
  totalPages: number
}

const CustomPagination = ({ pageIndex, setPageIndex, totalPages }: PaginationProps) => {
  const isFirstPage = pageIndex === 1
  const isLastPage = pageIndex === totalPages

  const renderPaginationItems = () => {
    const paginationItems = []

    if (totalPages <= 5) {
      // Hiển thị tất cả trang nếu số lượng trang <= 5
      for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(
          <PaginationItem key={i}>
            <PaginationLink isActive={i === pageIndex} onClick={() => setPageIndex(i)}>
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }
    } else {
      // Nếu số trang > 5, hiển thị dạng phân cách với PaginationEllipsis
      paginationItems.push(
        <PaginationItem key={1}>
          <PaginationLink isActive={pageIndex === 1} onClick={() => setPageIndex(1)}>
            1
          </PaginationLink>
        </PaginationItem>
      )

      if (pageIndex > 3) {
        paginationItems.push(<PaginationEllipsis key='start-ellipsis' />)
      }

      const startPage = Math.max(2, pageIndex - 1)
      const endPage = Math.min(totalPages - 1, pageIndex + 1)

      for (let i = startPage; i <= endPage; i++) {
        paginationItems.push(
          <PaginationItem key={i}>
            <PaginationLink isActive={i === pageIndex} onClick={() => setPageIndex(i)}>
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }

      if (pageIndex < totalPages - 2) {
        paginationItems.push(<PaginationEllipsis key='end-ellipsis' />)
      }

      paginationItems.push(
        <PaginationItem key={totalPages}>
          <PaginationLink isActive={pageIndex === totalPages} onClick={() => setPageIndex(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return paginationItems
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {/* Nút Previous, disabled nếu đang ở trang 1 */}
          <PaginationPrevious
            onClick={() => setPageIndex(Math.max(pageIndex - 1, 1))}
            className={isFirstPage ? 'cursor-not-allowed opacity-50' : ''}
            aria-disabled={isFirstPage}
          />
        </PaginationItem>

        {/* Render pagination items */}
        {renderPaginationItems()}

        <PaginationItem>
          {/* Nút Next, disabled nếu không còn dữ liệu */}
          <PaginationNext
            onClick={() => setPageIndex(Math.min(pageIndex + 1, totalPages))}
            className={isLastPage ? 'cursor-not-allowed opacity-50' : ''}
            aria-disabled={isLastPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default CustomPagination
