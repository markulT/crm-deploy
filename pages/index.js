


export default function Home() {

  return (
    <div className='flex-1 min-h-screen bg-gradient-to-t from-gray-700 to-gray-600'>
      <div className="justify-center">
        <div className="justify-center flex">
        <h2 className="text-gray-200 text-4xl mt-5">Главная</h2>
        </div>

        <div className="grid gap-1 grid-rows-3 grid-flow-col mt-20">
        <div className="bg-gray-800 rounded-xl p-5 justify-center items-center text-center mx-10 row-span-4 ">
<h1 className="text-gray-200 text-lg">Графіки</h1>
<div className="mt-4 grid gap-1 gap-x-4 grid-cols-1 grid-rows-0">
  <h1 className="text-gray-300">
    графік
  </h1>
  <h1 className="text-gray-300">
    графік
  </h1>
  <h1 className="text-gray-300">
    графік
  </h1>
  <h1 className="text-gray-300">
    графік
  </h1>
</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-5 py-10 justify-center items-center text-center mx-10 col-span-2 ">
<h1 className="text-gray-200 text-lg">Клиенты</h1>
<div className="mt-4 grid gap-1 gap-x-4 grid-cols-2 grid-rows-1">
  <h1 className="text-gray-300">
    user
  </h1>
  <h1 className="text-gray-300">
    user
  </h1>
</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-5 py-20 justify-center items-center text-center mt-5 mx-10 row-span-2 col-span-2">
<h1 className="text-gray-200 text-lg">Адміністратори</h1>
<div className="mt-4 grid gap-1 gap-x-4 grid-cols-2 grid-rows-0">
  <h1 className="text-gray-300">
    абоба
  </h1>
  <h1 className="text-gray-300">
    абоба
  </h1>
  <h1 className="text-gray-300">
    аоба
  </h1>
  <h1 className="text-gray-300">
    абоба
  </h1>
</div>
        </div>
        </div>
        
      </div>
      
    </div>
  )
}
