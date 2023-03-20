
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import Link from "next/link";
import dbConnect from "../../lib/dbConnect";

export default function Home() {
  return (
    <>
        <h1 className={"text-7xl"}>Vorbiapp</h1>
    </>

  )
}

export const getStaticProps = async () =>{
    await dbConnect();
    return{
        props: {

        }
    }
}