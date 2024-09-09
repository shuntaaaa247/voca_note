type VocaProps = {
  voca: {
    word: string,
    meaning: string
  }
}

export const Voca = ({voca}: VocaProps) => {
  return(
    <div className="flex justify-start">
      <span className="mr-5 w-7 h-7 rounded-full bg-slate-200 shadow-inner my-5"></span>
      <div className="w-full border-b">
        <p className="text-xl my-1 text-slate-700 font-medium">{voca.word}</p>
        <p className="text-xl my-1 text-slate-700 font-medium">{voca.meaning}</p>
      </div>
    </div>
  )
}