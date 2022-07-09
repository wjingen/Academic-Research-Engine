export function writeToCache(url, data) {  
	sessionStorage.setItem(url, JSON.stringify(data)) 
}

export function writeDataToCache(url, data) {
    var original_data = readFromCache("heron_data")
    if (original_data === null) { 
		sessionStorage.setItem("heron_data", JSON.stringify(new Object({ url: data }))) 
	} else {
      original_data[url] = data
      sessionStorage.setItem("heron_data", JSON.stringify(original_data))
    }
}

export function readDataFromCache(url) {
    try { 
		return JSON.parse(sessionStorage.getItem('heron_data'))[url] 
	} catch { 
		return null 
	}
}

export function readFromCache(url) { 
	return JSON.parse(sessionStorage.getItem(url)) 
}