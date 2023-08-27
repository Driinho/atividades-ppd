const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

async function corrida() {

    if(isMainThread) {
        const numThreads = 5;
        const distance = 100;
    
        const threads = [];
    
        for(let i = 0; i < numThreads; i++) {
            const thread = new Worker(__filename, {
                workerData: { id: i, distance }
            });
        
            thread.on('message', message => {
                console.log(`Thread ${message.id} concluiu a corrida em ${message.time} ms.`);
            });
        
            threads.push(thread);
        }
    
        threads.forEach(thread => {
            thread.postMessage('start');
        });
    } else {
        const startTime = Date.now();
    
        parentPort.on('message', message => {
            if (message === 'start') {
                const { id, distance } = workerData;
                for (let i = 0; i < distance * 1000000; i++) {}
                const endTime = Date.now();
                const elapsedTime = endTime - startTime;
                parentPort.postMessage({ id, time: elapsedTime });
            }
        });
    }
}

corrida();