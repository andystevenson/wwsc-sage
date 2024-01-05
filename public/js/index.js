console.log('hello world!', import.meta.url)

const loginButton = document.getElementById('login')

const start = () => {
  if (!loginButton) return console.error(`html page not as expected!`)
  const checkIfAuthorised = `https://www.sageone.com/oauth2/auth/central?filter=apiv3.1&client_id=4066d925-3a74-4b10-86e5-10d5ba66e708%2F94e190cd-bc97-44ba-a51a-0ee9e3456baa&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8123%2Fauth%2Fcallback&scope=full_access&state=sage-state-secret&country=gb`
  loginButton.addEventListener('click', () => {
    window.location = checkIfAuthorised
  })
}

start()
