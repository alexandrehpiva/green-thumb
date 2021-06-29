export function scrollTo(offsetTop: number) {
  document.body.scrollTop = offsetTop; // For Safari
  document.documentElement.scrollTop = offsetTop; // For Chrome, Firefox, IE and Opera
}
