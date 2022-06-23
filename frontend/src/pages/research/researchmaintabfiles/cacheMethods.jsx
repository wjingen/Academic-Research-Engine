export function writeToCache(url, data) {  
	localStorage.setItem(url, JSON.stringify(data)) 
}

export function writeDataToCache(url, data) {
    var original_data = readFromCache("heron_data")
    if (original_data === null) { 
		localStorage.setItem("heron_data", JSON.stringify(new Object({ url: data }))) 
	} else {
      original_data[url] = data
      localStorage.setItem("heron_data", JSON.stringify(original_data))
    }
}

export function readDataFromCache(url) {
    try { 
		return JSON.parse(localStorage.getItem('heron_data'))[url] 
	} catch { 
		return null 
	}
}

export function readFromCache(url) { 
	return JSON.parse(localStorage.getItem(url)) 
}