import "@tanstack/react-table";

declare type Params = {
  searchParams: Promise<SearchParams>;
};

declare type Nullable<T> = T | null;

declare type WrappedComponentProps = {
  children: React.ReactNode;
};
