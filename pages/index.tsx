import { Inter } from 'next/font/google'
import Image from 'next/image'
import { useState, useEffect, FormEvent } from 'react'

const inter = Inter({ subsets: ['latin'] })


export type ipThings = {
  "ip": string,
  "version": string,
  "city": string,
  "region": string,
  "region_code": string,
  "country_code": string,
  "country_code_iso3": string,
  "country_name": string,
  "country_capital": string,
  "country_tld": string,
  "continent_code": string,
  "in_eu": boolean,
  "postal": string,
  "latitude": number,
  "longitude": number,
  "timezone": string,
  "utc_offset": number,
  "country_calling_code": string,
  "currency": string,
  "currency_name": string,
  "languages": string,
  "country_area": number,
  "country_population": number,
  "asn": string,
  "org": string,
  "hostname": string
}

function Loading() {
  return (
  <div>
    Data is Loading...
    <Image src="/vercel.svg" alt='' width={100} height={24}/>
  </div>
  )
}

function ipStuff() {
  const [data, setData] = useState<ipThings|null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
  useEffect(() => { setTimeout(() => {
    fetch('https://ipapi.co/json').then((res) => res.json()).then((data) => {setData(data); setLoading(false)})
  }, 2000)
  }, [])

  console.log(data)

  if (isLoading) return <Loading />
  if (!data) return <p>No profile data</p>

  return (
    <div>
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> {typeof value === 'boolean' ? value.toString() : value}
        </div>
      ))}
    </div>
  )
}

export default function Home() {

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <div>
        {ipStuff()}
      </div>
      <a href="/page">take me awayyy</a>
    </main>
  )
}