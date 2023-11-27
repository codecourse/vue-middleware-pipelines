export default function subscribed ({ to, from, store, next }) {
  if (!store.getters['auth/user'].subscribed) {
    return next({
      name: 'home'
    })
  }

  return next()
}