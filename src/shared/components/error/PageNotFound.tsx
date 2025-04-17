const PageNotFound = () => {
  return (
    <div className="flex h-[calc(100vh-112px)] flex-col items-center justify-center">
      <img src="/image/download/page-not-found.svg" alt="요청하신 페이지를 찾을 수 없습니다" />
      <p className="mt-6 font-light text-gray-medium">요청하신 페이지를 찾을 수 없습니다</p>
    </div>
  )
}

export default PageNotFound
