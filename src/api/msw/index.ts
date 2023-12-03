async function initMocks() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server')
    server.listen()
  } else {
    const { worker } = await import('./browser')
    worker.start({
      onUnhandledRequest: 'bypass', //余計なwarningを回避
    })
  }
}

initMocks()

export {}
