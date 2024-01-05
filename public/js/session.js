export const getSession = () => {
  return {
    session: sessionStorage.getItem('session'),
    country: sessionStorage.getItem('country'),
  }
}
