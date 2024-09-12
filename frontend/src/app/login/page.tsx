const Login = () => {
  return(
    <div className="flex w-[30%] mx-auto h-screen bg-amber-400">
      <form className="flex flex-col w-full my-auto bg-slate-50 rounded-md shadow-md">
        <h1 className="text-center text-3xl font-light">Login</h1>
        <input type="email" className="bg-slate-50"/>
        <input type="password" className="bg-slate-50"/>
        <div className="flex justify-center">
          <button className="bg-blue-600 text-lg px-3 py-2 my-1 text-white rounded-lg hover:bg-blue-500">Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login