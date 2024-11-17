import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { fetchIssue } from "../../_common/fetchIssueFromCache";
import IssueFormSkeleton from "./loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await fetchIssue(parseInt(params.id));
  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export const generateMetadata = async ({ params }: Props) => {
  const issue = await fetchIssue(parseInt(params.id));
  return {
    title: `${issue?.title} - Edit Form`,
    description: `Edit form of issue ${issue?.id}`,
  };
};

export default EditIssuePage;
