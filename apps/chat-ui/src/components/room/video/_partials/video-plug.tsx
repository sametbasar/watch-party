export default function VideoPlug({ username }: { username: string }) {
  return (
    <div className="relative flex aspect-video w-full items-center justify-center">
      <div className="absolute left-0 top-0 h-full w-full rounded-[12px] border border-gray-500 bg-black/10 backdrop-blur-2xl" />
      <span className="relative z-10 text-2xl text-white">{username}</span>
    </div>
  );
}
