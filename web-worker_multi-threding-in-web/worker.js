onmessage = (message) => {
    console.log(`separete worker thread is running`);

    let result;
    for (let i = 0; i < 10000000000; i++) {
        result = i;
    }
    console.log(`Separete worker thread returning the result`);
    postMessage(result)

}