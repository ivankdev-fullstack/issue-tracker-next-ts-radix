import Pagination from "./components/Pagination";

export default function Homepage() {
  return (
    <>
      <Pagination itemCount={100} pageSize={10} curPage={1} />
    </>
  );
}
