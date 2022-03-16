const postDate = async (url, data) =>{ //сообщили что код будет ассинхронен
    const res = await fetch(url, {   //res будет промис //await попросили подождать
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body:  data
    });
    return await res.json();  //вернули промис
};

const getResource = async (url) =>{ //сообщили что код будет ассинхронен
    const res = await fetch(url);
    //чтоб показал ошибку
    
    if(!res.ok){
        //выкинуть объект ошибки
       throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();  //вернули промис
};


export {postDate};
export {getResource};