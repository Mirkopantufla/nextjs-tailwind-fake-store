import Image from 'next/image'

export default function Home() {
  return (
    <main className='grid-cols-12'>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src="/disco-duro.jpg"
            className="max-w-sm rounded-lg shadow-2xl"
            width={500}
            height={500}
            alt="HardDrive" />
          <div>
            <h1 className="text-5xl font-bold">Fake Store News!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </main>
  )
}
