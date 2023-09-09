export const controlScroll = (isOpen: boolean) => {
  const body = document.querySelector('body')
  body!.style.overflow = isOpen ? 'auto' : 'hidden'
}
