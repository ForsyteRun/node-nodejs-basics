const parseArgs = () => {
    const args = process.argv
    for (let i = 0; i < args.length; i+=2) {
        const name = args[i].replace('--', '');
        const value = args[i+1];
        console.log(`${name} is ${value}`);
    }
};

parseArgs();