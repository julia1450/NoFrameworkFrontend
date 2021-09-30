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

    const ROUTE_PARAMETER_REGEXP = /:(\w+)/g
    const URL_FRAGMENT_REGEXP = '([^\\/]+)'
    // 라우터에 경로, 실행할 함수를 추가한다
    // 프래그먼트에서 정규식을 사용해 매개변수명을 추출한다.
    // router에 push 할 때 testRegExp 변수에 실제 URL과 매칭하기 위한 정규식을 넘긴다
    router.addRoutes = (fragment, func) => {
        const params = []
        
        const parsedFragment = fragment.replace(ROUTE_PARAMETER_REGEXP, (match, paramName) => { // match는 매치된 문자열
            params.push(paramName)
            return URL_FRAGMENT_REGEXP
        }).replace(/\//g, '\\/')

        routes.push({
            testRegExp: new RegExp(`^${parsedFragment}$`),
            fragment, 
            func,
            params
        })
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

    // 프로그래밍 방식으로 탐색하기 위한 메서드를 추가한다(route_using_attr 을 위한 메서드)
    router.navigate = fragment => {
        window.location.hash = fragment
    }

    // router를 return 한다.
    return router
}