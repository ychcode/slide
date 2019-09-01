const log = console.log.bind(console)

const e = function(selector) {
    let element = document.querySelector(selector)
    if (element === null) {
        let s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`
        alert(s)
        return null
    } else {
        return element
    }
}

const es = function(selector) {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        let s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`
        alert(s)
        return []
    } else {
        return elements
    }
}

const appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

const bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

const removeClassAll = function(className) {
    let selector = '.' + className
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        log('classname', className, e)
        e.classList.remove(className)
    }
}

const bindAll = function(selector, eventName, callback) {
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

const nextId = (oldid, offset) => {
    let a = Number(oldid[oldid.length - 1])
    a = a + Number(offset)
    if (a === 4) {
        a = 1
    }
    if (a === 0) {
        a = 3
    }
    return String(a)
}

const buttonSlide = () => {
    bindAll('button', 'click', function (event) {
        let self = event.target
        let offset = self.dataset.offset
        let picture = e('.show')
        let oldid = picture.id
        let newid = nextId(oldid, offset)
        imgIndicator(newid)
        newid = '#hao-picture-' + newid
        let npicture = e(newid)
        picture.classList.remove('show')
        npicture.classList.add('show')
    })
}

const indicatorSlide = () => {
    bindAll('.hao-slide-indi', 'mouseover', function (event) {
        let self = event.target
        let index = self.dataset.index
        let newid = '#hao-picture-' + index
        let picture = e('.show')
        let npicture = e(newid)
        picture.classList.remove('show')
        npicture.classList.add('show')
        let oldindi = e('.white')
        oldindi.classList.remove('white')
        self.classList.add('white')
    })
}

const imgIndicator = (index) => {
    let nextindex = index
    let newid = '#hao-indi-' + nextindex
    let newindicator = e(newid)
    removeClassAll('white')
    newindicator.classList.add('white')
}

const autoPlay = () => {
    let interval = 2000
    setInterval(function() {
        // 每 2s 都会调用这个函数
        let picture = e('.show')
        let oldid = picture.id
        let newid = nextId(oldid, 1)
        imgIndicator(newid)
        newid = '#hao-picture-' + newid
        let npicture = e(newid)
        picture.classList.remove('show')
        npicture.classList.add('show')
    }, interval)
}

const main_ = () => {
    buttonSlide()
    indicatorSlide()
    autoPlay()
}

main_()