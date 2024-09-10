export const LeftBar = () => {
  return(
    <div className="flex flex-col h-screen basis-1/6 sticky top-0">
      <h1 className="text-3xl m-2 mb-10 font-thin">VOCA NOTE</h1>
      <button className="ml-3 px-3 py-1 mr-auto my-2 text-xl text-slate-700 rounded-md hover:bg-slate-300">新規作成 +</button>
      <button className="ml-3 px-3 py-1 mr-auto my-2 text-xl text-slate-700 rounded-md hover:bg-slate-300">IT用語</button>
      <button className="ml-3 px-3 py-1 mr-auto my-2 text-xl text-slate-700 rounded-md hover:bg-slate-300">ビジネス用語</button>
      <button className="ml-3 px-3 py-1 mr-auto my-2 text-xl text-slate-700 rounded-md hover:bg-slate-300">英単語</button>
    </div>
  )
}