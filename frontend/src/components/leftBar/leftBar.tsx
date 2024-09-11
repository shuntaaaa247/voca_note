export const LeftBar = () => {
  return(
    <div className="flex flex-col h-screen basis-1/6 sticky top-0">
      <h1 className="text-3xl m-2 mb-10 font-thin">VOCA NOTE</h1>
      <button className="w-[85%] py-1 px-2 my-2 mx-4 text-xl text-left text-slate-700 rounded-md hover:bg-slate-300">新規作成 +</button>
      <button className="w-[85%] py-1 px-2 my-2 mx-4 text-xl text-left text-slate-700 rounded-md hover:bg-slate-300">IT用語</button>
      <button className="w-[85%] py-1 px-2 my-2 mx-4 text-xl text-left text-slate-700 rounded-md hover:bg-slate-300">ビジネス用語</button>
      <button className="w-[85%] py-1 px-2 my-2 mx-4 text-xl text-left text-slate-700 rounded-md hover:bg-slate-300">英単語</button>
    </div>
  )
}