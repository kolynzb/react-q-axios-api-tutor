import { useQuery } from "@tanstack/react-query";
import api from "./axios";
type Props = {};

const ProtectedData = (props: Props) => {
  const jobsQuery = useQuery({
    queryKey: ["jobs"], // unique idetifier for query
    queryFn: () => api.get("/jobs_detail/"),
  });

  if (jobsQuery.isLoading) return <div>Loading...</div>;

  console.log(jobsQuery.error);
  if (jobsQuery.error) return <div>{(jobsQuery as any).error.message}</div>;

  return <div>Data has loaded</div>;
  // return <div>{(jobsQuery as any).data}</div>;
};

export default ProtectedData;
