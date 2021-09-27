export default () => {

    // addRoute 함수가 실행될 때마다 fragment와 content를 갖는 route 객체가 추가된다.
    const routes = []
    let notFound = () => {}

    // return 객체
    const router = {}

    // 현재 프래그먼트와 일치하는 경로를 찾는 메서드
    const checkRoutes = () => {
        const currentRoute = routes.find(route => {
            return route.fragment === window.location.hash
        })

        if( !currentRoute ) {
            notFound()
            return router
        }
        // 함수를 실행한다
        currentRoute.func()
    }

    // 라우터에 경로, 실행할 함수를 추가한다
    router.addRoutes = (fragment, func) => {
        routes.push({fragment, func})
        return router
    }

    // 경로가 매칭되지 않을 때 실행할 함수를 router 지역 함수에 할당한다.
    router.setNotFound = (func) => {
        notFound = func
        return router
    }

    router.start = () => {
        // hash 값이 변경됨을 감지하여 checkRoutes 함수를 실행한다
        window.addEventListener('hashchange', checkRoutes)
        
        if(!window.location.hash) {
            window.location.hash = '#/'
        }
        checkRoutes()
    }

    // router를 return 한다.
    return router
}