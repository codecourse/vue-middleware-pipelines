export default function auth ({ to, from, store, next }) {
  if (store.getters['auth/authenticated']) {
    return next({
      name: 'home'
    })
  }

  return next()
}