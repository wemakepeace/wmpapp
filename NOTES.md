add new class button

create a user, do not create class instance

when logging in fetch all classes

when chosing class, fetch class, add to store, set id classId in localStorage

when updating class, use localstorage id

when refreshing use jwt token for teacher id, and use localstorage for classId


store = {
    teacher: {
        id
        email
        bla bla
        classes: { 1: 1b, 2: 2f },
        currentClass: 1
    },
    classes: {
        1: {
            id
            name
            size,
            exchangeClass: {
                id
                name
                size
            },
            messaging: {

            },
            exchangeInfo: {
                status
                startDate
                endDate
            }
        },
        2: {
            id
            name
            size,
            exchangeClass: {
                id
                name
                size
            },
            messaging: {

            }
        }
    }
}
