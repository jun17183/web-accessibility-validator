export default function Uploader() {
  return (
    <div className='w-full flex flex-row items-center gap-x-4 justify-center'>
      <div className="flex h-20 w-4/12 min-w-96 bg-white rounded-full shadow-md p-4">
        <input type='text' className='w-full box-border cursor-pointer outline-none focus:outline-none' readOnly />
        <input type='file' className='hidden' />
        <button className='h-full w-32 px-5 py-2 font-semibold text-xl bg-cyan-500 text-white rounded-full shadow-sm shadow-slate-400 box-border'>
          Upload
        </button>
      </div>
      <button className='h-14 w-24 min-w-20 px-5 py-2 font-semibold text-xl bg-blue-500 text-white rounded-full shadow-md shadow-slate-400 box-border'>
        Test 
      </button>
    </div>
  );
}