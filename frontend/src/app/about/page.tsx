export default function About() {
  const vocas = [
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
    {
      word: "BaaS",
      meaning: "バックエンド as a サービス"
    },
  ]
  return (
    <main className="flex justify-start">
      <div className="flex flex-col h-screen basis-1/6 sticky top-0">
        <h1 className="text-3xl m-2 mb-10 font-thin">VOCA NOTE</h1>
        <button className="ml-3 px-3 py-1 mr-auto my-2 text-xl text-slate-700 rounded-md hover:bg-slate-200">新規作成 +</button>
        <button className="ml-3 px-3 py-1 mr-auto my-2 text-xl text-slate-700 rounded-md hover:bg-slate-200">IT用語</button>
        <button className="ml-3 px-3 py-1 mr-auto my-2 text-xl text-slate-700 rounded-md hover:bg-slate-200">ビジネス用語</button>
        <button className="ml-3 px-3 py-1 mr-auto my-2 text-xl text-slate-700 rounded-md hover:bg-slate-200">英単語</button>
      </div>
      <div className="basis-5/6 flex justify-start my-5 rounded-3xl shadow-xl overflow-auto bg-white">
        <div className="w-10 ml-2 flex flex-col pt-24 pb-64">
          {vocas.map((_, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"
            ></div>
          ))}
          {/* <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div>
          <div className="w-6 h-6 rounded-full bg-slate-50 mx-auto shadow-inner my-5"></div> */}
        </div>
        <div className="basis-full">
          <h2 className="mt-10 mr-2 text-4xl text-slate-700 font-medium border-b-2">IT用語</h2>
          <ul className="mt-4 mx-2">
            {vocas.map((voca, index) => (
              <li key={index} className="border-b pl-2">
                <p className="text-xl my-1">{voca.word}</p>
                <p className="text-xl my-1">{voca.meaning}</p>
              </li>
            ))}
            <li className="border-b pl-2 h-[70px]">
            </li>
            <li className="border-b pl-2 h-[70px]">
            </li>
            <li className="border-b pl-2 h-[70px] mb-9">
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}