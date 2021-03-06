const mocks = [
    {endpoint: /\/logs/, method: 'get', res: [{severity: 'warning', date: '5:30 PM 09-Apr-18', event: 'low balance'}, {severity: 'error', date: '5:30 PM 09-Apr-18', event: 'connection error'}, {severity: 'info', date: '5:30 PM 09-Apr-18', event: 'channel created'}]}
   ,{endpoint: /\/product\/.*\/status/, method: 'get', res: {code: 200, status: 'mocked!!!'}}
];

export default {
    has: function(req: any){
        const is = mock => mock.endpoint.test(req.endpoint) && req.options.method.toLowerCase() === mock.method.toLowerCase();
        return mocks.some(is);
    },
    get: function(req: any){
        const is = mock => mock.endpoint.test(req.endpoint) && req.options.method.toLowerCase() === mock.method.toLowerCase();
        const res = mocks.map(mock => is(mock) ? mock.res : undefined ).filter(res => res);
        if(res.length < 1){
            console.log('have no response for request: ', req);
            process.exit(1);
        }
        return res[0];
    }
};
