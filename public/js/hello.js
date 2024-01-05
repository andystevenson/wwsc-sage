console.log('hello', document.location)

let hello = null
const start = () => {
  const url = new URL(document.location)
  if (url.search === '') document.location.href = '/'

  const from = url.searchParams.get('from')
  const country = url.searchParams.get('country')

  console.log({ from, country })

  if (!from) document.location.replace('/')
  if (country !== 'GB') document.location.replace('/')

  hello = { from, country }

  sessionStorage.setItem('session', from)
  sessionStorage.setItem('country', country)

  document.location.replace('/closures')
}

start()
