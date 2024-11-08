const PageLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-white z-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>
  );
};

export default PageLoader;