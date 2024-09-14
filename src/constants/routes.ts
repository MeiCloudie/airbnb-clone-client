export const ROUTES = {
  AUTH: {
    SIGNIN: '/sign-in',
    SIGNUP: '/sign-up'
  },
  ADMIN: {
    HOME: '/admin',
    LOCATIONS: '/admin/locations',
    RESERVATIONS: '/admin/reservations',
    ROOMS: '/admin/rooms',
    USERS: '/admin/users'
  },
  USER: {
    HOME: '/',
    ACCOUNT_SETTINGS: '/account-settings',
    ROOMS: {
      ROOM_DETAIL: (id: string) => `/rooms/${id}`,
      LOCATION: (location: string) => `/rooms/location/${location}`
    },
    USER_PROFILE: {
      SHOW: (id: string) => `/users/show/${id}`
    }
  }
}
