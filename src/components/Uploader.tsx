export default function Uploader() {
  return (
    <div className="h-screen min-w-500px pt-10 pb-10 px-6 flex flex-row items-center gap-x-4 justify-center">
      <div className="flex h-20 w-4/12 min-w-96 bg-white rounded-full shadow-md p-4">
        <input className='w-full box-border outline-none focus:outline-none'/>
        <button className="h-full w-32 px-5 py-2 font-semibold text-lg bg-cyan-500 text-white rounded-full shadow-sm shadow-slate-400 box-border">업로드</button>
      </div>
      <button className="h-14 w-24 min-w-20 px-5 py-2 font-semibold text-xl bg-blue-500 text-white rounded-full shadow-md shadow-slate-400 box-border">검사</button>
    </div>
  );
}