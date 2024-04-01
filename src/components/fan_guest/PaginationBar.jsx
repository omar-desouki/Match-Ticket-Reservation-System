import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PaginationBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [lastPage, setLastPage] = useState(1);

  const page = Number(searchParams.get("page")) || 1;
  const itemsPerPage = Number(searchParams.get("itemsPerPage")) || 10;

  useEffect(() => {
    fetch("/api/match/info/count/")
      .then((res) => res.text())
      .then((count) => {
        setLastPage(Math.ceil(count / itemsPerPage));
      });
  }, []);

  const changeSearchParams = (value) => {
    const url =
      "/fan/matches?" +
      new URLSearchParams({
        page: value,
        itemsPerPage: itemsPerPage,
      }).toString();
    router.push(url);
  };

  return (
    <>
      <div className="p-5 flex justify-center bg-accent-content">
        <div className="join bg-primary">
          <button
            className="join-item btn"
            onClick={() => changeSearchParams(page - 1)}
            disabled={page <= 1}
          >
            «
          </button>
          <button className="join-item btn">Page {page}</button>
          <button
            className="join-item btn"
            onClick={() => changeSearchParams(page + 1)}
            disabled={page >= lastPage}
          >
            »
          </button>
        </div>
      </div>
    </>
  );
};

export default PaginationBar;
