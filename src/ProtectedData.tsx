import { useQuery } from "react-query";
import api from "./axios";
type Props = {};

const ProtectedData = (props: Props) => {
  const { isLoading, data, error } = useQuery("protectedData", async () => {
    const response = await api.get("/protected-data");

    return response.data;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <div>{data}</div>;
};

export default ProtectedData;
