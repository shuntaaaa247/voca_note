export const FormNoteLine = ({
  children,
  isDeepest = false
}: {
  children: React.ReactNode,
  isDeepest?: boolean
}) => {

  return (
    <div className={`flex h-10 mx-1 border-t ${isDeepest ? 'border-b' : ''}`}>
      <span className="w-5 h-5 ml-2 my-auto shadow-inner bg-slate-200 bg-opacity-50 rounded-full"></span>
      {children}
    </div>
  )
}