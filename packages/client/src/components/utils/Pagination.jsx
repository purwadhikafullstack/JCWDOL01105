import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
const Pagination = ({ page, lastPage, setPage }) => {
  const scrollTop = () => {
    scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  };

  const handleNextPage = () => {
    setPage((prevState) => prevState + 1);
    scrollTop();
  };
  const handlePrevPage = () => {
    setPage((prevState) => prevState - 1);
    scrollTop();
  };

  const handleLastPage = () => {
    setPage((prevState) => (prevState = lastPage));
    scrollTop();
  };

  return (
    <div className="flex justify-center items-center py-4 px-2 gap-4 text-color-secondary text-2xl">
      {page <= 1 ? null : (
        <button
          onClick={handlePrevPage}
          className="transition-all hover:text-color-pallete1"
        >
          <ArrowLeft size={32} />
        </button>
      )}
      <p>
        {page} of {lastPage}
      </p>
      {page >= lastPage ? null : (
        <button
          onClick={handleNextPage}
          className="transition-all hover:text-color-pallete1"
        >
          <ArrowRight size={32} />
        </button>
      )}
      {page >= lastPage ? null : (
        <button
          onClick={handleLastPage}
          className="transition-all hover:text-color-pallete1 "
        >
          Last Page
        </button>
      )}
    </div>
  );
};

export default Pagination;
