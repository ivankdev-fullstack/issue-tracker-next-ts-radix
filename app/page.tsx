import LatestIssues from "./LatestIssues";

interface Props {
  searchParams: { page: string };
}

export default function Homepage({ searchParams }: Props) {
  return (
    <>
      <LatestIssues />
    </>
  );
}
