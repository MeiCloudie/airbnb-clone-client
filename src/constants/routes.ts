export const ROUTES = {
  AUTH: {
    SIGNIN: '/sign-in',
    SIGNUP: '/sign-up'
  },
  ADMIN: {
    HOME: '/admin',
    USERS: '/admin/users',
    LOCATIONS: '/admin/locations',
    ROOMS: '/admin/rooms',
    RESERVATIONS: '/admin/reservations'
  },
  USER: {
    HOME: '/',
    ACCOUNT_SETTINGS: '/account-settings',
    ROOMS: {
      ROOM_DETAIL: (id: string) => `/rooms/${id}`,
      LOCATION: '/rooms/location'
    },
    USER_PROFILE: {
      SHOW: (id: string) => `/user/show/${id}`
    }
  }
}
