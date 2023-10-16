import { RouterProvider } from "react-router-dom"
import { router } from "./routes/WeatherRoute"

function App() {
  return (
    <main className='bg-gradient-to-br from-[#222850] to-[#8C43A8] w-full h-screen font-poppins'>
      <RouterProvider router={router}/>
    </main>
  )
}

export default App
