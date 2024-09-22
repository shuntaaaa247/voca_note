"use client"
import Link from "next/link"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useCookies } from 'next-client-cookies';
import { User } from "../../../../backend/generated/zod"

const Login = () => {
  const router = useRouter();
  const cookies = useCookies();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setErrorMessage("");
      const email: String | undefined = emailRef.current?.value;
      const password: String | undefined = passwordRef.current?.value

      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })

      const resJson = await res.json();

      if (res.ok) {
        const user: User = resJson.user;
        const token: string = resJson.token;

        cookies.set("token", token)
        cookies.set("userId", user.id)
        router.push("/");
      } else if (res.status === 401) {
        setErrorMessage(resJson.message);
      } else {
        return(
          <div>500 Server Error</div>
        )
      }
    } catch (e) {
      console.log(e)
      return(
        <div>500 Server Error</div>
      )
    }
  }

  return(
    <div className="flex w-[30%] mx-auto h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col w-full my-auto bg-slate-50 rounded-xl shadow-md">
        <h1 className="text-center text-3xl mt-3 mb-4 font-sans">Login</h1>
        <div className="border-t flex py-1.5 mx-1">
          <span className="w-5 h-5 ml-1 my-auto shadow-inner bg-slate-200 rounded-full "></span>
        </div>
        <div className="border-t flex mx-1">
          <span className="w-5 h-5 ml-1 my-auto shadow-inner bg-slate-200 rounded-full"></span>
          <label className="pl-2 pt-2">メールアドレス</label>
        </div>
        <div className="flex border-t mx-1">
          <span className="w-5 h-5 ml-1 my-auto shadow-inner bg-slate-200 rounded-full"></span>
          <input ref={emailRef} type="email" placeholder="voca@note.com" className="bg-slate-50 text-slate-700 pl-2 pt-2 w-full focus:outline-none"/>
        </div>
        <div className="border-t flex mx-1">
          <span className="w-5 h-5 ml-1 my-auto shadow-inner bg-slate-200 rounded-full"></span>
          <label className="pl-2 pt-2">パスワード</label>
        </div>
        <div className="flex border-t mx-1">
          <span className="w-5 h-5 ml-1 my-auto shadow-inner bg-slate-200 rounded-full"></span>
          <input ref={passwordRef} type="password" placeholder="パスワード" className="bg-slate-50 pl-2 pt-2 w-full focus:outline-none"/>
        </div>
        <div className="border-t flex mx-1">
          <span className="w-5 h-5 ml-1 my-auto shadow-inner bg-slate-200 rounded-full "></span>
          {/* <button className="bg-blue-600 text-lg text-white rounded-lg hover:bg-blue-500 px-2 my-0.5 mx-auto">Login</button> */}
          <button type="submit" className="border-blue-500 border-2 text-blue-500 text-lg px-2 my-0.5 mx-auto hover:bg-blue-500 hover:text-white">Login</button>
        </div>
        { errorMessage 
        ? <div className="border-t flex mx-1">
            <span className="w-5 h-5 ml-1 my-auto shadow-inner bg-slate-200 rounded-full "></span>
            <p className="mx-auto text-red-500">{errorMessage}</p>
          </div>
        : <></>
        }
        <div className="border-t border-b flex mx-1">
          <span className="w-5 h-5 ml-1 my-auto shadow-inner bg-slate-200 rounded-full"></span>
          <Link href={"http://localhost:3000/signup"} className="pl-2 pt-2 text-blue-500 text-sm mx-auto">アカウントをお持ちでない方</Link>
        </div>
        <div className="h-14">
          {/* <button className="bg-blue-600 text-lg px-3 py-2 my-1 text-white rounded-lg hover:bg-blue-500">Login</button> */}
        </div>
      </form>
    </div>
  )
}

export default Login