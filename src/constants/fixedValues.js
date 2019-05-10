export const amountStore = 12;
export const defaultIndex = 0;
export const amountUser = 50;
export const businessStatus = {
  deferred: "deferred",
  late: "late",
  payed: "payed",
  paying: "paying",
  waiting: "waiting"
}

export const INFOTOAST = {
  appearance: 'warning',
  autoDismiss: false,
  pauseOnHover: false,
}

export const SUCCESSTOAST = {
  appearance: 'success',
  autoDismiss: true,
  pauseOnHover: true,
}

export const ERRORTOAST = {
  appearance: 'error',
  autoDismiss: true,
  pauseOnHover: true,
}

export const DIDYOUKNOWTOAST = {
  appearance: 'info',
  autoDismiss: false,
  pauseOnHover: false,
}

export const PARTICLES = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#000000'
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000'
      },
      polygon: {
        nb_sides: 5
      },
      image: {
        width: 100,
        height: 100
      }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 200,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 3,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 300,
      color: '#000000',
      opacity: 0.4,
      width: 2
    },
    move: {
      enable: true,
      speed: 1,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  retina_detect: true
}
