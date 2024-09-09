export default function About() {
  const vocas = [
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "SaaS",
      meaning: "ソフトウェア as a サービス"
    },
    {
      word: "PaaS",
      meaning: "プラットフォーム as a サービス"
    }
  ]
  return (
    <main className="flex justify-start">
      <div className="flex flex-col h-screen basis-1/6 sticky top-0">
        <h1 className="text-3xl m-2 mb-10 font-thin">VOCA NOTE</h1>
        <button className="ml-3 px-3 py-1 mr-auto my-2 text-xl text-slate-700 rounded-md hover:bg-slate-300">新規作成 +</button>
        <button className="ml-3 px-3 py-1 mr-auto my-2 text-xl text-slate-700 rounded-md hover:bg-slate-300">IT用語</button>
        <button className="ml-3 px-3 py-1 mr-auto my-2 text-xl text-slate-700 rounded-md hover:bg-slate-300">ビジネス用語</button>
        <button className="ml-3 px-3 py-1 mr-auto my-2 text-xl text-slate-700 rounded-md hover:bg-slate-300">英単語</button>
      </div>
      <div className="basis-5/6 flex justify-start my-5 py-20 mr-3 rounded-3xl shadow-xl overflow-auto bg-slate-50">
        <div className="basis-full ">
          <h2 className="pb-3 ml-7 mr-2 text-4xl text-slate-700 font-medium border-b-2">IT用語</h2>
          <ul className="my-4 mx-2">
            {vocas.map((voca, index) => (
              <li key={index} className="pl-2">
                <div className="flex justify-start">
                  <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
                  <div className="w-full border-b">
                    <p className="text-xl my-1 text-slate-700 font-medium">{voca.word}</p>
                    <p className="text-xl my-1 text-slate-700 font-medium">{voca.meaning}</p>
                  </div>
                </div>
              </li>
            ))}
            <li className="pl-2 h-[70px]">
              <div className="flex justify-start">
                <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
                <div className="w-full border-b">
                </div>
              </div>
            </li>
            <li className="pl-2 h-[70px]">
              <div className="flex justify-start">
                <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
                <div className="w-full border-b">
                </div>
              </div>
            </li>
            <li className="pl-2 h-[70px]">
              <div className="flex justify-start">
                <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
                <div className="w-full border-b">
                </div>
              </div>
            </li>
            <li className="pl-2 h-[70px]">
              <div className="flex justify-start">
                <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
                <div className="w-full border-b">
                </div>
              </div>
            </li>
            <li className="pl-2 h-[70px]">
              <div className="flex justify-start">
                <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
                <div className="w-full border-b">
                </div>
              </div>
            </li>
            <li className="pl-2 h-[70px]">
              <div className="flex justify-start">
                <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
                <div className="w-full border-b">
                </div>
              </div>
            </li>
            <li className="pl-2 h-[70px]">
              <div className="flex justify-start">
                <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
                <div className="w-full border-b">
                </div>
              </div>
            </li>
            <li className="pl-2 h-[70px]">
              <div className="flex justify-start">
                <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
                <div className="w-full border-b">
                </div>
              </div>
            </li>
            <li className="pl-2 h-[70px]">
              <div className="flex justify-start">
                <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
                <div className="w-full border-b">
                </div>
              </div>
            </li>
            <li className="pl-2 h-[70px]">
              <div className="flex justify-start">
                <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
                <div className="w-full border-b">
                </div>
              </div>
            </li>
            <li className="pl-2 h-[70px]">
              <div className="flex justify-start">
                <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
                <div className="w-full border-b">
                </div>
              </div>
            </li>
            <li className="pl-2 h-[70px]">
              <div className="flex justify-start">
                <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
                <div className="w-full border-b">
                </div>
              </div>
            </li>
            <li className="pl-2 h-[70px]">
              <div className="flex justify-start">
                <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
                <div className="w-full border-b">
                </div>
              </div>
            </li>
            <li className="pl-2 h-[70px]">
              <div className="flex justify-start">
                <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
                <div className="w-full border-b">
                </div>
              </div>
            </li>
            <li className="pl-2 h-[70px]">
              <div className="flex justify-start">
                <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
                <div className="w-full border-b">
                </div>
              </div>
            </li>
            <li className="pl-2 h-[70px]">
              <div className="flex justify-start">
                <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
                <div className="w-full border-b">
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}