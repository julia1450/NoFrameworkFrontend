export default container => {
    // container에는 document 의 변경될 엘리먼트가 들어온다.

    // 각 메서드는 경로가 매칭되면 실행될 함수를 리턴한다.
    const home = () => {
        container.textContent = 'This is Home Page'
    }

    const list = () => {
        container.textContent = 'This is List Page'
    }

    const dummy = () => {
        container.textContent = 'This is Dummy Page'
    }

    const notFound = () => {
        container.textContent = 'Page Not Found!'
    }

    const detail = (params) => {
        const {id} = params
        container.textContent = `This is Detail Page with ID ${id}`
    }

    const anotherDetail = (params) => {
        const {id, anotherId} = params
        container.textContent = `This is Another Detail Page with ID ${id} and AnotherId ${anotherId}`
    }

    return {
        home,
        list,
        dummy,
        notFound,
        detail,
        anotherDetail
    }
}