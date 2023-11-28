export const animation = {
  slideIn: {
    initial: {
      scaleY: 0
    },
    animate: {
      scaleY: 0
    },
    exit: {
      scaleY: 1
    },
    transition: {
      duration: .6,
      ease: [.3, 1, .8, 1]
    }
  },
  slideOut: {
    initial: {
      scaleY: 1
    },
    animate: {
      scaleY: 0
    },
    exit: {
      scaleY: 0
    },
    transition: {
      duration: .6,
      ease: [.3, 1, .8, 1]
    }
  }
}