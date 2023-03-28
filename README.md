# react-q-axios-api-tutor

- To install tanstack query
  `yarn add @tanstack/react-query`
- To install dev-tools
  ` yarn add @tanstack/react-query-devtools`

- Wrap your app with react query

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

- Query is getting data from somewhere
- Mutation is changing data

```tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const POSTS = [
  { id: "1", title: "Post 1" },
  { id: "2", title: "Post 2" },
];

// every slash is a new element in the array
// posts ["posts"]
// posts/1 ["posts",post.id]
// posts?authorId=1 ["posts",{authorId:1}] you can use an object for a filter
// posts/2/comments ["posts",post.id,"comments"]


function App() {
  const postQuery = useQuery({
    queryKey: ["posts"], // unique idetifier for query
    queryFn: () => wait(4000).then(() => [...POSTS]),
  });

  const queryClient = useQueryClient();
  if (postQuery.isLoading) return <h1>Loading......</h1>;
  if (postQuery.isError) return <pre>{JSON.stringify(postQuery.error)}</pre>;

  return (
    <div className="App">
      Tanstack
      {postQuery.data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
export default App;
```

`yarn add -D @types/js-cookie`