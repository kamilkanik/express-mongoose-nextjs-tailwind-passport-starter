'use client'
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;

import Navigation from '../components/Navigation/Navigation';

import './globals.css'
import 'antd/dist/antd.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <title>Gambling</title>
      </head>
      <body>
        <Layout>
          <Header><Navigation /></Header>
          <Content>{children}</Content>
          <Footer></Footer>
        </Layout>
      </body>
    </html>
  )
}
