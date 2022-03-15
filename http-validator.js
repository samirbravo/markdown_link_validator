const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

function errorHandler (error) {
    throw new Error(error.message)
}

async function checkStatus(arrayURLs) {
    try{
        const arrayStatus = await Promise
            .all(arrayURLs
                .map(async url => {
                    const res = await fetch(url)
                    return `${res.status} - ${res.statusText}`
        })) 
        return arrayStatus
    } catch (error){
        errorHandler (error)
    }
}

function createURLArray(arrayLinks) {
    return arrayLinks
        .map( objectLink => Object
            .values(objectLink).join())
}

async function validaURLs(arrayLinks) {
    const links = createURLArray(arrayLinks)
    const statusLinks = await checkStatus(links)

    const result = arrayLinks
        .map((obj, index) => ({ 
            ...obj, 
            status: statusLinks[index]
        })) 
    return result    
}

export { validaURLs }
