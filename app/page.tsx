import Pagination from "./components/Pagination";

interface Props {
  searchParams: { page: string };
}

export default function Homepage({ searchParams }: Props) {
  return (
    <>
      <Pagination
        itemCount={100}
        pageSize={10}
        curPage={parseInt(searchParams.page)}
      />
    </>
  );
}
