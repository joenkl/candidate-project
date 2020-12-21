export const environment = {
    service:  { 
        base: process.env.REACT_APP_SERVICE_BASE_URL,
        routes: {
            health: process.env.REACT_APP_HEALTH_ROUTE,
            users: process.env.REACT_APP_USERS_ROUTE,
            editUser: process.env.REACT_APP_EDIT_USER_ROUTE
        }
    },
    
}
