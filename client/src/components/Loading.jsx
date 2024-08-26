export const LoaderComponent = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="loading"></div>
    </div>
  );
};

export const LoaderBtn = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="loading loading-dots loading-xs"></div>
    </div>
  );
};
