import React from 'react'
import { PatientForm } from '../components'
import { Slider } from '../components';


function NewUsers() {
  return (
    <div className="h-screen w-screen flex overflow-x-hidden">
    <div className="fixed">
        <Slider/>
    </div>
    <div className="ml-80 w-full h-screen overflow-y-auto">
        <div className="border border-gray-300 shadow-lg bg-white p-6 rounded-xl my-6 mx-6">
            <PatientForm/>
        </div>
    </div>
</div>
  )
}

export default NewUsers