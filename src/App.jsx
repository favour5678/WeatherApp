import { RouterProvider } from "react-router-dom"
import { router } from "./routes/WeatherRoute"
import { WeatherProvider } from "./context/WeatherContext"

function App() {
  return (
    <main className='bg-gradient-to-br from-[#222850] to-[#8C43A8] w-full h-screen font-poppins'>
      <WeatherProvider>
      <RouterProvider router={router}/>
      </WeatherProvider>
    </main>
  )
}

export default App
