import createRouter from './router.js'
import createPage from './page.js'

const container = document.querySelector('main')

const pages = createPage(container)

const router = createRouter()

router
    .addRoutes('#/', pages.home)
    .addRoutes('#/list', pages.list)
    .addRoutes('#/dummy', pages.list)
    .setNotFound(pages.notFound)
    .start()

const NAV_BTN_SELECTOR = 'button[data-navigate]'

document.body.addEventListener('click', e => {
    const { target } = e
    if (target.matches(NAV_BTN_SELECTOR)) {
        const { navigate } = target.dataset
        router.navigate(navigate)
    }
})