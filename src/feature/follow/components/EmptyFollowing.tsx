const EmptyFollowing = () => {
  return (
    <div className="flex h-[calc(100vh-112px)] flex-col items-center justify-center">
      <img src="/image/download/empty-following.svg" alt="팔로잉 중인 채널이 없어요" />
      <p className="mt-6 font-light text-gray-medium">팔로잉 중인 채널이 없어요</p>
    </div>
  )
}

export default EmptyFollowing
