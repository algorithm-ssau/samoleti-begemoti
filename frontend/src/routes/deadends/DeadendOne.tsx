import { useParams } from 'react-router-dom'

export default function DeadOne() {
  const params = useParams()
  return (
<>
<body className='DeadOne'>
    <h1>boom! welcome to {params['one']}</h1>
    <p>something bad happened with this page....</p>
</body>
</>
  )
}