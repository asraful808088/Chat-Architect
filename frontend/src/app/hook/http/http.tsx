import axios from "axios";
export default  function useHttp() {
  function sendMessage(message) {
    const getToken = localStorage.getItem('chat_token')
    return new Promise((resolve, reject) => {
        axios.post(
            "http://127.0.0.1:9165/api/communication/dev",
            { message: message,token:getToken??null },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then(response => {
             localStorage.setItem('chat_token', response?.data?.token)
            resolve(response.data);
        })
        .catch(error => {
            reject(null);
        });
    });
}
  return { sendMessage };
}
