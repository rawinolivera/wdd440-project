import React from 'react'

export default function Contactlayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div>
        <div>Contact Layout output</div>
        {children}
    </div>
  )
}
