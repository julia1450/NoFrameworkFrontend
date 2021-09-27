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

