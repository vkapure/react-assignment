import './globals.css'
import { ReduxProvider } from '@/store'
import Sidebar from './component/Sidebar'
import Header from './component/Header'

export const metadata = {
  title: 'React Assignment',
  description: 'Assignment layout',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-1 p-6 bg-gray-50">{children}</main>
            </div>
          </div>
        </ReduxProvider>
      </body>
    </html>
  )
}
