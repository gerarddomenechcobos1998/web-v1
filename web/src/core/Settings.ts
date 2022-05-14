import apiUrl from './environment';

var Settings = {
    getApiURL: () => {
        return apiUrl;
    },
    getMqttURL: () => {
        var protocol = "ws" 
        if(apiUrl.startsWith('https')){
            protocol = protocol + 's';
        }
        const parts = apiUrl.split(':');
        parts.shift();
        const pathElements = parts.join().split('/');
        pathElements[pathElements.length-1] = 'ws';
        return protocol+':'+pathElements.join('/')
    }
}

export default Settings;