import Storage from './Storage';

var API = {
  sendRequest: async (route, params, options = {}) => {
    try {
      const token = await Storage.getToken();

      let contentType = options.contentType || 'application/json';
      let headers = {
        'Accept': 'application/json',
        'Content-Type': contentType,
        'token': token
      };
      headers = Object.assign({}, headers, { 'Content-Type': contentType });

      let configs = {
        method: options.method || 'POST',
        headers: headers
      };

      if (params && Object.keys(params).length > 0) {
        const formData = new FormData();
        if (configs.method != 'GET' && configs.method != 'HEAD' && configs.method != 'DELETE') {
          if (contentType != 'application/json') {
            Object.keys(params).map(function (keyName) {
              formData.append(keyName, params[keyName]);
            });
            configs.body = formData;
          } else {
            configs.body = JSON.stringify(params);
          }
        }

        if (configs.method == 'GET') {
          params = Object.keys(params).map(key => key + '=' + params[key]).join('&');
          route = `${route}?${params}`;
        }
      }

      try {
        let response = await fetch(route, configs);
       
        let responseJson = await response.json();
        if (response.status != 200 && response.status != 201) {
          throw new Error(JSON.stringify(responseJson))
        } 
        return Object.assign(responseJson);
      } catch (error) {
        const customError = new Error(error.message)
        throw customError
      }
    } catch(error) {
        const customError = new Error(error.message)
        throw customError
    }
  }
};

export default API;