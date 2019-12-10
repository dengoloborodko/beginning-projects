function prepareData(storageName) {
    const storageData = localStorage.getItem(storageName);

    if (storageData) {
        return JSON.parse(storageData);
    }

    let myRequest = new XMLHttpRequest();

    myRequest.open('GET', '../../data/data.json', false);
    myRequest.send();

    if (myRequest.status === 200) {
        console.log(myRequest.status + ': ' + myRequest.statusText);
    } else {
        return JSON.parse(myRequest.responseText);
    }
}

/*function prepareData(storageName) {
    const storageData = localStorage.getItem(storageName);

    if (storageData) {
        return JSON.parse(storageData);
    }

    return fetch('../../data/data.json')
        .then(response => response.json())
        .then(result => result);
}*/

