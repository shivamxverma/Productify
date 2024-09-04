import React, { Children } from 'react'
interface TemplateProps {
    children: React.ReactNode;
}
const Template: React.FC<TemplateProps> = ({children}) => {
  return (
    <div
     className='
     h-screen
     p-6 flex
     justify-content"
     '>
      {children}
    </div>
  )
}
export default Template;
