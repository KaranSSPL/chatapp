import './globals.css'
import AuthContext from './context/AuthContext'
import ActiveStatus from './components/ActiveStatus'

export const metadata = {
  title: 'chat website',
  description: 'real time chat website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
