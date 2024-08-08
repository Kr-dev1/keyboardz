
interface AuthLayoutProps {
    children: ReactNode;
}

import React, { ReactNode,FC } from 'react'

const AuthLayout: FC<AuthLayoutProps> = ({children}) => {
  return (
    <div >{children}</div>
  )
}

export default AuthLayout