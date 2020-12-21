import React from 'react';
import ReactPaginate from 'react-paginate';
import 'styles/pagination.css'

type PaginationProps = {
  facilitySize: number; //ページ数を計算するために必要な全facilityの数
  // handleSearchUser: () => void;  // facilityを検索する関数
  setCurrentPageNumber: (page: number) => void;
}

const ONE_PAGE_DISPLAY_FACILITY = 10;
const LAST_DISPLAY_SIZE = 20;
const AROUND_DISPLAY_PAGES = 5;

const Pagination = (props: PaginationProps) => {
  const { facilitySize, setCurrentPageNumber } = props;

  const handlePaginate = (selectedItem: { selected: number }) => {
    const page = selectedItem.selected + 1;
    setCurrentPageNumber(page);
  };


  const arrowIcon = (iconName: 'left' | 'right') => {
    return (
      <i className={`fas fa-chevron-${iconName}`}></i>
    );
  };

  // ページ数の計算
  const calculatePageCount = () => {
    return Math.ceil(facilitySize / ONE_PAGE_DISPLAY_FACILITY)
  };

  // ページネーションを表示
  return (
    <div>
      <ReactPaginate
        pageCount={calculatePageCount()}
        marginPagesDisplayed={LAST_DISPLAY_SIZE}
        pageRangeDisplayed={AROUND_DISPLAY_PAGES}
        onPageChange={handlePaginate}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="active"
        activeLinkClassName="active"
        previousLinkClassName="previous-link"
        nextLinkClassName="next-link"
        previousLabel={arrowIcon('left')}
        nextLabel={arrowIcon('right')}
        disabledClassName="disabled-button"
      />
    </div>
  );
};

export default Pagination;
