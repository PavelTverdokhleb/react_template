let BASE_URL, SECOND_URL;

if(window.location.host == "localhost:8080") {
    BASE_URL = 'http://cryptomarket-backend.dev.4-com.pro';
    SECOND_URL = 'http://cryptomarket-backend.dev.4-com.pro';
}else if(window.location.host == "admin.language.dev.4-com.pro"){
    BASE_URL = 'http://cryptomarket-backend.dev.4-com.pro';
    SECOND_URL = 'http://cryptomarket-backend.dev.4-com.pro';
}else{
    BASE_URL = 'http://cryptomarket-backend.dev.4-com.pro';
    SECOND_URL = 'http://cryptomarket-backend.dev.4-com.pro';
}

export const API_BASE_URL = BASE_URL;
export const API_SECOND_URL = SECOND_URL;
