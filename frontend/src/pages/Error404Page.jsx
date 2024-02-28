import { Link } from "react-router-dom"


const Error404Page = () => {
  return (
    <div className=" container mx-auto flex justify-center mt-20">
    <div className=" flex flex-col justify-center gap-4 p-8 mx-auto text-lg">
      <h1 className="font-bold text-3xl">Page Not Found</h1>
      <p className="mb-10 list-disc">Oops! It looks like the page you&apos;re looking for doesn&apos;t exist. We&apos;re sorry for the inconvenience.</p>
      <ul >Here are some things you can try:
        <div className="pl-5">
        <li className="mt-4 list-disc">Return to the <Link to="/" className="text-blue-500">homepage</Link></li>
        </div>
        <div className="pl-5">
        <li className="list-disc">Browse our <Link to="/categories" className="text-blue-500">categories</Link></li>
        </div>
      </ul>
      <p>If you still can&apos;t find what you need, feel free to contact our support team at support@example.com.</p>
    </div>
    </div>
  )
}

export default Error404Page