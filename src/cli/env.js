const parseEnv = () => {
    const variables = process.env

    const arrOfRSS = Object.entries(variables)
    .filter(([key]) => key.includes('RSS_'))

    arrOfRSS.reverse().forEach(el => {
        const result = `${el[0]} = ${el[1]}`
        console.log(result);
    })
};

parseEnv();