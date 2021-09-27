export default container => {
    // container에는 document 의 변경될 엘리먼트가 들어온다.

    // 각 메서드는 경로가 매칭되면 실행될 함수를 리턴한다.
    const home = () => {
        container.textContent = 'This is Home Page'
    }

    const list = () => {
        container.textContent = 'This is List Page'
    }

    const notFound = () => {
        container.textContent = 'Page Not Found!'
    }

    return {
        home,
        list,
        notFound
    }
}