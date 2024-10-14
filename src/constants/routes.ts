export const ROUTES = {
  AUTH: {
    SIGNIN: '/sign-in',
    SIGNUP: '/sign-up'
  },
  ADMIN: {
    HOME: '/admin',
    USERS: '/admin/users',
    USER_DETAIL: (id: string) => `/admin/users/${id}`,
    LOCATIONS: '/admin/locations',
    LOCATION_DETAIL: (id: string) => `/admin/locations/${id}`,
    ROOMS: '/admin/rooms',
    ROOM_DETAIL: (id: string) => `/admin/rooms/${id}`,
    RESERVATIONS: '/admin/reservations',
    RESERVATION_DETAIL: (id: string) => `/admin/reservations/${id}`
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
