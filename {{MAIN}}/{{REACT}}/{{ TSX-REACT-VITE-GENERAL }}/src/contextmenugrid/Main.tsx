import './App.css'

function Main() {


  var myArr = Array.from({length: 20}, (x, i) => i)

  return (
    <div>
      {myArr.map((i) => 
      
        <div key={i} className='bg-blue-700 w-12 h-6 border-1'>div</div>

      )}
    </div>

  )
}

export default Main

/*
<>
  <h1 className='bg-blue-500 text-5xl mx-auto mt-5 px-10 py-4 w-fit'>React. Vite. Tailwind.</h1>
</>
*/